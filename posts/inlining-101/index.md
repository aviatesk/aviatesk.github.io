@def title       = "Inlining 101"
@def pubdate     = "2021-11-03"
@def description = "Introduction of a general idea of inlining optimization, and its application in Julia compiler"
@def rss_pubdate = Date(2021, 11, 3)
@def rss         = "Introduction of a general idea of inlining optimization, and its application in Julia compiler"
@def tags        = ["julia", "optimization"]

{{ blogtitle }}

I recently started getting my feet wet in the high-level optimizations of Julia compiler,
and one of my recent works was the implementation of [call-site inlining annotation](https://github.com/JuliaLang/julia/pull/41328).
In this blog post I'd like to share my observations that I learned during working on that PR.

I will first explain a general idea of inlining as well as showcase its example application.
Then I will introduce the annotations that Julia programer can use to control inlining decision,
and finally I'm also going to explain a bit of Julia compiler's inlining cost model.

\toc

\collapsible{:warning: Julia version requirement:}{
Some of code snippets shown in this article are only runnable on Julia 1.8 or higher.
The results shown in this article are generated with this Julia version:
\weave{
```julia
using InteractiveUtils, BenchmarkTools #hide
versioninfo()
```
}
}

# So what is "inlining" ?

[Inlining](https://en.wikipedia.org/wiki/Inline_expansion) is one of the most common program optimization techniques.
Replacing a function call-site with the body of the function may improve performance because:
1. it eliminates the overhead of the function call
2. it may increase the chances of other optimizations

Generally speaking, on the modern powerful CPUs, an overhead of function call is very low and so
the performance benefit from `1.` is often negligible when compared to the other computation costs[^callcost].
But when a function that is called within a heavy loop isn't inlined, the cost of the function calls will be summed up and it may come up to the surface.
Also, if the function being called is very simple, and is called frequently,
the cost of function call can be comparable to the cost of the function's computation itself,
so inlining such functions may provide a relative performance gain too.

On the other hand, since inlining drastically changes the program representation and thus
also changes chances of other succeeding program optimizations, the effect of `2.` can impact program performance in a broader context.
In general, _intra-procedural analysis_ (i.e. analysis on a local scope) is much more easier than
_inter-procedural analysis_ (i.e. analysis across arbitrary function calls).
Inlining puts different routines all together that otherwise need to be analyzed inter-procedurally,
so from the viewpoint of program optimization, it is like converting a difficult problem into a much easier one.
And because of this reason, it is usually more effective to do inlining at an earlier stage in the program optimization pipeline.

## Beautiful inlining

Since modern compilers perform a variety of optimizations, it is hard to state unconditionally
what kind of optimizations can be enabled by inlining other than eliminating function call overhead.
But here, let's take a look at the following simple Julia program as an example of how inlining can
reduce memory allocation also.

Let's consider this Julia program[^luajit] :
\weave{
```julia
struct Point
    x::Float64
    y::Float64
end
a::Point +ₚ b::Point = Point(a.x+b.x, a.y+b.y)

function compute(n)
    a = Point(1.5, 2.5)
    b = Point(2.25, 4.75)
    for _ in 1:n
        a = (a +ₚ b) +ₚ b
    end
    return a.x, a.y
end
```
}

When we call `compute(n::Int)`, it first allocates two `Point` structs called `a` and `b`.
And `::Point +ₚ ::Point` called within the `for` loop takes `Point` objects as its arguments and
compute and allocate new `Point` struct.
Since the `for` loop is iterated over `n`-times, if it simply goes on like this, we may end up seeing so many allocations when `n` is big.

Is there anyway we can prevent these allocations ?

If `+ₚ` isn't inlined, then there is no chance since the `Point` objects _needs_ to exist on the memory in order to be passed as the arguments of `+ₚ`.

What about if `+ₚ` is inlined into `compute` ?
After Julia compiler performed the inlining, `compute` will be equivalent to:
```julia
function compute(n)
    a = Point(1.5, 2.5)
    b = Point(2.25, 4.75)
    for i in 0:(n-1)
        tmp = Point(a.x+b.x,   a.y+b.y)   # the expanded body of `a +ₚ b`
        a   = Point(tmp.x+b.x, tmp.y+b.y) # the expanded body of `tmp +ₚ b`
    end
    return a.x, a.y
end
```

When looking closely, you may see that `compute` above is equivalent to the following version where
all `Point`s are replaced by scalar values:
```julia
function compute(n)
    ax, ay = 1.5, 2.5   # replaced `Point(1.5, 2.5)`
    bx, by = 2.25, 4.75 # replaced `Point(2.25, 4.75)`
    for i in 0:(n-1)
        tmpx, tmpy = ax+bx,   ay+by   # replaced `Point(a.x+b.x,   a.y+b.y)`
        ax,   ay   = tmpx+bx, tmpy+by # replaced `Point(tmp.x+b.x, tmp.y+b.y)`
    end
    return ax, ay
end
```

Hooray ! By inline expansion, we can eliminate the `Point` allocation entirely while keeping the semantics of the original program[^sroa].

Here, for the sake of explanation, we performed manual inlining and allocation elimination,
but in reality, a compiler performs all these optimization just automatically.
So programmers usually don't need to do these optimization by their hands, and even if we need to do so, such a need _should_ be removed by evolution of the compiler.
Julia compiler also implements these inlining and allocation elimination,
and it can eliminate all the allocations involved with e.g. `compute(100_000_000)` completely.
We can confirm that optimization by looking at the output of [`@code_typed compute(100_000_000)`](https://docs.julialang.org/en/v1/stdlib/InteractiveUtils/#InteractiveUtils.@code_typed):
\weave{
```julia
@code_typed compute(100_000_000) # fully inlined
```
}
There are no `%new` statements and it means there are no longer any allocations.

## Inline, always ?

Well, sadly, it is not always a good idea to do inlining.
Excessive inlining can lead to worse performance for the following reasons:
- _Run-time_ cost: due to the increased size of compiled native code
  * increased size of compiled native code itself can be memory hungry
  * bigger code may lead poor [localities fo memory access](https://en.wikipedia.org/wiki/Locality_of_reference), which makes cache misses more likely
  * complex instructions may challenges [speculative execution](https://en.wikipedia.org/wiki/Speculative_execution) optimization
- _Compile-time_ overhead due to the increased complexity of the IR ("Intermediate Representation" of program)
  on which succeeding optimization passes work on

So compilers often have some kind of "cost model" that judges whether or not inlining a function call is profitable.
Such cost model is usually based on heuristics, and it seems like the following criteria are used:
1. simplicity of function body
2. \# of call-site (i.e. static call count)
3. \# of runtime call (i.e. dynamic call count)
4. escapability of arguments[^jvm]

In any case, this is such a problem that has no absolutely correct answer,
and so there would be many other possibilities like employing machine learning techniques to predict the costs.

Anyway, despite the fact that the idea of inlining sounds pretty simple, its application is actually very profound.


# Inlining annotations for Julia programmers

Julia compiler also has its own cost model for inlining decision.
Basically, it judges inlineability based on `1. simplicity of function body`.

This cost model sounds pretty simple, but it judges very reasonably in many cases,
meaning we Julia programmers don't usually need to care about inlining.

On the other hand, there may be still rare chances when you find Julia compiler doesn't perform inlining
as expected when you check outputs of [`code_typed`](https://docs.julialang.org/en/v1/base/base/#Base.code_typed)
or [Cthulhu.jl](https://github.com/JuliaDebug/Cthulhu.jl) in order to pursue performance.

As an example, let's take a look at the following program, which is a slightly modified version of the above example.
In order to cheat the inlining cost model, `/ₚ` contains very contrived and unnatural error checks
(I will explain the exact reason of this tweak at the last of this article):
\weave{
```julia
struct Point
    x::Float64
    y::Float64
end
a::Point +ₚ b::Point = Point(a.x+b.x, a.y+b.y)
a::Point /ₚ b::Point = begin
    # error pass
    if false
        @label diverror
        error("/ₚ: division error detected !")
    end
    # do some error checks
    iszero(a.y) && @goto diverror
    iszero(b.y) && @goto diverror
    # do the main computation
    Point(a.x/a.y, b.x/b.y)
end

function compute(n)
    a = Point(1.5, 2.5)
    b = Point(2.25, 4.75)
    for i in 0:(n-1)
        a = (a +ₚ b) /ₚ b
    end
    return a.x, a.y
end
```
}

For the sake of comparisons with later versions, let's take a benchmark first for now:
\weave{
```julia
# the initial version
@benchmark compute(100_000_000)
```
}

Although the performance seems quite reasonable already, let's assume we want to make it yet faster for some reasons.
A first step of optimizing Julia program is to take a look at the output of `@code_typed`:
\weave{
```julia
@code_typed compute(100_000_000) # only partially inlined
```
}

We can observe:
- `invoke Main.:/ₚ(...)::Point` indicates that there is a (static) function call of `/ₚ`, meaning `/ₚ` isn't inlined
- also `%new(Point, ...)::Point` means that some object "allocation" happens in the call[^allocation]

For this case inlining `/ₚ` could still be beneficial because of the following reasons:
- when `n` is big, the costs of repeated `/ₚ` calls may accumulate and become apparent
- by inlining `/ₚ`, there seems to be a good chance to eliminate the allocations that happen at
  `%new(Point, ...)::Point` and within the call of `/ₚ`

What can we do in such a situation ?
Julia programmers can ask the compiler to perform inlining using either of the following methods:
- the definition-site annotation
- the call-site annotation

## The definition-site annotation

In a case when we "own" the function, we can use [the definition-site annotation](https://docs.julialang.org/en/v1/base/base/#Base.@inline).
The usage is very simple – we annotate `@inline` or `@noinline` on the function definition.

For this case, we can use `@inline` to encourage the inlining of `/ₚ`:
\weave{
```julia
@inline a::Point /ₚ b::Point = begin
    # error pass
    if false
        @label diverror
        error("/ₚ: division error detected !")
    end
    # do some error checks
    iszero(a.y) && @goto diverror
    iszero(b.y) && @goto diverror
    # do the main computation
    Point(a.x/a.y, b.x/b.y)
end
```
}

Let's run the benchmark again:
\weave{
```julia
# the definition-site annotation version
@benchmark compute(100_000_000)
```
}

Yay, it seems to run about 30% faster than the previous version !

## The call-site annotation

Next, let's assume a case when we don't "own" a function that we want to be inlined.
When applied to this example, it would be such a situation where `Point`, `+ₚ` and `/ₚ` are provided
by a library that we don't maintain, and we are users of that library.
In the real world we may see such situations rather more often since we usually compose many library utilities to build up an algorithm or application.

Under such circumstances, it is really not preferable to use the definition-site annotation.
It is not impossible to use the definition-site annotation, since Julia allows us to overwrite a function definition at runtime[^monkeypatch],
but it tends to be a source of bugs and also, in Julia, it may incur unnecessary compilation overhead
since it will [invalidate](https://julialang.org/blog/2020/08/invalidations/) already compiled code caches.

In that situation you can use the call-site annotation, which will be added on the next-next stable version, Julia 1.8.
The call-site annotation uses the same `@inline`/`@noinline` macros as like the definition-site annotation,
but the macros are annotated on function calls rather than function definitions.
There will be no need to overwrite any function definition and so we don't need to worry about the problems of the definition-site annotation.

The call-site annotation was added very recently to the Julia language, and it is not very common feature
in other languages, you may not be familiar with it yet.
You can read its documentation [here](https://docs.julialang.org/en/v1.8-dev/base/base/#Base.@inline),
but to put it simply, it is implemented according to the following design:
- a call-site annotation affects all the function calls involved within a block to which the annotation is applied
- a call-site annotation is always prioritized over the definition-site annotation
- when call-site annotation are nested, the innermost annotation is prioritized

For this case we can use it like:
\weave{
```julia
function compute(n)
    a = Point(1.5, 2.5)
    b = Point(2.25, 4.75)
    for i in 0:(n-1)
        a = @inline (a +ₚ b) /ₚ b
    end
    return a.x, a.y
end
```
}

Again, we can obtain around 30% performance gain by the annotation !
\weave{
```julia
# the call-site annotation version
@benchmark compute(100_000_000)
```
}

### When to apply annotations

So, in what kind of situations do we want to consider adding annotations ?
Here is _my_ rule of thumb:
- when a simple function called within a heavy loop isn't inlined: add `@inline`
- when a complex function which is rarely called is inlined: add `@noinline`
- when there is an heavy overhead when compiling code full of `@inline` annotations: remove `@inline`

Having said that, it would be much more ideal if there is no need for programmers to add such annotations.
In other words, if a function that should be inlined is not inlined or vice versa, it simply means
there is a room for improvement in the compiler's cost model.

So if you encounter such a situation when inspecting Julia program,
please feel free to report it as an issue in the [`JuliaLang/julia`](https://github.com/JuliaLang/julia/issues) repository,
and it may lead to an improvement of Julia compiler.
In fact, there has been at least [one example](https://github.com/JuliaLang/julia/pull/41882) of such improvement just recently :)

## Extra: A quick dive into Julia's inlining cost model

We can take a peek at Julia's inlining cost model using [Cthulhu.jl](https://github.com/JuliaDebug/Cthulhu.jl).
Let's see why `/ₚ` wasn't inlined without annotations:
```julia
julia> using Cthulhu

julia> descend(/ₚ, (Point,Point); inline_cost=true)
/ₚ(a::Point, b::Point) in Main at untitled-e25fcb34ce5237c6bb8376cca04cf1b2:24
│ ─ %-1 = invoke /ₚ(::Point,::Point)::Point
26 1 ─  0       goto #3                                       │
28 2 ┄  0       invoke Main.error("/ₚ: division error detected !"::String)::Union{}
   └──  0       unreachable                                   │
31 3 ─  0 %4  = Base.getfield(_2, :y)::Float64                │╻  getproperty
   │    2 %5  = Base.eq_float(%4, 0.0)::Bool                  ││╻  ==
   └──  0       goto #5 if not %5                             │
   4 ─ 40       goto #2                                       │
32 5 ─  0 %8  = Base.getfield(_3, :y)::Float64                │╻  getproperty
   │    2 %9  = Base.eq_float(%8, 0.0)::Bool                  ││╻  ==
   └──  0       goto #7 if not %9                             │
   6 ─ 40       goto #2                                       │
34 7 ─  0 %12 = Base.getfield(_2, :x)::Float64                │╻  getproperty
   │    0 %13 = Base.getfield(_2, :y)::Float64                ││
   │   20 %14 = Base.div_float(%12, %13)::Float64             │╻  /
   │    0 %15 = Base.getfield(_3, :x)::Float64                │╻  getproperty
   │    0 %16 = Base.getfield(_3, :y)::Float64                ││
   │   20 %17 = Base.div_float(%15, %16)::Float64             │╻  /
   │    0 %18 = %new(Main.Point, %14, %17)::Point             │╻  Point
   └──  0       return %18                                    │
Select a call to descend into or ↩ to ascend. [q]uit. [b]ookmark.
Toggles: [o]ptimize, [w]arn, [h]ide type-stable statements, [d]ebuginfo, [r]emarks, [i]nlining costs, [t]ype annotations, [s]yntax highlight for Source/LLVM/Native.
Show: [S]ource code, [A]ST, [T]yped code, [L]LVM IR, [N]ative code
Actions: [E]dit source code, [R]evise and redisplay
Advanced: dump [P]arams cache.
 • %2 = invoke error(::String)::Union{}
   ↩
```

What is shown above is the body of `/ₚ`, but as an intermediate representation on which Julia compiler works on.
Here, the third column from the left (the one composed of the numbers `0`/`2`/`20`/`40`) indicates the
computed inlining costs corresponding to each [SSA statement](https://en.wikipedia.org/wiki/Static_single_assignment_form).

When there are no annotations, Julia compiler usually performs inlining of functions whose inline costs don't sum up to exceed `100`, and otherwise doesn't.
The sum of inlining costs of `/ₚ` is `124`, and this is why it was not inlined.

Let's take a closer look.
If you look closely, you will notice that the two `goto #2` statements have been assigned a high inline cost of `40`.
These two `goto #2` correspond to the `@goto diverror` in the original program.
Those `goto`s are jump instructions that go back to the opposite direction of the control-flow.
Such a backward jump usually implies the existence of a loop, which often does "complex" computations,
and thus assigned such a high inline cost. And as a result `/ₚ` was not inlined.

The core logic of Julia compiler's inlining cost model is described at [`base/compiler/optimizer.jl`](https://github.com/JuliaLang/julia/blob/a0ff94433010eeb5d1f3297fb4fffdf4a5ef5f7e/base/compiler/optimize.jl#L445-L580),
and the inlining costs of built-in functions are defined in [`base/compiler/tfuncs.jl`](https://github.com/JuliaLang/julia/blob/217979578c124e61560d5834ff0febad96f8f0ee/base/compiler/tfuncs.jl).
Particularly, the heuristic about a backward jump elaborated above corresponds to the logic defined [here](https://github.com/JuliaLang/julia/blob/217979578c124e61560d5834ff0febad96f8f0ee/base/compiler/optimize.jl#L544-L550).

There might be another interesting insights if you fiddle with Cthulhu to see how the inlining cost model makes decisions on various kinds of code.


# Conclusions

In this article we saw a general idea of inlining and its pros and cons,
as well as we covered the two different inlining annotations that are available for Julia programmers.

Well, there are still many other interesting topic that we couldn't cover.
For example, in the context of Julia compiler development, it was a quite interesting finding for me
that a success of inlining really depends on [constant-propagation](https://en.wikipedia.org/wiki/Constant_folding)
but a profitability of constant-propagation also depends on the success of inlining.

But this is just an introduction to inlining. Let's wrap it up now.
I hope you enjoyed this post and the fact that the idea of inlining is pretty simple but also its application is actually very profound !


# Footnotes

\newcommand{\fncallcost}{
References:
- <https://stackoverflow.com/questions/1932311/when-to-use-inline-function-and-when-not-to-use-it>
- <https://softwareengineering.stackexchange.com/questions/357084/when-do-function-call-costs-still-matter-in-modern-compilers>
}
[^callcost]: \fncallcost

\newcommand{\fnluajit}{
The example was adapted from [this](http://wiki.luajit.org/Allocation-Sinking-Optimization#implementation%5B)
code snippet used in the documentation of LuaJIT compiler.
}
[^luajit]: \fnluajit

[^sroa]: This allocation elimination by replacing structs with scalar values is called as "SROA – Scalar Replacement of Aggregates".

\newcommand{\fnjvm}{
JVM compilers often implement good escape analysis.
Some of them seem to tweak their inlining cost depending on whether of not if there is any argument
that doesn't escape, since inlining such function calls often leads to successful SROA:
<https://www.usenix.org/legacy/events/vee05/full_papers/p111-kotzmann.pdf>
}
[^jvm]: \fnjvm

\newcommand{\fnallocation}{
You may have noticed that `@benchmark compute(100_000_000)` nevertheless reported something that
really conflicts with this statement: `Memory estimate: 0 bytes, allocs estimate: 0.`.
That is because [`@benchmark`](https://juliaci.github.io/BenchmarkTools.jl/dev/reference/#BenchmarkTools.@benchmark-Tuple) nor [`@allocated`](https://docs.julialang.org/en/v1/base/base/#Base.@allocated)
don't account for anything allocated on stack memory by design.
Since `Point` is defined as immutable type, Julia compiler can optimize its allocation so that
`Point` objects are allocated on stack rather than heap.
It means memory allocated for `Point` will be released as soon as control-flow returns from the call
and so there won't be any GC pressure to manage and release the allocated memory later.
Still there remains some computations to store and load data into stack memory since `Point`
objects need to exist somewhere, but the computations are very cheap compared to the cost of
heap allocation as a whole.
This is why the performance `compute(100_000_000)` was quite fast already without the performance
tweaks with inlining annotations I showcased later on.

Now you may have wondered what happens if we define `Point` as mutable object ?
Then you've reached the cutting-edge of the universe !
Currently, mutable objects can't be allocated on stack at all.
Also, even if `/ₚ` is inlined and there is the good chance for SROA to eliminate the allocations,
actually both Julia's high-level compiler and even LLVM can't optimize them away...
Essentially we need some sort of [alias analysis](https://en.wikipedia.org/wiki/Alias_analysis)
somewhere in high-level compilation pipeline for this case, because `Point`s are actually nested in the example program.

The good news is that we _are_ working on this sort of memory optimizations !
You can take a peek on these HackMD documents:
- [Julia Escape Analysis Project](https://hackmd.io/bZz8k6SHQQuNUW-Vs7rqfw?view)
- [Intensive Prior Research on Escape Analysis](https://hackmd.io/87v0Zmh3SS2WtvZyfPVLAA?view)
or even drop in at our weekly meeting if you're interested. Please ping me on Julia slack if that's the case.
}
[^allocation]: \fnallocation

\newcommand{\fnmonkeypatch}{
This kind of technique is often called as ["monkey-patching"](https://en.wikipedia.org/wiki/Monkey_patch).
Actual method of monkey-patch really depends on what kind of features are provided by languages or frameworks.
In Julia, we can do monkey-patching using [`Core.eval`](https://docs.julialang.org/en/v1/base/base/#Core.eval),
which allows us to evaluate arbitrary piece of code in the context of an already-defined module.
For this specific case, if module `A` defines `/ₚ`, we can overwrite that definition and define
a new equivalent definition except with the definition-site `@inline` annotation:
```julia
Core.eval(A, quote
    @inline a::Point /ₚ b::Point = begin
        # error pass
        if false
            @label diverror
            error("/ₚ: division error detected !")
        end
        # do some error checks
        iszero(a.y) && @goto diverror
        iszero(b.y) && @goto diverror
        # do the main computation
        Point(a.x/a.y, b.x/b.y)
    end
end)
```
}
[^monkeypatch]: \fnmonkeypatch
