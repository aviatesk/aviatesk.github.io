@def title       = "Quick intro to the new effect analysis of Julia compiler"
@def pubdate     = "2022-07-24"
@def description = "Quick intro to the new effect analysis of Julia compiler"
@def rss_pubdate = Date(2022, 7, 24)
@def rss         = "Quick intro to the new effect analysis of Julia compiler"
@def tags        = ["julia", "optimization", "compiler"]

{{ blogtitle }}

\note{}{
    This is a brief wrapup of what I was hackled on by the folks at
    [Boston Julia user meetup](https://www.meetup.com/julia-cajun/events/287287946/), 2022/07/22.
}

- Background:
  * Julia compiler is powered by **abstract interpretation**, which is powered by **constant propagation**
    + constant propagation == inject constant information into abstract interpretation
  * But constant prop can be slow!
- Idea: replace abstract interpretation with const prop actual execution (i.e. **concrete evaluation**) instead!
  * The effect analysis is an technique to check when it is valid to perform concrete evaluation
- Results:
  * huge compiler performance improvements,
  * great runtime performance improvement,
  * and it also gives you a more fine grained control for compiler behaviors!

## The compile-time improvements show-off

How constant-prop' looks like?
```julia
julia> function kernel1(n, x)
           out = 0
           while n > 0
               out += sum(sincos(x))
               n -= 1
           end
           return out
       end
kernel1 (generic function with 1 method)

julia> n, x = 42, 1.0;

julia> kernel1(n, x)
58.034478208393544

julia> # no constant information (`n` and `x` are widened to type domain by macro expansion)
       @code_typed optimize=false kernel1(n, x)
CodeInfo(
1 ─      (n@_5 = n@_2)::Int64
└──      (out = 0)::Core.Const(0)
2 ┄ %3 = (n@_5 > 0)::Bool
└──      goto #4 if not %3
3 ─ %5 = out::Union{Float64, Int64}
│   %6 = Main.sincos(x)::Tuple{Float64, Float64}
│   %7 = Main.sum(%6)::Float64
│        (out = %5 + %7)::Float64
│        (n@_5 = n@_5 - 1)::Int64
└──      goto #2
4 ─      return out
) => Union{Float64, Int64}

julia> code_typed(; optimize=false) do
           kernel1(n, 1.0) # this allows the compiler to use that constant information
       end
1-element Vector{Any}:
 CodeInfo(
1 ─ %1 = Main.kernel1(Main.n, 1.0)::Union{Float64, Int64}
└──      return %1
) => Union{Float64, Int64}
```



Cthulhu.jl gives us more understanding:
```julia
julia> using Cthulhu

julia> # let's disable concrete evaluation for now
       function Core.Compiler.concrete_eval_eligible(interp::Cthulhu.CthulhuInterpreter,
           @nospecialize(f), result::Core.Compiler.MethodCallResult, arginfo::Core.Compiler.ArgInfo, sv::Core.Compiler.InferenceState)
           return false
       end

julia> function kernel2(n)
           return kernel1(n, 1.0)
       end
kernel2 (generic function with 1 method)
```



Let's profile constant prop':
```julia
julia> function profile_absint((interp, mi))
           cnt, locs = 0, Set{Tuple{Symbol,Int32}}()
           cnt_with_const, locs_with_const = 0, Set{Tuple{Symbol,Int32}}()
           for (mi, inferred) in interp.unopt
               for lin in inferred.src.linetable
                   if isa(mi, Core.MethodInstance)
                       # count non-constant inference
                       cnt += 1
                       push!(locs, (lin.file, lin.line))
                   else
                       # count constant inference
                       cnt_with_const += 1
                       push!(locs_with_const, (lin.file, lin.line))
                   end
               end
           end

           function print_profile_info((cnt, locs))
               linecnt = length(locs)
               filecnt = length(unique(first.(locs)))
               println("    analyzed $cnt calls / $linecnt lines (in $filecnt files)")
           end

           println("Profiling results on: ", mi)

           println("  [non-constprop absint]")
           print_profile_info((cnt, locs))

           println("  [constantprop absint]")
           print_profile_info((cnt_with_const, locs_with_const))
       end
profile_absint (generic function with 1 method)

julia> profile_absint(Cthulhu.@interp kernel1(n, x)) # constant information about `kernel1` arguments isn't given
Profiling results on: MethodInstance for kernel1(::Int64, ::Float64)
  [non-constprop absint]
    analyzed 582 calls / 365 lines (in 20 files)
  [constantprop absint]
    analyzed 379 calls / 74 lines (in 13 files)

julia> profile_absint(Cthulhu.@interp kernel2(n)) # constant information about `kernel1` arguments is available
Profiling results on: MethodInstance for kernel2(::Int64)
  [non-constprop absint]
    analyzed 583 calls / 365 lines (in 20 files)
  [constantprop absint]
    analyzed 705 calls / 213 lines (in 16 files)
```



Constant propagation can happen many time, as there may be different constant information available (c.f. this doens't happen for non-constant abstract interpretation, as every information is _abstracted_ to type domain):
```julia
julia> function kernel3(n)
           return kernel1(n, 1.0),
                  kernel1(n, -1.0) # different constant informatio
       end
kernel3 (generic function with 1 method)

julia> profile_absint(Cthulhu.@interp kernel3(n))
Profiling results on: MethodInstance for kernel3(::Int64)
  [non-constprop absint]
    analyzed 583 calls / 365 lines (in 20 files)
  [constantprop absint]
    analyzed 985 calls / 213 lines (in 16 files)

julia> using BenchmarkTools

julia> @benchmark Cthulhu.@interp kernel1(n, x)
BenchmarkTools.Trial: 117 samples with 1 evaluation.
 Range (min … max):  31.293 ms … 135.362 ms  ┊ GC (min … max):  0.00% … 14.19%
 Time  (median):     41.628 ms               ┊ GC (median):    12.66%
 Time  (mean ± σ):   42.764 ms ±  10.666 ms  ┊ GC (mean ± σ):   8.99% ±  7.62%

         ▃ ▄▁   ▁▁▃ ▁ ▃  █▄▃     ▁
  ▆▆▄▄▆▄▆█▇██▇▆▄███▇█▁█▇▆███▇▇▆▆▁█▆▆▄▁▆▆▁▁▄▄▁▄▄▁▁▁▄▁▁▆▁▁▁▁▁▁▁▆ ▄
  31.3 ms         Histogram: frequency by time         61.8 ms <

 Memory estimate: 25.15 MiB, allocs estimate: 374282.

julia> @benchmark Cthulhu.@interp kernel2(n)
BenchmarkTools.Trial: 95 samples with 1 evaluation.
 Range (min … max):  40.855 ms … 76.014 ms  ┊ GC (min … max):  0.00% … 9.43%
 Time  (median):     52.815 ms              ┊ GC (median):    11.40%
 Time  (mean ± σ):   53.088 ms ±  7.207 ms  ┊ GC (mean ± σ):   9.38% ± 6.50%

     ▂ ▂▅    ▂ ▂▂ ▅ ▂█▅▅█▂▅▅█▅          ▂ ▂
  ▅▁█████▅▁▅▅█▁████▁██████████▁▅█▁▁█▅▁▅▅█▅█▁▁▁▁▁▁▁▅▅▅▁▁▁▁▅▁▁▅ ▁
  40.9 ms         Histogram: frequency by time        73.1 ms <

 Memory estimate: 30.55 MiB, allocs estimate: 452849.

julia> @benchmark Cthulhu.@interp kernel3(n)
BenchmarkTools.Trial: 83 samples with 1 evaluation.
 Range (min … max):  44.367 ms … 127.976 ms  ┊ GC (min … max):  0.00% … 9.82%
 Time  (median):     60.221 ms               ┊ GC (median):    11.61%
 Time  (mean ± σ):   60.849 ms ±   9.863 ms  ┊ GC (mean ± σ):   9.82% ± 5.44%

             ▂    ▂     ▅ ▅ ▂  █▂▂  ▅▂   ▅▂  ▂
  ▅▁▁▁▁▁▅▁█▁██▁▅█▅█▁▅▁█▅█▅████████▁▅██▅████▅▁██▅▅▁▁▅▅▅▁▁▁▁▅▁▁▅ ▁
  44.4 ms         Histogram: frequency by time         76.2 ms <

 Memory estimate: 34.49 MiB, allocs estimate: 512342.
```



Let's see what happens in an extreme case! (N.B. this kind of thing _does_ happen for simulation etc. where programs are auto-generated with given parameters):
```julia
julia> let param = 1000
           ex = Expr(:block)
           var = gensym()
           push!(ex.args, :($var = x))
           for _ = 1:param
               newvar = gensym()
               push!(ex.args, :($newvar = sin($var)))
               var = newvar
           end

           @eval global function compute(x)
               $ex
           end
       end
compute (generic function with 1 method)

julia> function simkernel()
           return compute(1.0)
       end
simkernel (generic function with 1 method)

julia> profile_absint(@time Cthulhu.@interp simkernel()) # 解析に12秒もかかってしまう!
 13.811087 seconds (11.82 M allocations: 788.600 MiB, 2.70% gc time)
Profiling results on: MethodInstance for simkernel()
  [non-constprop absint]
    analyzed 410 calls / 285 lines (in 18 files)
  [constantprop absint]
    analyzed 45503 calls / 149 lines (in 14 files)
```



And, now let's see how the effect analysis and the concrete evaluation changes the game!
```julia
julia> # enable the effect analysis and concrete evaluation:
       function Core.Compiler.concrete_eval_eligible(interp::Cthulhu.CthulhuInterpreter,
           @nospecialize(f), result::Core.Compiler.MethodCallResult, arginfo::Core.Compiler.ArgInfo, sv::Core.Compiler.InferenceState)
           return Base.@invoke Core.Compiler.concrete_eval_eligible(interp::Core.Compiler.AbstractInterpreter,
           f::Any, result::Core.Compiler.MethodCallResult, arginfo::Core.Compiler.ArgInfo, sv::Core.Compiler.InferenceState) # enable concrete-evaluation
       end

julia> profile_absint(Cthulhu.@interp simkernel())
Profiling results on: MethodInstance for simkernel()
  [non-constprop absint]
    analyzed 410 calls / 285 lines (in 18 files)
  [constantprop absint]
    analyzed 217 calls / 43 lines (in 10 files)

julia> @benchmark Cthulhu.@interp simkernel()
BenchmarkTools.Trial: 129 samples with 1 evaluation.
 Range (min … max):  31.642 ms … 50.424 ms  ┊ GC (min … max):  0.00% … 0.00%
 Time  (median):     38.397 ms              ┊ GC (median):    12.83%
 Time  (mean ± σ):   38.927 ms ±  4.097 ms  ┊ GC (mean ± σ):   9.13% ± 8.20%

              █▂ ▅
  ▅▃▁▆▆▃▅▃▅█▆▇██▅█▃▅▁▅▆▅▅▅▃▇▃▅▃▆█▅▇▃▇█▇▇█▅▆▁▆▅▃▃▁▁▁▁▁▁▁▁▁▁▁▁▃ ▃
  31.6 ms         Histogram: frequency by time        50.2 ms <

 Memory estimate: 23.14 MiB, allocs estimate: 352443.

julia> @benchmark Cthulhu.@interp kernel1(n, x)
BenchmarkTools.Trial: 144 samples with 1 evaluation.
 Range (min … max):  27.595 ms … 50.967 ms  ┊ GC (min … max): 0.00% … 12.09%
 Time  (median):     34.529 ms              ┊ GC (median):    0.00%
 Time  (mean ± σ):   34.837 ms ±  3.917 ms  ┊ GC (mean ± σ):  8.79% ±  8.27%

            ▂       ▅█ ▃                      ▂▂   ▃▃ ▃  ▂
  ▄▁▁▁▁▇▅▅▄▇█▄▄█▅▇█▅██▅██▇▄▁▅▁▄▁▇▄▁▄▁▄▁▅▁▇▇▇█▅██▅▅▇██▇█▇▁█▁▅▇ ▄
  27.6 ms         Histogram: frequency by time        40.7 ms <

 Memory estimate: 21.60 MiB, allocs estimate: 323344.

julia> @benchmark Cthulhu.@interp kernel2(n)
BenchmarkTools.Trial: 141 samples with 1 evaluation.
 Range (min … max):  28.887 ms … 45.631 ms  ┊ GC (min … max): 0.00% … 17.10%
 Time  (median):     35.054 ms              ┊ GC (median):    0.00%
 Time  (mean ± σ):   35.481 ms ±  4.062 ms  ┊ GC (mean ± σ):  9.24% ±  8.70%

             ▅▅  ▂           ▂  ▅       █
  █▅▃▃██▆▆▃▅▆██▅██▆▅▆▃▅▅▅▅▁▅▁█▃▃██▁▃▆▃▅▆██▆▅▆▃▃▃▅▅▁▃▃▁▃▁▁▁▃▃▃ ▃
  28.9 ms         Histogram: frequency by time        44.8 ms <

 Memory estimate: 22.06 MiB, allocs estimate: 330326.

julia> @benchmark Cthulhu.@interp kernel3(n)
BenchmarkTools.Trial: 122 samples with 1 evaluation.
 Range (min … max):  30.071 ms … 111.741 ms  ┊ GC (min … max): 0.00% … 0.00%
 Time  (median):     40.295 ms               ┊ GC (median):    0.00%
 Time  (mean ± σ):   41.201 ms ±   9.447 ms  ┊ GC (mean ± σ):  8.32% ± 8.23%

      ██▅     ▂▅▅▄ ▂
  ▃▅▃▆███▇▃▆▆▃████▃██▅▅▇▅▇▁▆▃▃▅▅▃▁▁▁▃▁▁▁▁▁▁▁▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▃ ▃
  30.1 ms         Histogram: frequency by time         75.7 ms <

 Memory estimate: 22.49 MiB, allocs estimate: 336932.
```



## What to know

- What are "effects" actually
  * "computational effects", not "algebraic effects" (, that may be available for some other statically-typed languages like Haskell)
  * initially designed just for concrete evaluation
    + `:consistent`-cy, `:effect_free`-ness, `:terminate`-ion
  * but other effects have been added also, to enable further optimizations
    + see `? Core.Compiler.Effects` for more details

- Julia compiler will perform various optimizations based on the analyzed effects
- Currently implemented optimizations are:
  * 1.8: _concrete evaluation_ (i.e. compile-time evaluation)
    + <https://github.com/JuliaLang/julia/pull/43852>
    + requirements:
      + method to be proved as `:consistent`, `:effect_free`, `:terminate`
      + constant information about arguments at callsite
  * 1.8: _dead call elimination_:
    + <https://github.com/JuliaLang/julia/pull/43852>
    + requirements:
      + method to be proved as `:nothrow`, `:effect_free`, `:terminate`
    ```julia
    julia> code_typed((Int,Float64)) do n, a
        for _ = 1:n
            cbrt(a)
        end
    end |> only

    # on 1.7 (there is a call to `cbrt`)
    CodeInfo(
        1 ── %1  = Base.sle_int(1, n)::Bool
        │    %2  = Base.ifelse(%1, n, 0)::Int64
        │    %3  = Base.slt_int(%2, 1)::Bool
        └───       goto #3 if not %3
        2 ──       Base.nothing::Nothing
        └───       goto #4
        3 ──       goto #4
        4 ┄─ %8  = φ (#2 => true, #3 => false)::Bool
        │    %9  = φ (#3 => 1)::Int64
        │    %10 = Base.not_int(%8)::Bool
        └───       goto #10 if not %10
        5 ┄─ %12 = φ (#4 => %9, #9 => %20)::Int64
        │          invoke Main.cbrt(a::Float64)::Any
        │    %14 = (%12 === %2)::Bool
        └───       goto #7 if not %14
        6 ──       Base.nothing::Nothing
        └───       goto #8
        7 ── %18 = Base.add_int(%12, 1)::Int64
        └───       goto #8
        8 ┄─ %20 = φ (#7 => %18)::Int64
        │    %21 = φ (#6 => true, #7 => false)::Bool
        │    %22 = Base.not_int(%21)::Bool
        └───       goto #10 if not %22
        9 ──       goto #5
        10 ┄       return nothing
    ) => Nothing

    # on 1.9 (no call to `cbrt`!)
    CodeInfo(
        1 ── %1  = Base.sle_int(1, n)::Bool
        └───       goto #3 if not %1
        2 ──       goto #4
        3 ──       goto #4
        4 ┄─ %5  = φ (#2 => n, #3 => 0)::Int64
        └───       goto #5
        5 ──       goto #6
        6 ── %8  = Base.slt_int(%5, 1)::Bool
        └───       goto #8 if not %8
        7 ──       goto #9
        8 ──       goto #9
        9 ┄─ %12 = φ (#7 => true, #8 => false)::Bool
        │    %13 = φ (#8 => 1)::Int64
        │    %14 = Base.not_int(%12)::Bool
        └───       goto #15 if not %14
        10 ┄ %16 = φ (#9 => %13, #14 => %22)::Int64
        │    %17 = (%16 === %5)::Bool
        └───       goto #12 if not %17
        11 ─       goto #13
        12 ─ %20 = Base.add_int(%16, 1)::Int64
        └───       goto #13
        13 ┄ %22 = φ (#12 => %20)::Int64
        │    %23 = φ (#11 => true, #12 => false)::Bool
        │    %24 = Base.not_int(%23)::Bool
        └───       goto #15 if not %24
        14 ─       goto #10
        15 ┄       return nothing
    ) => Nothing
    ```
  * 1.9: _finalizer inlining_
    + <https://github.com/JuliaLang/julia/pull/45272/>
    + requires: `:nothrow`, `:notaskstate`
    + super primitive support yet
  * 1.9?: _automatic parallelization_
    + <https://github.com/JuliaLang/julia/pull/43910>
    + requires: `:effect_free`
  * and more?

## Limitations and user-annotations

- The analysis is very work in progress yet, and there are bunch of limitations currently:
  * `consistent`-cy is tainted by the existence of `@inbounds`
  * `effect_free`-ness can't be proven in the presence of mutation
  * `terminate`-ion analysis is hard ([the halting problem](https://en.wikipedia.org/wiki/Halting_problem))

You can check the results of the effect analysis with:
- `Base.infer_effects`: the effect-version of `Base.return_types` (the interface is same as `code_typed`)
- `Cthulhu.descend` with `optimize=false`/`with_effects=true` options

```julia
julia> Base.infer_effects(cbrt, (Float64,))
(+c,+e,+n,+t,+s)

julia> function should_be_consistent(op, itr)
           r = zero(eltype(itr))
           @inbounds for i = eachindex(itr)
               r = op(itr[i], r)
           end
           return r
       end
should_be_consistent (generic function with 1 method)

julia> Base.infer_effects(should_be_consistent, (typeof(+), Tuple{Int,Int,Int}))
(!c,+e,!n,!t,+s)

julia> code_typed() do
           should_be_consistent(+, (1,2,3)) # not concrete-evaled
       end
1-element Vector{Any}:
 CodeInfo(
1 ─       goto #7 if not true
2 ┄ %2  = φ (#1 => 1, #6 => %12)::Int64
│   %3  = φ (#1 => 1, #6 => %13)::Int64
│   %4  = φ (#1 => 0, #6 => %6)::Int64
│   %5  = Base.getfield((1, 2, 3), %2, false)::Int64
│   %6  = Base.add_int(%5, %4)::Int64
│   %7  = (%3 === 3)::Bool
└──       goto #4 if not %7
3 ─       goto #5
4 ─ %10 = Base.add_int(%3, 1)::Int64
└──       goto #5
5 ┄ %12 = φ (#4 => %10)::Int64
│   %13 = φ (#4 => %10)::Int64
│   %14 = φ (#3 => true, #4 => false)::Bool
│   %15 = Base.not_int(%14)::Bool
└──       goto #7 if not %15
6 ─       goto #2
7 ┄ %18 = φ (#5 => %6, #1 => 0)::Int64
└──       goto #8
8 ─       return %18
) => Int64

julia> nothing # TODO dig into why with `descend(should_be_consistent, (typeof(+), oTuple{Int,Int,Int}); optimize=false, with_effects=true)`

julia> wrap(::T) where T = Ref{T}()
wrap (generic function with 1 method)

julia> unwrap(x) = broadcast(identity, x)
unwrap (generic function with 1 method)

julia> function should_be_effect_free(s)
           o = wrap(s)
           o[] = s
           s = unwrap(o)
           return Symbol(s)
       end
should_be_effect_free (generic function with 1 method)

julia> Base.infer_effects(should_be_effect_free)
(!c,!e,!n,!t,!s)′

julia> code_typed() do
           should_be_effect_free("foo") # not concrete-evaled
       end
1-element Vector{Any}:
 CodeInfo(
1 ─       goto #3 if not true
2 ─       nothing::Nothing
3 ┄       goto #4
4 ─       goto #5
5 ─       goto #6
6 ─       goto #7
7 ─       goto #8
8 ─ %8  = $(Expr(:foreigncall, :(:jl_string_ptr), Ptr{UInt8}, svec(Any), 0, :(:ccall), "foo"))::Ptr{UInt8}
│   %9  = Core.sizeof("foo")::Int64
│   %10 = $(Expr(:foreigncall, :(:jl_symbol_n), Ref{Symbol}, svec(Ptr{UInt8}, Int64), 0, :(:ccall), :(%8), :(%9), :(%9), :(%8)))::Symbol
└──       goto #9
9 ─       return %10
) => Symbol
```



In a case when analysis result isn't accurate enough to prove the effects required to enable a desired optimization, you can use `Base.@assume_effects` macro to override the effects manually.

\warning{But... don't go too bold!}{
    Please read [its docstring](https://docs.julialang.org/en/v1.9-dev/base/base/#Base.@assume_effects) carefully beforehand
    and make sure your annotation is safe and valid!
}

```julia
julia> Base.@assume_effects :consistent :terminates_locally function should_be_consistent(op, itr)
           r = zero(eltype(itr))
           @inbounds for i = eachindex(itr)
               r = op(itr[i], r)
           end
           return r
       end
should_be_consistent (generic function with 1 method)

julia> Base.infer_effects(should_be_consistent, (typeof(+), Tuple{Int,Int,Int}))
(+c,+e,!n,+t,+s)

julia> code_typed() do
           should_be_consistent(+, (1,2,3)) # not concrete-evaled
       end
1-element Vector{Any}:
 CodeInfo(
1 ─     return 6
) => Int64

julia> Base.@assume_effects :effect_free function should_be_effect_free(s)
           o = wrap(s)
           o[] = s
           s = unwrap(o)
           return Symbol(s)
       end
should_be_effect_free (generic function with 1 method)

julia> Base.infer_effects(should_be_effect_free)
(!c,+e,!n,!t,!s)′

julia> code_typed() do
           should_be_effect_free("foo") # not concrete-evaled
       end
1-element Vector{Any}:
 CodeInfo(
1 ─       goto #3 if not true
2 ─       nothing::Nothing
3 ┄       goto #4
4 ─       goto #5
5 ─       goto #6
6 ─       goto #7
7 ─       goto #8
8 ─ %8  = $(Expr(:foreigncall, :(:jl_string_ptr), Ptr{UInt8}, svec(Any), 0, :(:ccall), "foo"))::Ptr{UInt8}
│   %9  = Core.sizeof("foo")::Int64
│   %10 = $(Expr(:foreigncall, :(:jl_symbol_n), Ref{Symbol}, svec(Ptr{UInt8}, Int64), 0, :(:ccall), :(%8), :(%9), :(%9), :(%8)))::Symbol
└──       goto #9
9 ─       return %10
) => Symbol
```



Well, more improvements are coming! E.g. `should_be_effect_free` case will be fixed on 1.9, and similar handling will be added to arrays also.
Just ask me whatever questions/requests if you find something annoying/interesting when playing with the effect analysis ;)
