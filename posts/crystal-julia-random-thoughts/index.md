@def title       = "Another IDE"
@def pubdate     = "2020-12-31"
@def description = "Crystal and Juila, random thoughts for next generation of IDE"
@def rss_pubdate = Date(2020, 12, 31)
@def rss         = "Crystal and Juila, random thoughts for next generation of IDE"
@def tags        = ["julia"]

{{ blogtitle }}

Today I gave the [Crystal language](https://crystal-lang.org/) a try.
I was interested in how we can obtain type safety from its Ruby-like, easy and concise syntax.
As I wrote more code, I found Crystal coding is somewhat similar to my coding experience with the [Julia language](https://julialang.org/).
Well, the reason is clear; there is inter-procedural type inference in both languages, and we don't need to spread useless type annotations in order to obtain type safety and/or runtime performance, which I believe is quite nice thing.

@@caption this simple program can be statically compiled by crystal compiler @@

```cr
# we don't need any annotations like `summer(a : Array(Int32 | Float64))`
def summer(a)
  ret = 0
  a.each { |e| ret += e  }
  ret
end

ia = [1, 2, 3]
p summer(ia) # => 6

fa = [1.0, 2.0, 3.0]
p summer(fa) # => 6.0
```

[This blog post](https://crystal-lang.org/2014/12/06/another-language.html) by Ary Borenzweig, one of Crystal's core devs was about the challenge for such languages: incremental compilation.

With the existence of inter-procedural type inference, it's hard to compile code method by method, and as a consequence, incremental compilation tends to be slow. It also means REPL might not be doable, because a method can't be compiled without its entry point (i.e. actual arguments). Because of this reason, Crystal doesn't have REPL yet[^1].

Julia, in turn, is dynamically compiled and its JIT compilation always happens just after the entry point is known, so we can have a REPL without the problem (well, it's not just there is a REPL, but rather it's a quite nice REPL - I don't know any other REPL that is better than Julia's).

What about incremental compilation ? I think, in Julia's context, [code cache invalidation](https://julialang.org/blog/2020/08/invalidations/) can be seen as a sort of incremental compilation.
The invalidation is triggered on a method refinement so smartly that it only invalidates as least compiled code cache as possible[^4], but I'd say the problem surely exists (a.k.a. ["time to first plot"](https://discourse.julialang.org/t/roadmap-for-a-faster-time-to-first-plot/22956)).
Julia community's recent approach for that problem is to try hard to improve the code quality so that we eliminate type-instabilities to make it robust against future invalidations, which would be positive also from performance perspective. [SnoopCompile.jl](https://github.com/timholy/SnoopCompile.jl) is the primary tool for this, by helping us finding where type-instabilities and invalidations happen.

Well, code cache invalidation is rather an essential feature in a dynamic environment like REPL.
While statically-compiled languages in general offer fancy IDE environments powered by incremental compilation, but it seems that incremental compilation in a form of compiled code invalidation is not usually integrated with their REPL (even if it exists).
E.g. here are examples where Scala and Haskell REPL don't seem to update previously-compiled code, while Julia can handle it and works as we expect[^2].

@@caption compiled code invalidations in REPL @@

\table{
  \tr{ \th{Language} \th{REPL code} }
  \tr{ \td{Scala} \td{
```plaintext
❯ sbt consoleQuick
...
[info] welcome to sbt 1.4.4 (AdoptOpenJDK Java 1.8.0_252)
...
Welcome to Scala 2.12.12 (OpenJDK 64-Bit Server VM, Java 1.8.0_252).
...
```
```scala
scala> def inner(a: Int) = Math.sin(a)
inner: (a: Int)Double

scala> def outer(a: Int) = a + inner(a)
outer: (a: Int)Double

scala> outer(1)
res0: Double = 1.8414709848078965

scala> def inner(a: Int) = Math.cos(a) // update `inner`
inner: (a: Int)Double

scala> outer(1) // here we want `outer` to be updated too, but ...
res1: Double = 1.8414709848078965
```
  }}
  \tr{ \td{Haskell} \td{
```plaintext
❯ stack ghci
...
GHCi, version 8.6.5: http://www.haskell.org/ghc/  :? for help
...
```
```haskell
λ> inner = sin
λ> outer a = a + inner a
λ> outer 1
1.8414709848078965
λ> inner = cos -- update `inner`
λ> outer 1 --  here we want `outer` to be updated too, but ...
1.8414709848078965
```
  }}
  \tr{ \td{Julia} \td{
```plaintext
❯ julia
               _
   _       _ _(_)_     |  Documentation: https://docs.julialang.org
  (_)     | (_) (_)    |
   _ _   _| |_  __ _   |  Type "?" for help, "]?" for Pkg help.
  | | | | | | |/ _` |  |
  | | |_| | | | (_| |  |  Version 1.7.0-DEV.202 (2020-12-31)
 _/ |\__'_|_|_|\__'_|  |  Commit 1ad6aeddf5 (0 days old master)
|__/                   |
```
```julia
julia> inner(a) = sin(a)
inner (generic function with 1 method)

julia> outer(a) = a + inner(a)
outer (generic function with 1 method)

julia> outer(1)
1.8414709848078965

julia> inner(a) = cos(a) # update `inner`
inner (generic function with 1 method)

julia> outer(1) # yay, this is what we want !
1.5403023058681398
```
  }}
}

Conversely, we could say Julia's coding environments other than REPL still don't make good use of its internal incremental compilation system (in my opinion, at least). My idea is that we can re-use it for IDE features with real-time feedbacks.

Say if we want fancy IDE features like type-level error linting for a dynamic language, but also want to preserve its easy and simple coding experience at the same time.
If we have such a tool, we can find an error point or performance pitfall before we actually run the code without scattering type annotations that are only necessary for type checking, like Crystal can ensure type safety of simply-written code at compile time.

Such a tool needs some kind of inter-procedural program analysis, rather than the other existing, promised [gradual typing](https://en.wikipedia.org/wiki/Gradual_typing) approach[^3]. But as I said above, it will suffer from real-time analysis speed; we will need analysis caching and its incremental invalidation in order to keep the analysis fast enough for real-time feedbacks in IDEs.
Fortunately, Julia already has good implementations of type inference and its invalidation system that are originally necessary for the performance and dynamic coding. We can make good use of it to build a next generation of IDE.

The idea outlined above is exactly what I'm trying to realize with [JET.jl](https://github.com/aviatesk/JET.jl). I hope I could advance it to a stage where we can use it within VSCode in the next few months.

---

[^1]: <https://github.com/crystal-lang/crystal/issues/681>
[^4]: Technically, compiled code cache invalidation is done by tracking "backeges" of compiled method instance during JIT compilation. This [blog post](https://julialang.org/blog/2020/08/invalidations/) may help you understand how code cache invalidation happens in action.
[^2]: I'm not sure even if this problem is recognized by developers/users of those languages. Or the priority of REPL is not so high for them ?
[^3]: I think the gradual typing approach would be ineffective especially for Julia, because type annotations are about how a generic function dispatches to its method and so are closely related to how it _runs_ rather than just helping a developer understand code.
