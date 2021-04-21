@def title       = "Chapter 1 — Program Analysis"
@def pubdate     = "2021-04-17"
@def description = "A note on \"Introduction to Static Analysis\", Chapter 1 — Program Analysis"
@def rss_pubdate = Date(2021, 4, 17)
@def rss         = "A note on \"Introduction to Static Analysis\", Chapter 1 — Program Analysis"

{{ blogtitle }}

# 1.3 Concepts in Program Analysis

## 1.3.2 Static versus Dynamic

Motivations for static analysis
- "before-use" analysis
- analysis of a program that might be never terminating

## 1.3.3 A Hard Limit: Uncomputability

\theorem{Halting problem}{
  The halting problem consists in finding an algorithm `halt` such that,
  \q{for every program `p` ∈ 𝙻, `halt`(`p`) = **true** _if and only if_ `p` terminates}
}

\\

\theorem{Rice theorem}{
  Let 𝙻 be a Turing-complete language, and let 𝒫 be a nontrivial semantic property of programs of 𝙻. There exists no algorithm such that,
  \q{for every program `p` ∈ 𝙻, it returns **true** _if and only if_ `p` satisfies the semantic property 𝒫.}
}

So how to design a program analysis ?
- target a restricted class of programs: give up the "for every program `p`" part
- not always being able to provide an exact answer: give up the "_if and only if_" part

## 1.3.5 Approximation: Soundness and Completeness

Let `analysis` to be an analysis tool to determine whether this property holds:
\q{for every program `p` ∈ 𝙻, `analysis(p)` = **true** ⇔ `p` satisfies 𝒫.}
can be decomposed into a pair of implications:
\q{
for every program `p` ∈ 𝙻, `analysis(p)` = **true** ⇒ `p` satisfies 𝒫.\\
for every program `p` ∈ 𝙻, `analysis(p)` = **true** ⇐ `p` satisfies 𝒫.
}

## Soundness

A _sound_ program analysis satisfies the first implication.

\definition{Soundness \label{soundness}}{
  The program analyzer `analysis` is _sound_ with respect to property 𝒫 whenever, for any program `p` ∈ 𝙻,
  `analysis(p)` = **true** implies that `p` satisfies property 𝒫.
}

A sound analysis will reject all programs that do not satisfy 𝒫.

\example{Strong Typing}{
- good: well-typed programs will not present certain classes of errors
- bad: certain programs that will never crash may still be rejected
}

The soundness is easy to meet; we can simply reject any program.
Therefore, in practice, the design of a sound analysis will try to give a conclusive answer as often as possible.

## Completeness

\definition{Completeness}{
  The program analyzer `analysis` is _complete_ with respect to property 𝒫 whenever, for every program `p` ∈ 𝙻,
  such that `p` satisfies 𝒫, `analysis(p)` = **true**.
}

The completeness is also easy to meet; we can simply never reject any program.
To be useful, a complete analyzer should often reject programs that don't satisfy the property of interest.

## Soundness vs. Completeness

![soundness-vs-completeness](./assets/soundness-vs-completeness.png)
@@caption Soundness vs. Completeness (adapted from Figure 1.2 from the book) @@

When a program analysis is automatic, it is either unsound or incomplete.

# 1.4 Families of Program Analysis Techniques

- _**Testing**_: check a finite set of finite program executions
  * unsound and complete
  * good: easy, very close to the actual runtime
  * bad: may not terminate, may not be deterministic (e.g. concurrent programs), not feasible to fully observe all executions
  * xref: [concolic testing](https://en.wikipedia.org/wiki/Concolic_testing) to improve coverage and accuracy
- _**Assisted Proof**_: rely on user-supplied invariants
  * 2 basic approaches:
    + based on theorem-proving tools (e.g. [Coq](https://coq.inria.fr/))
    + leverages a tool infrastructure to prove a specific set of properties over programs in a specific language (e.g. [dafny](https://github.com/dafny-lang/dafny))
  * good: often sound to respect to the model of the program semantics used for the proof, also complete up to the abilities of the proof assistant to verify proofs
  * bad: non-automated, requires significant time and expertise
- _**(Finite-State) Model Checking**_: exhaustive exploration of finite systems
  * use some kind of exhaustive (but efficient) enumeration and determine whether all executions satisfy the property of interest
  * good: automatic, sound and complete _with respect to the model_
  * caveat: verification is performed at the model level and not at the program level
    + a model of the program needs to be constructed (manually or by some automatic frontend means)
    + => the checking of the synthesized model may be either incomplete or unsound, _with respect to the input program_ (incompleteness or unsoundness is often introduced in the modeling stage)
  * often conservative: sound and incomplete with respect to the input program
- _**Conservative Static Analysis**_: automatic, sound, and incomplete approach
  * idea: finitely over-approximate the set of all program behaviors using a specific set of properties
  * many existing trials
    + [Astrée](https://www.absint.com/astree/index.htm): proves the absence of run-time errors in embedded C codes
    + [Infer](https://github.com/facebook/infer): detects memory issues in C/C++/Java programs
    + [JULIA](https://www.verifysoft.com/en_julia_static_analyzer.html): discovers security issues in Java programs
  * often sound and incomplete
  * we can think of unsound and complete static analysis
    + will answer very different kind of question
    + may guarantee that a given subset of the executions of the program can be observed, while it doesn't prove properties such as the absence of run-time errors
- _**bug finding**_: Relaxed error search, automatic, unsound, incomplete, based on heuristics
  * simplify the design and implementation of analysis tools and to provide lighter-weight verification algorithms
  * can be used to improve the quality of non-critical programs at a low cost
  * examples:
    + [JET.jl](https://github.com/aviatesk/JET.jl): JET is unsound and incomplete bug finder for Julia, thus falls into this category (as of now, at least)
    + [CBMC](https://www.cprover.org/cbmc/): extracts models from C/C++/Java programs and performs bounded model checking (i.e. explores models only up to fixed depths)

\table{
\tr{ \th{} \th{automatic} \th{soundness} \th{completeness} \th{object} \th{when} }
\tr{ \td{testing} \td{No} \td{No} \td{Yes} \td{Program} \td{Dynamic} }
\tr{ \td{Assisted Proof} \td{No} \td{Yes} \td{Yes/No} \td{Model} \td{Static} }
\tr{ \td{Model Checking of finite-state model} \td{Yes} \td{Yes} \td{Yes} \td{Finite Model} \td{Static} }
\tr{ \td{Model Checking at program level} \td{Yes} \td{Yes} \td{No} \td{Program} \td{Static} }
\tr{ \td{Conservative Static Analysis} \td{Yes} \td{Yes} \td{No} \td{Program} \td{Static} }
\tr{ \td{bug finding} \td{Yes} \td{No} \td{No} \td{Program} \td{Static} }
}
@@caption an overview of program analysis techniques @@
