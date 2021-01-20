## [aviatesk.github.io](https://aviatesk.github.io/)

This is the source of my homepage:
- built with [Franklin.jl](https://franklinjl.org/)
- originally adapted from the [basic](https://tlienart.github.io/FranklinTemplates.jl/templates/basic/index.html) template
- and then some stylesheet tweaks are added and custom JavaScripts are plugged in, for collapsible blocks and sticky navigation bar, etc

### Build highlight.pack.js

```zsh
git submodule init
git submodule update
cd highlight.js
npm install --also=dev
node tools/build.js julia julia-repl haskell crystal scala diff plaintext && cp -f build/highlight.min.js ../_libs/highlight/highlight.pack.js # for interactive use
# node tools/build.js -t node julia julia-repl haskell crystal scala diff plaintext # for deployment (pre-rendering)
cd ..
```

### License

The contents of this repository are under [MIT License](LICENSE.md).
