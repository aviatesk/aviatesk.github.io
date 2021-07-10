/*!
  Highlight.js v11.1.0 (git: 83ad2fbd99)
  (c) 2006-2021 Ivan Sagalaev and other contributors
  License: BSD-3-Clause
 */
var hljs=function(){"use strict";var e={exports:{}};function n(e){
return e instanceof Map?e.clear=e.delete=e.set=()=>{
throw Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=()=>{
throw Error("set is read-only")
}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((t=>{var i=e[t]
;"object"!=typeof i||Object.isFrozen(i)||n(i)})),e}
e.exports=n,e.exports.default=n;var t=e.exports;class i{constructor(e){
void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}
ignoreMatch(){this.isMatchIgnored=!0}}function a(e){
return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")
}function s(e,...n){const t=Object.create(null);for(const n in e)t[n]=e[n]
;return n.forEach((e=>{for(const n in e)t[n]=e[n]})),t}const r=e=>!!e.kind
;class o{constructor(e,n){
this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){
this.buffer+=a(e)}openNode(e){if(!r(e))return;let n=e.kind
;n=e.sublanguage?"language-"+n:((e,{prefix:n})=>{if(e.includes(".")){
const t=e.split(".")
;return[`${n}${t.shift()}`,...t.map(((e,n)=>`${e}${"_".repeat(n+1)}`))].join(" ")
}return`${n}${e}`})(n,{prefix:this.classPrefix}),this.span(n)}closeNode(e){
r(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){
this.buffer+=`<span class="${e}">`}}class l{constructor(){this.rootNode={
children:[]},this.stack=[this.rootNode]}get top(){
return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){
this.top.children.push(e)}openNode(e){const n={kind:e,children:[]}
;this.add(n),this.stack.push(n)}closeNode(){
if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){
for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}
walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){
return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),
n.children.forEach((n=>this._walk(e,n))),e.closeNode(n)),e}static _collapse(e){
"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{
l._collapse(e)})))}}class c extends l{constructor(e){super(),this.options=e}
addKeyword(e,n){""!==e&&(this.openNode(n),this.addText(e),this.closeNode())}
addText(e){""!==e&&this.add(e)}addSublanguage(e,n){const t=e.root
;t.kind=n,t.sublanguage=!0,this.add(t)}toHTML(){
return new o(this,this.options).value()}finalize(){return!0}}function d(e){
return e?"string"==typeof e?e:e.source:null}function g(e){return u("(?:",e,")?")
}function u(...e){return e.map((e=>d(e))).join("")}function b(...e){
return"("+((e=>{const n=e[e.length-1]
;return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}
})(e).capture?"":"?:")+e.map((e=>d(e))).join("|")+")"}function h(e){
return RegExp(e.toString()+"|").exec("").length-1}
const f=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./
;function p(e,{joinWith:n}){let t=0;return e.map((e=>{t+=1;const n=t
;let i=d(e),a="";for(;i.length>0;){const e=f.exec(i);if(!e){a+=i;break}
a+=i.substring(0,e.index),
i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?a+="\\"+(Number(e[1])+n):(a+=e[0],
"("===e[0]&&t++)}return a})).map((e=>`(${e})`)).join(n)}
const m="[a-zA-Z]\\w*",_="[a-zA-Z_]\\w*",E="\\b\\d+(\\.\\d+)?",w="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",y="\\b(0b[01]+)",x={
begin:"\\\\[\\s\\S]",relevance:0},N={scope:"string",begin:"'",end:"'",
illegal:"\\n",contains:[x]},A={scope:"string",begin:'"',end:'"',illegal:"\\n",
contains:[x]},M=(e,n,t={})=>{const i=s({scope:"comment",begin:e,end:n,
contains:[]},t);i.contains.push({scope:"doctag",
begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0})
;const a=b("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/)
;return i.contains.push({begin:u(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i
},v=M("//","$"),O=M("/\\*","\\*/"),S=M("#","$");var C=Object.freeze({
__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:m,UNDERSCORE_IDENT_RE:_,
NUMBER_RE:E,C_NUMBER_RE:w,BINARY_NUMBER_RE:y,
RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
SHEBANG:(e={})=>{const n=/^#![ ]*\//
;return e.binary&&(e.begin=u(n,/.*\b/,e.binary,/\b.*/)),s({scope:"meta",begin:n,
end:/$/,relevance:0,"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},
BACKSLASH_ESCAPE:x,APOS_STRING_MODE:N,QUOTE_STRING_MODE:A,PHRASAL_WORDS_MODE:{
begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
},COMMENT:M,C_LINE_COMMENT_MODE:v,C_BLOCK_COMMENT_MODE:O,HASH_COMMENT_MODE:S,
NUMBER_MODE:{scope:"number",begin:E,relevance:0},C_NUMBER_MODE:{scope:"number",
begin:w,relevance:0},BINARY_NUMBER_MODE:{scope:"number",begin:y,relevance:0},
REGEXP_MODE:{begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,
end:/\/[gimuy]*/,illegal:/\n/,contains:[x,{begin:/\[/,end:/\]/,relevance:0,
contains:[x]}]}]},TITLE_MODE:{scope:"title",begin:m,relevance:0},
UNDERSCORE_TITLE_MODE:{scope:"title",begin:_,relevance:0},METHOD_GUARD:{
begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0},END_SAME_AS_BEGIN:e=>Object.assign(e,{
"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{
n.data._beginMatch!==e[1]&&n.ignoreMatch()}})});function k(e,n){
"."===e.input[e.index-1]&&n.ignoreMatch()}function I(e,n){
void 0!==e.className&&(e.scope=e.className,delete e.className)}function R(e,n){
n&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",
e.__beforeBegin=k,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,
void 0===e.relevance&&(e.relevance=0))}function T(e,n){
Array.isArray(e.illegal)&&(e.illegal=b(...e.illegal))}function L(e,n){
if(e.match){
if(e.begin||e.end)throw Error("begin & end are not supported with match")
;e.begin=e.match,delete e.match}}function D(e,n){
void 0===e.relevance&&(e.relevance=1)}const B=(e,n)=>{if(!e.beforeMatch)return
;if(e.starts)throw Error("beforeMatch cannot be used with starts")
;const t=Object.assign({},e);Object.keys(e).forEach((n=>{delete e[n]
})),e.keywords=t.keywords,
e.begin=u(t.beforeMatch,u("(?=",t.begin,")")),e.starts={relevance:0,
contains:[Object.assign(t,{endsParent:!0})]},e.relevance=0,delete t.beforeMatch
},j=["of","and","for","in","not","or","if","then","parent","list","value"]
;function $(e,n,t="keyword"){const i=Object.create(null)
;return"string"==typeof e?a(t,e.split(" ")):Array.isArray(e)?a(t,e):Object.keys(e).forEach((t=>{
Object.assign(i,$(e[t],n,t))})),i;function a(e,t){
n&&(t=t.map((e=>e.toLowerCase()))),t.forEach((n=>{const t=n.split("|")
;i[t[0]]=[e,P(t[0],t[1])]}))}}function P(e,n){
return n?Number(n):(e=>j.includes(e.toLowerCase()))(e)?0:1}const U={},z=e=>{
console.error(e)},K=(e,...n)=>{console.log("WARN: "+e,...n)},H=(e,n)=>{
U[`${e}/${n}`]||(console.log(`Deprecated as of ${e}. ${n}`),U[`${e}/${n}`]=!0)
},F=Error();function Z(e,n,{key:t}){let i=0;const a=e[t],s={},r={}
;for(let e=1;e<=n.length;e++)r[e+i]=a[e],s[e+i]=!0,i+=h(n[e-1])
;e[t]=r,e[t]._emit=s,e[t]._multi=!0}function V(e){(e=>{
e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,
delete e.scope)})(e),"string"==typeof e.beginScope&&(e.beginScope={
_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope
}),(e=>{if(Array.isArray(e.begin)){
if(e.skip||e.excludeBegin||e.returnBegin)throw z("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),
F
;if("object"!=typeof e.beginScope||null===e.beginScope)throw z("beginScope must be object"),
F;Z(e,e.begin,{key:"beginScope"}),e.begin=p(e.begin,{joinWith:""})}})(e),(e=>{
if(Array.isArray(e.end)){
if(e.skip||e.excludeEnd||e.returnEnd)throw z("skip, excludeEnd, returnEnd not compatible with endScope: {}"),
F
;if("object"!=typeof e.endScope||null===e.endScope)throw z("endScope must be object"),
F;Z(e,e.end,{key:"endScope"}),e.end=p(e.end,{joinWith:""})}})(e)}function G(e){
function n(n,t){return RegExp(d(n),"m"+(e.case_insensitive?"i":"")+(t?"g":""))}
class t{constructor(){
this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}
addRule(e,n){
n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),
this.matchAt+=h(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null)
;const e=this.regexes.map((e=>e[1]));this.matcherRe=n(p(e,{joinWith:"|"
}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex
;const n=this.matcherRe.exec(e);if(!n)return null
;const t=n.findIndex(((e,n)=>n>0&&void 0!==e)),i=this.matchIndexes[t]
;return n.splice(0,t),Object.assign(n,i)}}class i{constructor(){
this.rules=[],this.multiRegexes=[],
this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){
if(this.multiRegexes[e])return this.multiRegexes[e];const n=new t
;return this.rules.slice(e).forEach((([e,t])=>n.addRule(e,t))),
n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){
return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,n){
this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){
const n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex
;let t=n.exec(e)
;if(this.resumingScanAtSamePosition())if(t&&t.index===this.lastIndex);else{
const n=this.getMatcher(0);n.lastIndex=this.lastIndex+1,t=n.exec(e)}
return t&&(this.regexIndex+=t.position+1,
this.regexIndex===this.count&&this.considerAll()),t}}
if(e.compilerExtensions||(e.compilerExtensions=[]),
e.contains&&e.contains.includes("self"))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.")
;return e.classNameAliases=s(e.classNameAliases||{}),function t(a,r){const o=a
;if(a.isCompiled)return o
;[I,L,V,B].forEach((e=>e(a,r))),e.compilerExtensions.forEach((e=>e(a,r))),
a.__beforeBegin=null,[R,T,D].forEach((e=>e(a,r))),a.isCompiled=!0;let l=null
;return"object"==typeof a.keywords&&a.keywords.$pattern&&(a.keywords=Object.assign({},a.keywords),
l=a.keywords.$pattern,
delete a.keywords.$pattern),l=l||/\w+/,a.keywords&&(a.keywords=$(a.keywords,e.case_insensitive)),
o.keywordPatternRe=n(l,!0),
r&&(a.begin||(a.begin=/\B|\b/),o.beginRe=n(a.begin),a.end||a.endsWithParent||(a.end=/\B|\b/),
a.end&&(o.endRe=n(a.end)),
o.terminatorEnd=d(a.end)||"",a.endsWithParent&&r.terminatorEnd&&(o.terminatorEnd+=(a.end?"|":"")+r.terminatorEnd)),
a.illegal&&(o.illegalRe=n(a.illegal)),
a.contains||(a.contains=[]),a.contains=[].concat(...a.contains.map((e=>(e=>(e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((n=>s(e,{
variants:null},n)))),e.cachedVariants?e.cachedVariants:q(e)?s(e,{
starts:e.starts?s(e.starts):null
}):Object.isFrozen(e)?s(e):e))("self"===e?a:e)))),a.contains.forEach((e=>{t(e,o)
})),a.starts&&t(a.starts,r),o.matcher=(e=>{const n=new i
;return e.contains.forEach((e=>n.addRule(e.begin,{rule:e,type:"begin"
}))),e.terminatorEnd&&n.addRule(e.terminatorEnd,{type:"end"
}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n})(o),o}(e)}function q(e){
return!!e&&(e.endsWithParent||q(e.starts))}const W=a,X=s,Q=Symbol("nomatch")
;var J=(e=>{const n=Object.create(null),a=Object.create(null),s=[];let r=!0
;const o="Could not find the language '{}', did you forget to load/include a language module?",l={
disableAutodetect:!0,name:"Plain text",contains:[]};let d={
ignoreUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,
languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",
cssSelector:"pre code",languages:null,__emitter:c};function g(e){
return d.noHighlightRe.test(e)}function u(e,n,t){let i="",a=""
;"object"==typeof n?(i=e,
t=n.ignoreIllegals,a=n.language):(H("10.7.0","highlight(lang, code, ...args) has been deprecated."),
H("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),
a=e,i=n),void 0===t&&(t=!0);const s={code:i,language:a};y("before:highlight",s)
;const r=s.result?s.result:b(s.language,s.code,t)
;return r.code=s.code,y("after:highlight",r),r}function b(e,t,a,s){
const l=Object.create(null);function c(){if(!M.keywords)return void O.addText(S)
;let e=0;M.keywordPatternRe.lastIndex=0;let n=M.keywordPatternRe.exec(S),t=""
;for(;n;){t+=S.substring(e,n.index)
;const a=x.case_insensitive?n[0].toLowerCase():n[0],s=(i=a,M.keywords[i]);if(s){
const[e,i]=s
;if(O.addText(t),t="",l[a]=(l[a]||0)+1,l[a]<=7&&(C+=i),e.startsWith("_"))t+=n[0];else{
const t=x.classNameAliases[e]||e;O.addKeyword(n[0],t)}}else t+=n[0]
;e=M.keywordPatternRe.lastIndex,n=M.keywordPatternRe.exec(S)}var i
;t+=S.substr(e),O.addText(t)}function g(){null!=M.subLanguage?(()=>{
if(""===S)return;let e=null;if("string"==typeof M.subLanguage){
if(!n[M.subLanguage])return void O.addText(S)
;e=b(M.subLanguage,S,!0,v[M.subLanguage]),v[M.subLanguage]=e._top
}else e=h(S,M.subLanguage.length?M.subLanguage:null)
;M.relevance>0&&(C+=e.relevance),O.addSublanguage(e._emitter,e.language)
})():c(),S=""}function u(e,n){let t=1;for(;void 0!==n[t];){if(!e._emit[t]){t++
;continue}const i=x.classNameAliases[e[t]]||e[t],a=n[t]
;i?O.addKeyword(a,i):(S=a,c(),S=""),t++}}function f(e,n){
return e.scope&&"string"==typeof e.scope&&O.openNode(x.classNameAliases[e.scope]||e.scope),
e.beginScope&&(e.beginScope._wrap?(O.addKeyword(S,x.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),
S=""):e.beginScope._multi&&(u(e.beginScope,n),S="")),M=Object.create(e,{parent:{
value:M}}),M}function p(e,n,t){let a=((e,n)=>{const t=e&&e.exec(n)
;return t&&0===t.index})(e.endRe,t);if(a){if(e["on:end"]){const t=new i(e)
;e["on:end"](n,t),t.isMatchIgnored&&(a=!1)}if(a){
for(;e.endsParent&&e.parent;)e=e.parent;return e}}
if(e.endsWithParent)return p(e.parent,n,t)}function m(e){
return 0===M.matcher.regexIndex?(S+=e[0],1):(R=!0,0)}function E(e){
const n=e[0],i=t.substr(e.index),a=p(M,e,i);if(!a)return Q;const s=M
;M.endScope&&M.endScope._wrap?(g(),
O.addKeyword(n,M.endScope._wrap)):M.endScope&&M.endScope._multi?(g(),
u(M.endScope,e)):s.skip?S+=n:(s.returnEnd||s.excludeEnd||(S+=n),
g(),s.excludeEnd&&(S=n));do{
M.scope&&!M.isMultiClass&&O.closeNode(),M.skip||M.subLanguage||(C+=M.relevance),
M=M.parent}while(M!==a.parent)
;return a.starts&&f(a.starts,e),s.returnEnd?0:n.length}let w={};function y(n,s){
const o=s&&s[0];if(S+=n,null==o)return g(),0
;if("begin"===w.type&&"end"===s.type&&w.index===s.index&&""===o){
if(S+=t.slice(s.index,s.index+1),!r){const n=Error(`0 width match regex (${e})`)
;throw n.languageName=e,n.badRule=w.rule,n}return 1}
if(w=s,"begin"===s.type)return(e=>{
const n=e[0],t=e.rule,a=new i(t),s=[t.__beforeBegin,t["on:begin"]]
;for(const t of s)if(t&&(t(e,a),a.isMatchIgnored))return m(n)
;return t.skip?S+=n:(t.excludeBegin&&(S+=n),
g(),t.returnBegin||t.excludeBegin||(S=n)),f(t,e),t.returnBegin?0:n.length})(s)
;if("illegal"===s.type&&!a){
const e=Error('Illegal lexeme "'+o+'" for mode "'+(M.scope||"<unnamed>")+'"')
;throw e.mode=M,e}if("end"===s.type){const e=E(s);if(e!==Q)return e}
if("illegal"===s.type&&""===o)return 1
;if(I>1e5&&I>3*s.index)throw Error("potential infinite loop, way more iterations than matches")
;return S+=o,o.length}const x=_(e)
;if(!x)throw z(o.replace("{}",e)),Error('Unknown language: "'+e+'"')
;const N=G(x);let A="",M=s||N;const v={},O=new d.__emitter(d);(()=>{const e=[]
;for(let n=M;n!==x;n=n.parent)n.scope&&e.unshift(n.scope)
;e.forEach((e=>O.openNode(e)))})();let S="",C=0,k=0,I=0,R=!1;try{
for(M.matcher.considerAll();;){
I++,R?R=!1:M.matcher.considerAll(),M.matcher.lastIndex=k
;const e=M.matcher.exec(t);if(!e)break;const n=y(t.substring(k,e.index),e)
;k=e.index+n}return y(t.substr(k)),O.closeAllNodes(),O.finalize(),A=O.toHTML(),{
language:e,value:A,relevance:C,illegal:!1,_emitter:O,_top:M}}catch(n){
if(n.message&&n.message.includes("Illegal"))return{language:e,value:W(t),
illegal:!0,relevance:0,_illegalBy:{message:n.message,index:k,
context:t.slice(k-100,k+100),mode:n.mode,resultSoFar:A},_emitter:O};if(r)return{
language:e,value:W(t),illegal:!1,relevance:0,errorRaised:n,_emitter:O,_top:M}
;throw n}}function h(e,t){t=t||d.languages||Object.keys(n);const i=(e=>{
const n={value:W(e),illegal:!1,relevance:0,_top:l,_emitter:new d.__emitter(d)}
;return n._emitter.addText(e),n})(e),a=t.filter(_).filter(w).map((n=>b(n,e,!1)))
;a.unshift(i);const s=a.sort(((e,n)=>{
if(e.relevance!==n.relevance)return n.relevance-e.relevance
;if(e.language&&n.language){if(_(e.language).supersetOf===n.language)return 1
;if(_(n.language).supersetOf===e.language)return-1}return 0})),[r,o]=s,c=r
;return c.secondBest=o,c}function f(e){let n=null;const t=(e=>{
let n=e.className+" ";n+=e.parentNode?e.parentNode.className:""
;const t=d.languageDetectRe.exec(n);if(t){const n=_(t[1])
;return n||(K(o.replace("{}",t[1])),
K("Falling back to no-highlight mode for this block.",e)),n?t[1]:"no-highlight"}
return n.split(/\s+/).find((e=>g(e)||_(e)))})(e);if(g(t))return
;y("before:highlightElement",{el:e,language:t
}),!d.ignoreUnescapedHTML&&e.children.length>0&&(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),
console.warn("https://github.com/highlightjs/highlight.js/issues/2886"),
console.warn(e)),n=e;const i=n.textContent,s=t?u(i,{language:t,ignoreIllegals:!0
}):h(i);e.innerHTML=s.value,((e,n,t)=>{const i=n&&a[n]||t
;e.classList.add("hljs"),e.classList.add("language-"+i)
})(e,t,s.language),e.result={language:s.language,re:s.relevance,
relevance:s.relevance},s.secondBest&&(e.secondBest={
language:s.secondBest.language,relevance:s.secondBest.relevance
}),y("after:highlightElement",{el:e,result:s,text:i})}let p=!1;function m(){
"loading"!==document.readyState?document.querySelectorAll(d.cssSelector).forEach(f):p=!0
}function _(e){return e=(e||"").toLowerCase(),n[e]||n[a[e]]}
function E(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach((e=>{
a[e.toLowerCase()]=n}))}function w(e){const n=_(e)
;return n&&!n.disableAutodetect}function y(e,n){const t=e;s.forEach((e=>{
e[t]&&e[t](n)}))}
"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(()=>{
p&&m()}),!1),Object.assign(e,{highlight:u,highlightAuto:h,highlightAll:m,
highlightElement:f,
highlightBlock:e=>(H("10.7.0","highlightBlock will be removed entirely in v12.0"),
H("10.7.0","Please use highlightElement now."),f(e)),configure:e=>{d=X(d,e)},
initHighlighting:()=>{
m(),H("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},
initHighlightingOnLoad:()=>{
m(),H("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")
},registerLanguage:(t,i)=>{let a=null;try{a=i(e)}catch(e){
if(z("Language definition for '{}' could not be registered.".replace("{}",t)),
!r)throw e;z(e),a=l}
a.name||(a.name=t),n[t]=a,a.rawDefinition=i.bind(null,e),a.aliases&&E(a.aliases,{
languageName:t})},unregisterLanguage:e=>{delete n[e]
;for(const n of Object.keys(a))a[n]===e&&delete a[n]},
listLanguages:()=>Object.keys(n),getLanguage:_,registerAliases:E,
autoDetection:w,inherit:X,addPlugin:e=>{(e=>{
e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=n=>{
e["before:highlightBlock"](Object.assign({block:n.el},n))
}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=n=>{
e["after:highlightBlock"](Object.assign({block:n.el},n))})})(e),s.push(e)}
}),e.debugMode=()=>{r=!1},e.safeMode=()=>{r=!0},e.versionString="11.1.0"
;for(const e in C)"object"==typeof C[e]&&t(C[e]);return Object.assign(e,C),e
})({}),Y=Object.freeze({__proto__:null,grmr_julia:e=>{
var n="[A-Za-z_\\u00A1-\\uFFFF][A-Za-z_0-9\\u00A1-\\uFFFF]*",t={$pattern:n,
keyword:["baremodule","begin","break","catch","ccall","const","continue","do","else","elseif","end","export","false","finally","for","function","global","if","import","in","isa","let","local","macro","module","quote","return","true","try","using","where","while"],
literal:["ARGS","C_NULL","DEPOT_PATH","ENDIAN_BOM","ENV","Inf","Inf16","Inf32","Inf64","InsertionSort","LOAD_PATH","MergeSort","NaN","NaN16","NaN32","NaN64","PROGRAM_FILE","QuickSort","RoundDown","RoundFromZero","RoundNearest","RoundNearestTiesAway","RoundNearestTiesUp","RoundToZero","RoundUp","VERSION|0","devnull","false","im","missing","nothing","pi","stderr","stdin","stdout","true","undef","\u03c0","\u212f"],
built_in:["AbstractArray","AbstractChannel","AbstractChar","AbstractDict","AbstractDisplay","AbstractFloat","AbstractIrrational","AbstractMatrix","AbstractRange","AbstractSet","AbstractString","AbstractUnitRange","AbstractVecOrMat","AbstractVector","Any","ArgumentError","Array","AssertionError","BigFloat","BigInt","BitArray","BitMatrix","BitSet","BitVector","Bool","BoundsError","CapturedException","CartesianIndex","CartesianIndices","Cchar","Cdouble","Cfloat","Channel","Char","Cint","Cintmax_t","Clong","Clonglong","Cmd","Colon","Complex","ComplexF16","ComplexF32","ComplexF64","CompositeException","Condition","Cptrdiff_t","Cshort","Csize_t","Cssize_t","Cstring","Cuchar","Cuint","Cuintmax_t","Culong","Culonglong","Cushort","Cvoid","Cwchar_t","Cwstring","DataType","DenseArray","DenseMatrix","DenseVecOrMat","DenseVector","Dict","DimensionMismatch","Dims","DivideError","DomainError","EOFError","Enum","ErrorException","Exception","ExponentialBackOff","Expr","Float16","Float32","Float64","Function","GlobalRef","HTML","IO","IOBuffer","IOContext","IOStream","IdDict","IndexCartesian","IndexLinear","IndexStyle","InexactError","InitError","Int","Int128","Int16","Int32","Int64","Int8","Integer","InterruptException","InvalidStateException","Irrational","KeyError","LinRange","LineNumberNode","LinearIndices","LoadError","MIME","Matrix","Method","MethodError","Missing","MissingException","Module","NTuple","NamedTuple","Nothing","Number","OrdinalRange","OutOfMemoryError","OverflowError","Pair","PartialQuickSort","PermutedDimsArray","Pipe","ProcessFailedException","Ptr","QuoteNode","Rational","RawFD","ReadOnlyMemoryError","Real","ReentrantLock","Ref","Regex","RegexMatch","RoundingMode","SegmentationFault","Set","Signed","Some","StackOverflowError","StepRange","StepRangeLen","StridedArray","StridedMatrix","StridedVecOrMat","StridedVector","String","StringIndexError","SubArray","SubString","SubstitutionString","Symbol","SystemError","Task","TaskFailedException","Text","TextDisplay","Timer","Tuple","Type","TypeError","TypeVar","UInt","UInt128","UInt16","UInt32","UInt64","UInt8","UndefInitializer","UndefKeywordError","UndefRefError","UndefVarError","Union","UnionAll","UnitRange","Unsigned","Val","Vararg","VecElement","VecOrMat","Vector","VersionNumber","WeakKeyDict","WeakRef"]
},i={keywords:t,illegal:/<\//},a={className:"subst",begin:/\$\(/,end:/\)/,
keywords:t},s={className:"variable",begin:"\\$"+n},r={className:"string",
contains:[e.BACKSLASH_ESCAPE,a,s],variants:[{begin:/\w*"""/,end:/"""\w*/,
relevance:10},{begin:/\w*"/,end:/"\w*/}]},o={className:"string",
contains:[e.BACKSLASH_ESCAPE,a,s],begin:"`",end:"`"},l={className:"meta",
begin:"@"+n};return i.name="Julia",i.contains=[{className:"number",
begin:/(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/,
relevance:0},{className:"string",begin:/'(.|\\[xXuU][a-zA-Z0-9]+)'/},r,o,l,{
className:"comment",variants:[{begin:"#=",end:"=#",relevance:10},{begin:"#",
end:"$"}]},e.HASH_COMMENT_MODE,{className:"keyword",
begin:"\\b(((abstract|primitive)\\s+)type|(mutable\\s+)?struct)\\b"},{begin:/<:/
}],a.contains=i.contains,i},grmr_julia_repl:e=>({name:"Julia REPL",contains:[{
className:"meta",begin:/^julia>/,relevance:10,starts:{end:/^(?![ ]{6})/,
subLanguage:"julia"},aliases:["jldoctest"]}]}),grmr_haskell:e=>{const n={
variants:[e.COMMENT("--","$"),e.COMMENT(/\{-/,/-\}/,{contains:["self"]})]},t={
className:"meta",begin:/\{-#/,end:/#-\}/},i={className:"meta",begin:"^#",end:"$"
},a={className:"type",begin:"\\b[A-Z][\\w']*",relevance:0},s={begin:"\\(",
end:"\\)",illegal:'"',contains:[t,i,{className:"type",
begin:"\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"},e.inherit(e.TITLE_MODE,{
begin:"[_a-z][\\w']*"}),n]},r="([0-9a-fA-F]_*)+",o={className:"number",
relevance:0,variants:[{
match:"\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"},{
match:`\\b0[xX]_*(${r})(\\.(${r}))?([pP][+-]?(([0-9]_*)+))?\\b`},{
match:"\\b0[oO](([0-7]_*)+)\\b"},{match:"\\b0[bB](([01]_*)+)\\b"}]};return{
name:"Haskell",aliases:["hs"],
keywords:"let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
contains:[{beginKeywords:"module",end:"where",keywords:"module where",
contains:[s,n],illegal:"\\W\\.|;"},{begin:"\\bimport\\b",end:"$",
keywords:"import qualified as hiding",contains:[s,n],illegal:"\\W\\.|;"},{
className:"class",begin:"^(\\s*)?(class|instance)\\b",end:"where",
keywords:"class family instance where",contains:[a,s,n]},{className:"class",
begin:"\\b(data|(new)?type)\\b",end:"$",
keywords:"data family type newtype deriving",contains:[t,a,s,{begin:/\{/,
end:/\}/,contains:s.contains},n]},{beginKeywords:"default",end:"$",
contains:[a,s,n]},{beginKeywords:"infix infixl infixr",end:"$",
contains:[e.C_NUMBER_MODE,n]},{begin:"\\bforeign\\b",end:"$",
keywords:"foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
contains:[a,e.QUOTE_STRING_MODE,n]},{className:"meta",
begin:"#!\\/usr\\/bin\\/env runhaskell",end:"$"
},t,i,e.QUOTE_STRING_MODE,o,a,e.inherit(e.TITLE_MODE,{begin:"^[_a-z][\\w']*"
}),n,{begin:"->|<-"}]}},grmr_crystal:e=>{
const n="(_?[ui](8|16|32|64|128))?",t="[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?",i="[A-Za-z_]\\w*(::\\w+)*(\\?|!)?",a={
$pattern:"[a-zA-Z_]\\w*[!?=]?",
keyword:"abstract alias annotation as as? asm begin break case class def do else elsif end ensure enum extend for fun if include instance_sizeof is_a? lib macro module next nil? of out pointerof private protected rescue responds_to? return require select self sizeof struct super then type typeof union uninitialized unless until verbatim when while with yield __DIR__ __END_LINE__ __FILE__ __LINE__",
literal:"false nil true"},s={className:"subst",begin:/#\{/,end:/\}/,keywords:a
},r={className:"template-variable",variants:[{begin:"\\{\\{",end:"\\}\\}"},{
begin:"\\{%",end:"%\\}"}],keywords:a};function o(e,n){const t=[{begin:e,end:n}]
;return t[0].contains=t,t}const l={className:"string",
contains:[e.BACKSLASH_ESCAPE,s],variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/
},{begin:/`/,end:/`/},{begin:"%[Qwi]?\\(",end:"\\)",contains:o("\\(","\\)")},{
begin:"%[Qwi]?\\[",end:"\\]",contains:o("\\[","\\]")},{begin:"%[Qwi]?\\{",
end:/\}/,contains:o(/\{/,/\}/)},{begin:"%[Qwi]?<",end:">",contains:o("<",">")},{
begin:"%[Qwi]?\\|",end:"\\|"},{begin:/<<-\w+$/,end:/^\s*\w+$/}],relevance:0},c={
className:"string",variants:[{begin:"%q\\(",end:"\\)",contains:o("\\(","\\)")},{
begin:"%q\\[",end:"\\]",contains:o("\\[","\\]")},{begin:"%q\\{",end:/\}/,
contains:o(/\{/,/\}/)},{begin:"%q<",end:">",contains:o("<",">")},{begin:"%q\\|",
end:"\\|"},{begin:/<<-'\w+'$/,end:/^\s*\w+$/}],relevance:0},d={
begin:"(?!%\\})("+e.RE_STARTERS_RE+"|\\n|\\b(case|if|select|unless|until|when|while)\\b)\\s*",
keywords:"case if select unless until when while",contains:[{className:"regexp",
contains:[e.BACKSLASH_ESCAPE,s],variants:[{begin:"//[a-z]*",relevance:0},{
begin:"/(?!\\/)",end:"/[a-z]*"}]}],relevance:0},g=[r,l,c,{className:"regexp",
contains:[e.BACKSLASH_ESCAPE,s],variants:[{begin:"%r\\(",end:"\\)",
contains:o("\\(","\\)")},{begin:"%r\\[",end:"\\]",contains:o("\\[","\\]")},{
begin:"%r\\{",end:/\}/,contains:o(/\{/,/\}/)},{begin:"%r<",end:">",
contains:o("<",">")},{begin:"%r\\|",end:"\\|"}],relevance:0},d,{
className:"meta",begin:"@\\[",end:"\\]",
contains:[e.inherit(e.QUOTE_STRING_MODE,{className:"string"})]},{
className:"variable",
begin:"(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
},e.HASH_COMMENT_MODE,{className:"class",beginKeywords:"class module struct",
end:"$|;",illegal:/=/,contains:[e.HASH_COMMENT_MODE,e.inherit(e.TITLE_MODE,{
begin:i}),{begin:"<"}]},{className:"class",beginKeywords:"lib enum union",
end:"$|;",illegal:/=/,contains:[e.HASH_COMMENT_MODE,e.inherit(e.TITLE_MODE,{
begin:i})]},{beginKeywords:"annotation",end:"$|;",illegal:/=/,
contains:[e.HASH_COMMENT_MODE,e.inherit(e.TITLE_MODE,{begin:i})],relevance:2},{
className:"function",beginKeywords:"def",end:/\B\b/,
contains:[e.inherit(e.TITLE_MODE,{begin:t,endsParent:!0})]},{
className:"function",beginKeywords:"fun macro",end:/\B\b/,
contains:[e.inherit(e.TITLE_MODE,{begin:t,endsParent:!0})],relevance:2},{
className:"symbol",begin:e.UNDERSCORE_IDENT_RE+"(!|\\?)?:",relevance:0},{
className:"symbol",begin:":",contains:[l,{begin:t}],relevance:0},{
className:"number",variants:[{begin:"\\b0b([01_]+)"+n},{begin:"\\b0o([0-7_]+)"+n
},{begin:"\\b0x([A-Fa-f0-9_]+)"+n},{
begin:"\\b([1-9][0-9_]*[0-9]|[0-9])(\\.[0-9][0-9_]*)?([eE]_?[-+]?[0-9_]*)?(_?f(32|64))?(?!_)"
},{begin:"\\b([1-9][0-9_]*|0)"+n}],relevance:0}]
;return s.contains=g,r.contains=g.slice(1),{name:"Crystal",aliases:["cr"],
keywords:a,contains:g}},grmr_scala:e=>{const n={className:"subst",variants:[{
begin:"\\$[A-Za-z0-9_]+"},{begin:/\$\{/,end:/\}/}]},t={className:"string",
variants:[{begin:'"""',end:'"""'},{begin:'"',end:'"',illegal:"\\n",
contains:[e.BACKSLASH_ESCAPE]},{begin:'[a-z]+"',end:'"',illegal:"\\n",
contains:[e.BACKSLASH_ESCAPE,n]},{className:"string",begin:'[a-z]+"""',
end:'"""',contains:[n],relevance:10}]},i={className:"type",
begin:"\\b[A-Z][A-Za-z0-9_]*",relevance:0},a={className:"title",
begin:/[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
relevance:0},s={className:"class",beginKeywords:"class object trait type",
end:/[:={\[\n;]/,excludeEnd:!0,
contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{
beginKeywords:"extends with",relevance:10},{begin:/\[/,end:/\]/,excludeBegin:!0,
excludeEnd:!0,relevance:0,contains:[i]},{className:"params",begin:/\(/,end:/\)/,
excludeBegin:!0,excludeEnd:!0,relevance:0,contains:[i]},a]},r={
className:"function",beginKeywords:"def",end:/[:={\[(\n;]/,excludeEnd:!0,
contains:[a]};return{name:"Scala",keywords:{literal:"true false null",
keyword:"type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit"
},contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,t,{className:"symbol",
begin:"'\\w[\\w\\d_]*(?!')"},i,r,s,e.C_NUMBER_MODE,{className:"meta",
begin:"@[A-Za-z]+"}]}},grmr_c:e=>{const n=e.COMMENT("//","$",{contains:[{
begin:/\\\n/}]
}),t="[a-zA-Z_]\\w*::",i="(decltype\\(auto\\)|"+g(t)+"[a-zA-Z_]\\w*"+g("<[^<>]+>")+")",a={
className:"type",variants:[{begin:"\\b[a-z\\d_]*_t\\b"},{
match:/\batomic_[a-z]{3,6}\b/}]},s={className:"string",variants:[{
begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{
begin:"(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
end:"'",illegal:"."},e.END_SAME_AS_BEGIN({
begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},r={
className:"number",variants:[{begin:"\\b(0b[01']+)"},{
begin:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
},{
begin:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
}],relevance:0},o={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{
keyword:"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
},contains:[{begin:/\\\n/,relevance:0},e.inherit(s,{className:"string"}),{
className:"string",begin:/<.*?>/},n,e.C_BLOCK_COMMENT_MODE]},l={
className:"title",begin:g(t)+e.IDENT_RE,relevance:0
},c=g(t)+e.IDENT_RE+"\\s*\\(",d={
keyword:["asm","auto","break","case","const","continue","default","do","else","enum","extern","for","fortran","goto","if","inline","register","restrict","return","sizeof","static","struct","switch","typedef","union","volatile","while","_Alignas","_Alignof","_Atomic","_Generic","_Noreturn","_Static_assert","_Thread_local","alignas","alignof","noreturn","static_assert","thread_local","_Pragma"],
type:["float","double","signed","unsigned","int","short","long","char","void","_Bool","_Complex","_Imaginary","_Decimal32","_Decimal64","_Decimal128","complex","bool","imaginary"],
literal:"true false NULL",
built_in:"std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"
},u=[o,a,n,e.C_BLOCK_COMMENT_MODE,r,s],b={variants:[{begin:/=/,end:/;/},{
begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],
keywords:d,contains:u.concat([{begin:/\(/,end:/\)/,keywords:d,
contains:u.concat(["self"]),relevance:0}]),relevance:0},h={
begin:"("+i+"[\\*&\\s]+)+"+c,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,
keywords:d,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:"decltype\\(auto\\)",
keywords:d,relevance:0},{begin:c,returnBegin:!0,contains:[e.inherit(l,{
className:"title.function"})],relevance:0},{relevance:0,match:/,/},{
className:"params",begin:/\(/,end:/\)/,keywords:d,relevance:0,
contains:[n,e.C_BLOCK_COMMENT_MODE,s,r,a,{begin:/\(/,end:/\)/,keywords:d,
relevance:0,contains:["self",n,e.C_BLOCK_COMMENT_MODE,s,r,a]}]
},a,n,e.C_BLOCK_COMMENT_MODE,o]};return{name:"C",aliases:["h"],keywords:d,
disableAutodetect:!0,illegal:"</",contains:[].concat(b,h,u,[o,{
begin:e.IDENT_RE+"::",keywords:d},{className:"class",
beginKeywords:"enum class struct union",end:/[{;:<>=]/,contains:[{
beginKeywords:"final class struct"},e.TITLE_MODE]}]),exports:{preprocessor:o,
strings:s,keywords:d}}},grmr_diff:e=>({name:"Diff",aliases:["patch"],contains:[{
className:"meta",relevance:10,
match:b(/^@@ +-\d+,\d+ +\+\d+,\d+ +@@/,/^\*\*\* +\d+,\d+ +\*\*\*\*$/,/^--- +\d+,\d+ +----$/)
},{className:"comment",variants:[{
begin:b(/Index: /,/^index/,/={3,}/,/^-{3}/,/^\*{3} /,/^\+{3}/,/^diff --git/),
end:/$/},{match:/^\*{15}$/}]},{className:"addition",begin:/^\+/,end:/$/},{
className:"deletion",begin:/^-/,end:/$/},{className:"addition",begin:/^!/,
end:/$/}]}),grmr_plaintext:e=>({name:"Plain text",aliases:["text","txt"],
disableAutodetect:!0})});const ee=J;for(const e of Object.keys(Y)){
const n=e.replace("grmr_","").replace("_","-");ee.registerLanguage(n,Y[e])}
return ee}()
;"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=hljs);