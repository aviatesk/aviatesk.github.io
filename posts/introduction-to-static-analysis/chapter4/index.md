@def title       = "Chapter 4 — A General Static Analysis Framework Based on a Transitional Semantics"
@def pubdate     = "2021-05-10"
@def description = "A note on \"Introduction to Static Analysis\", Chapter 4 — A General Static Analysis Framework Based on a Transitional Semantics"
@def rss_pubdate = Date(2021, 05, 10)
@def rss         = "A note on \"Introduction to Static Analysis\", Chapter 4 — A General Static Analysis Framework Based on a Transitional Semantics"

{{ blogtitle }}

⚠: this note is very WIP, won't provide you any useful information; just go ahead for the chapter in the book and follow the mathematics, they're very well explained there.

## Semantics as State Transitions

### Compositional Semanics vs. Transitional Semantics

- transitional style is generally easier to be defined for complex languages
  * **dynamic jumps**: e.g. function calls, exception raises
  * with gotos, program constructs can't boil down to a particular construct like `while`-loop
- good fit for reachability problem: all the intermediate program states are exposed as semantics

### Concrete Semantics

- A state $s \in 𝕊$: a pair $(l, m)$ of a program label $l$ and the machine state $m$

### Recipes for Defining a Concrete Transitional Semantics

1. define the set 𝕊 of states between which a single-step transition relation $\hookrightarrow$ is to be defined
2. define the $s \hookrightarrow s^\prime$ relation between states $s, s^\prime \in 𝕊$, and let $Step$ be its natural powerset lifted version:
   $Step(X) = \{s^\prime | s \hookrightarrow s^\prime, s \in X \}$
3. given a program of the language with its set $I \subseteq 𝕊$, let $F(X) = I \cup Step(X)$
4. the concrete semantics, defined as the set of all the reachable states of the program, is the least fixpoint of the continuous function $F$: $\text{lfp} F = \cup_{i \ge 0} F^i(\emptyset)$

\definition{Semantic Domain and Semantic Function}{
- _concrete semantic function_: $F: 𝒫(𝕊) \rightarrow 𝒫(𝕊)$
- _concrete semantic domain_: $𝒫(𝕊)$
}

**The concrete semantics is not what we implement as a static analyzer**; its implementation is rather equivalent to implementing an interpreter that actually runs the programs of the target language.

## Abstract Semantics as Abstract State Transitions

Abstract versions:
- $I^{\#}$
- $\cup^{\#}$
- $Step^{\#}$
- $𝕊^{\#}$: _abstract domain_
- $F^{\#}: 𝕊^{\#} \rightarrow 𝕊^{\#}$: _abstract semantic function_

#### Abstract Domain by Galois Connection

- _CPO (complete partial order)_: a partial order
  * has a least element: _bottom_ $\bot$
  * such that each totally ordered subset has a [least upper bound](https://web.ma.utexas.edu/users/perutz/ResMethods2011/Notes/L7.pdf)

## Analysis Algorithm Based on Global Iterations

This is the one Julia's abstract interpretation uses.
