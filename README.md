## [aviatesk.github.io](https://aviatesk.github.io/)

This is the source of my homepage:
- built with [Franklin.jl](https://franklinjl.org/)
- originally adapted from the [basic](https://tlienart.github.io/FranklinTemplates.jl/templates/basic/index.html) template
- and then some stylesheet tweaks are added and custom JavaScripts are plugged in, for collapsible blocks and sticky navigation bar, etc

### Build the improved highlight.min.js and pre-render pages using it

Thanks to [Fredrik Ekre](https://github.com/fredrikekre), we can have [the improved highlight.js for Julia](https://fredrikekre.se/posts/highlight-julia/).
Since it's not released yet, we need:
- browser target build for local rendering
- node target build for deployment with Franklin.jl's pre-rendering step
```zsh
git submodule init
git submodule update
cd highlight.js
npm install --dev
node tools/build.js julia julia-repl diff plaintext && cp -f build/highlight.min.js ../_libs/highlight/highlight.pack.js # for interactive use
node tools/build.js -t node julia julia-repl diff plaintext && cp -rf build/lib . # for deployment (pre-rendering)
cd ..
```

### License

The contents of this repository are under [MIT License](LICENSE.md).
