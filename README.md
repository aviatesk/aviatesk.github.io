## [aviatesk.github.io](https://aviatesk.github.io/)

This is the source of my homepage:
- built with [Franklin.jl](https://franklinjl.org/)
- originally adapted from the [basic](https://tlienart.github.io/FranklinTemplates.jl/templates/basic/index.html) template
- and then some stylesheet tweaks are added and custom JavaScripts are plugged in, for collapsible blocks and sticky navigation bar, etc

### Build the improved highlight.min.js

Thanks to [Fredrik Ekre](https://github.com/fredrikekre), we can have [the improved highlight.js for Julia](https://fredrikekre.se/posts/highlight-julia/).
Currently we need to build it ourselves since it's not released yet:
```bash
> cd highlight.js && node tools/build.js julia julia-repl diff && cd .. && mv highlight.js/build/highlight.min.js _libs/highlight
```

### License

The contents of this repository are under [MIT License](LICENSE.md).
