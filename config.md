<!-- Franklin default -->
@def author      = "Shuhei Kadowaki"
@def date_format = "yyyy-mm-dd"
@def div_content = "franklin-content"
@def ignore = ["node_modules/", "highlight.js/"]
@def maxtoclevel = 2
@def lang        = "plaintext"

<!-- RSS -->
@def generate_rss  = true
@def website_title = "Shuhei Kadowaki's homepage"
@def website_descr = "Personal blog of Shuhei Kadowaki, @aviatesk"
@def website_url   = "https://aviatesk.github.io/"

<!-- commands -->
<!-- inserts a raw HTML -->
\newcommand{\raw}[1]{~~~#1~~~}

<!-- admonitions -->
\newcommand{\note}[2]{
  @@note
    @@admonition-header #1 @@
    @@admonition-body #2 @@
  @@
}
\newcommand{\tip}[2]{
  @@tip
    @@admonition-header #1 @@
    @@admonition-body #2 @@
  @@
}
\newcommand{\warning}[2]{
  @@warning
    @@admonition-header #1 @@
    @@admonition-body #2 @@
  @@
}
\newcommand{\danger}[2]{
  @@danger
    @@admonition-header #1 @@
    @@admonition-body #2 @@
  @@
}
\newcommand{\compat}[2]{
  @@compat
    @@admonition-header #1 @@
    @@admonition-body #2 @@
  @@
}

<!-- academic -->
\newcommand{\theorem}[2]{
  @@theorem
    @@admonition-header Theorem: #1 @@
    @@admonition-body #2 @@
  @@
}
\newcommand{\q}[1]{@@theorem-quote #1 @@}
\newcommand{\definition}[2]{
  @@definition
    @@admonition-header Definition: #1 @@
    @@admonition-body #2 @@
  @@
}
\newcommand{\example}[2]{
  @@example
    @@admonition-header Example: #1 @@
    @@admonition-body #2 @@
  @@
}

<!-- collapsible block -->
\newcommand{\collapsible}[2]{
  @@collapsible
    @@collapsible-header #1 @@
    @@collapsible-content #2 @@
  @@
}
