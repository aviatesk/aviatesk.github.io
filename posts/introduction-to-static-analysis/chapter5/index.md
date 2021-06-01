@def title       = "Chapter 5 — Advanced Static Analysis Techniques"
@def pubdate     = "2021-05-15"
@def description = "A note on \"Introduction to Static Analysis\", Chapter 5 — Advanced Static Analysis Techniques"
@def rss_pubdate = Date(2021, 05, 15)
@def rss         = "A note on \"Introduction to Static Analysis\", Chapter 5 — Advanced Static Analysis Techniques"

{{ blogtitle }}

\toc

# Constructions of Abstract Domains

## Product Domain

\example{Coalescent product}{
- let $M_{\bot}^{\#}$ to be the abstract element defined by $M_{\bot}^{\#}(x) = M_{\bot}^{\#}(y) = \bot$
- when $M^{\#}$ maps any variable into $\bot$, it should be _reduced_ into $M_{\bot}^{\#}$
- => can improve the analysis precision of condition tests, etc.
- this technique is also used in Julia abstract interpretation, e.g. [`abstract_statement`](https://github.com/JuliaLang/julia/blob/9113c01bb1ae0e144dc92f9b0b3e051409f35c0a/base/compiler/abstractinterpretation.jl#L1401-L1403)
  * NOTE: this is why the abstract element is initialized `NOT_FOUND`, rather than `Bottom`, I think
}

\\

\note{Note}{
A static analysis based on a reduced product is in general more precise than a _product of static analysis_.
Because the former can refine abstract information at any time, rather than only at the very end.
}


# Advanced Iteration Techniques

$$
M_0^{\#} = M^{\#}\\
M_{k+1}^{\#} = M_k^{\#} \triangledown F^{\#}(M_k^{\#}) \\
M_{lim}^{\#}: \text{lfp} \\
F^{\#}: \text{abstract interation function}
$$

## Loop Unrolling

In practice, the first iteration(s) of a loop often has a special effect.
=> unroll the first $N$ iterations, and delays the abstract joins, which introduces a loss of precision.

$$
M_0^{\#}     = M^{\#}\\
M_{k+1}^{\#} = \begin{cases}
               F^{\#}(M_k^{\#}) &\text{if } k < N \\
               M_k^{\#} \triangledown F^{\#}(M_k^{\#}) &\text{otherwise}
               \end{cases}
$$

## Delayed Widening

Use regular abstract union $\sqcup^{\#}$ for the first $N$ iterations in the loop.
$$
M_0^{\#}     = M^{\#}\\
M_{k+1}^{\#} = \begin{cases}
               M_k^{\#} \sqcup^{\#} F^{\#}(M_k^{\#}) &\text{if } k \le N \\
               M_k^{\#} \triangledown F^{\#}(M_k^{\#}) &\text{otherwise}
               \end{cases}
$$

## Refinement of an Abstract Approximation of a Least Fixpoint

Given a concrete fixpoint of the concrete function $G$, applying $G^{\#}$ again to any sound approximation of this
concrete fixpoint produces another sound approximation. \
This means that, once the algorithm stabilizes, we can simply compute one more iteration in the abstract level and still
obtain a sound approximation of the states at the loop head.

```
x = 0;
while (rand() && x < 50) {
  x += 1;
}
```

- after abstract iteration: $\{ x \rightarrow [0, +\infty) \}$
- after additional one $F^{\#}$ application: $\{ x \rightarrow [1, 50] \}$
- merged with the entry state: $\{ x \rightarrow [0, 50] \}$


# Sparse Analysis

- spatial sparsity: usually, each program portion (an expression, a statement, a sequence of statements, a procedure,
  a loop body, etc.) access only a small part of the whole memory
- temporal sparsity: after the definition (write)of a memory location, its use (read) is not immediate but a while later

## Exploiting Spartial Sparsity


# Modular Analysis

E.g.:
- unit of module analysis: procedure (function)
- first, separately analyze procedures by "parameterizing" its call context
  * symbolic pre-state → symbolic post-state
- later, at link time, the global behavior of the program is obtained by instantiating parameterized pre/post states
  with the actual calling context, and stitching the procedure summaries

xref: <https://research.fb.com/inferbo-infer-based-buffer-overrun-analyzer/>


# Backward Analysis

We can actually design static analyses to compute over-approximate _pre-conditions from a post-condition_.x

## Forward Semantics and backward Semantics

e.g. Boolean filter $ℱ_B$ reconciled.

$ℱ_B$: takes as inputs a boolean expression $B$ and a set of states, filters out the states such that $B$ evaluate to false,
       keeping only those states such that $B$ evaluates to true.

$$
  ℱ_B(M) = \{ m \in M | \llbracket B \rrbracket(m) = \text{true} \}
$$
can be re-defined with _backward semantics_ $\llbracket B \rrbracket_{\textbf{bwd}}$:
$$
  \llbracket B \rrbracket_{\textbf{bwd}}(v) = \{ m \in M | \llbracket B \rrbracket(m) = v \} \\
  ℱ_B(M) = M \cap \llbracket B \rrbracket_{\textbf{bwd}}(\text{true})
$$
The semantics $\llbracket B \rrbracket_{\textbf{bwd}}$ is defined in _backward_ style, as it takes a value (i.e. a result)
and returns the set of states that lead to this value.

## Possible Applications

Example program: given the abstract post-condition $\{x_0 \mapsto \top, x_1 \mapsto [-\infty, -3]\}$, a backward-analysis
                 returns an empty set (i.e. no pre-condition exists)
```
int x₀, x₁;
input(x₀);
if (x₀ > 0) {
  x₁ := x₀;
} else {
  x₁ := -x₀;
}
```

By computing an over-approximation of the sets of states leading to some given behavior, backward analysis:
- provides a _necessary_ condition for this behavior to occur
- dually, also computes a _sufficient_ condition for a given behavior _not_ to occur

## Precision Refinement by Combined Forward and Backward Analysis

```
L0  ...
    if (y ≤ x) {
L1    ...
      if (x ≤ 4) {
L2      ...
        if (5 ≤ y) {
L3        ...
```

- non-relational forward-analysis can't prove `L3` is actually not reachable
- backward analysis:
  * assumes the abstract state $\{x \mapsto (-\infty), 4], y \mapsto [5, +\infty) ]\}$
  * back-propagated to `if (y ≤ x)`, we obtain the empty pre-condition, which indicates the assumed abstract post-state is not feasible

Backward analysis can be applied very locally to refine the analysis of tests, etc. as
[Julia's compiler does](https://github.com/JuliaLang/julia/blob/5aca7a37be174ad9f4b28d3586ba9cc112c12d75/base/compiler/abstractinterpretation.jl#L1003-L1069).
