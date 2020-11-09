<!-- Franklin default -->
@def author = "Shuhei Kadowaki"
@def date_format = "yyyy-mm-dd"
@def div_content = "franklin-content"
@def ignore = ["node_modules/", "highlight.js/"]
@def maxtoclevel = 2


<!-- rss -->
@def website_title = "Franklin Template"
@def website_descr = "Shuhei Kadowaki's website"
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

<!-- collapsible block -->
\newcommand{\collapsible}[2]{
  @@collapsible
    @@collapsible-header #1 @@
    @@collapsible-content #2 @@
  @@
}
