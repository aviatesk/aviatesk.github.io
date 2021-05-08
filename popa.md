@def title       = "Principles of Program Analysis"
@def pubdate     = "2021-05-08"
@def description = "exercises of \"Principles of Program Analysis\""
<!-- @def rss_pubdate = Date(2021, 4, 20) -->
<!-- @def rss         = "exercises of \"Principles of Program Analysis\"" -->

{{ blogtitle }}

Exercises of "Principles of Program Analysis"

## 1.1

### $\vec{\texttt{RD}}$

#### definition
$\texttt{RD} = \{(v, l) | (v \in \textbf{Var}, l \in \textbf{Lab})\}$

#### initialization
- $\texttt{RD}_{entry}(1) = \{(x,?) | x \text{ is a variable in the program}\}$

#### assignment
- $\texttt{RD}_{exit}(1) = (\texttt{RD}_{entry}(1) \backslash \{(y,l)|l \in \textbf{Lab}\}) \cup \{(y,1)\}$
- $\texttt{RD}_{exit}(2) = (\texttt{RD}_{entry}(2) \backslash \{(z,l)|l \in \textbf{Lab}\}) \cup \{(z,2)\}$
- $\texttt{RD}_{exit}(3) = \texttt{RD}_{entry}(3)$
- $\texttt{RD}_{exit}(4) = (\texttt{RD}_{entry}(4) \backslash \{(z,l)|l \in \textbf{Lab}\}) \cup \{(z,4)\}$
- $\texttt{RD}_{exit}(5) = (\texttt{RD}_{entry}(5) \backslash \{(y,l)|l \in \textbf{Lab}\}) \cup \{(y,5)\}$
- $\texttt{RD}_{exit}(6) = (\texttt{RD}_{entry}(6) \backslash \{(y,l)|l \in \textbf{Lab}\}) \cup \{(y,6)\}$

#### control flow
- $\texttt{RD}_{entry}(2) = \texttt{RD}_{exit}(1)$
- $\texttt{RD}_{entry}(3) = \texttt{RD}_{exit}(2) \cup \texttt{RD}_{exit}(5)$
- $\texttt{RD}_{entry}(4) = \texttt{RD}_{exit}(3)$
- $\texttt{RD}_{entry}(5) = \texttt{RD}_{exit}(4)$
- $\texttt{RD}_{entry}(6) = \texttt{RD}_{exit}(5)$

### $\vec{\texttt{RL}}$

#### definition
$\texttt{RL} = \{l_v | (l_v \in \textbf{Lab}, v \in \textbf{Var})\}$

#### initialization
- $\texttt{RL}_{entry}(1) = \{?_{x} | x \text{ is a variable in the program}\}$

#### assignment
- $\texttt{RL}_{exit}(1) = (\texttt{RL}_{entry}(1) \backslash \{l_y | y \in \textbf{Var}\}) \cup \{1_y\}$
- $\texttt{RL}_{exit}(2) = (\texttt{RL}_{entry}(2) \backslash \{l_z | z \in \textbf{Var}\}) \cup \{2_z\}$
- $\texttt{RL}_{exit}(3) = \texttt{RL}_{entry}(3)$
- $\texttt{RL}_{exit}(4) = (\texttt{RL}_{entry}(4) \backslash \{l_z | z \in \textbf{Var}\}) \cup \{4_z\}$
- $\texttt{RL}_{exit}(5) = (\texttt{RL}_{entry}(5) \backslash \{l_z | z \in \textbf{Var}\}) \cup \{5_y\}$
- $\texttt{RL}_{exit}(6) = (\texttt{RL}_{entry}(6) \backslash \{l_y | y \in \textbf{Var}\}) \cup \{6_y\}$

#### control flow
- $\texttt{RL}_{entry}(2) = \texttt{RL}_{exit}(1)$
- $\texttt{RL}_{entry}(3) = \texttt{RL}_{exit}(2) \cup \texttt{RL}_{exit}(5)$
- $\texttt{RL}_{entry}(4) = \texttt{RL}_{exit}(3)$
- $\texttt{RL}_{entry}(5) = \texttt{RL}_{exit}(4)$
- $\texttt{RL}_{entry}(6) = \texttt{RL}_{exit}(5)$
