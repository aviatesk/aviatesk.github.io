/*!
  Highlight.js v11.3.1 (git: 70286584d2)
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
}function r(e,...n){const t=Object.create(null);for(const n in e)t[n]=e[n]
;return n.forEach((e=>{for(const n in e)t[n]=e[n]})),t}const s=e=>!!e.kind
;class o{constructor(e,n){
this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){
this.buffer+=a(e)}openNode(e){if(!s(e))return;let n=e.kind
;n=e.sublanguage?"language-"+n:((e,{prefix:n})=>{if(e.includes(".")){
const t=e.split(".")
;return[`${n}${t.shift()}`,...t.map(((e,n)=>`${e}${"_".repeat(n+1)}`))].join(" ")
}return`${n}${e}`})(n,{prefix:this.classPrefix}),this.span(n)}closeNode(e){
s(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){
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
return e?"string"==typeof e?e:e.source:null}function g(e){return h("(?=",e,")")}
function u(e){return h("(?:",e,")*")}function b(e){return h("(?:",e,")?")}
function h(...e){return e.map((e=>d(e))).join("")}function f(...e){const n=(e=>{
const n=e[e.length-1]
;return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}
})(e);return"("+(n.capture?"":"?:")+e.map((e=>d(e))).join("|")+")"}
function p(e){return RegExp(e.toString()+"|").exec("").length-1}
const m=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./
;function _(e,{joinWith:n}){let t=0;return e.map((e=>{t+=1;const n=t
;let i=d(e),a="";for(;i.length>0;){const e=m.exec(i);if(!e){a+=i;break}
a+=i.substring(0,e.index),
i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?a+="\\"+(Number(e[1])+n):(a+=e[0],
"("===e[0]&&t++)}return a})).map((e=>`(${e})`)).join(n)}
const E="[a-zA-Z]\\w*",w="[a-zA-Z_]\\w*",y="\\b\\d+(\\.\\d+)?",x="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",N="\\b(0b[01]+)",M={
begin:"\\\\[\\s\\S]",relevance:0},A={scope:"string",begin:"'",end:"'",
illegal:"\\n",contains:[M]},v={scope:"string",begin:'"',end:'"',illegal:"\\n",
contains:[M]},O=(e,n,t={})=>{const i=r({scope:"comment",begin:e,end:n,
contains:[]},t);i.contains.push({scope:"doctag",
begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0})
;const a=f("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/)
;return i.contains.push({begin:h(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i
},S=O("//","$"),k=O("/\\*","\\*/"),C=O("#","$");var I=Object.freeze({
__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:E,UNDERSCORE_IDENT_RE:w,
NUMBER_RE:y,C_NUMBER_RE:x,BINARY_NUMBER_RE:N,
RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
SHEBANG:(e={})=>{const n=/^#![ ]*\//
;return e.binary&&(e.begin=h(n,/.*\b/,e.binary,/\b.*/)),r({scope:"meta",begin:n,
end:/$/,relevance:0,"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},
BACKSLASH_ESCAPE:M,APOS_STRING_MODE:A,QUOTE_STRING_MODE:v,PHRASAL_WORDS_MODE:{
begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
},COMMENT:O,C_LINE_COMMENT_MODE:S,C_BLOCK_COMMENT_MODE:k,HASH_COMMENT_MODE:C,
NUMBER_MODE:{scope:"number",begin:y,relevance:0},C_NUMBER_MODE:{scope:"number",
begin:x,relevance:0},BINARY_NUMBER_MODE:{scope:"number",begin:N,relevance:0},
REGEXP_MODE:{begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,
end:/\/[gimuy]*/,illegal:/\n/,contains:[M,{begin:/\[/,end:/\]/,relevance:0,
contains:[M]}]}]},TITLE_MODE:{scope:"title",begin:E,relevance:0},
UNDERSCORE_TITLE_MODE:{scope:"title",begin:w,relevance:0},METHOD_GUARD:{
begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0},END_SAME_AS_BEGIN:e=>Object.assign(e,{
"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{
n.data._beginMatch!==e[1]&&n.ignoreMatch()}})});function T(e,n){
"."===e.input[e.index-1]&&n.ignoreMatch()}function R(e,n){
void 0!==e.className&&(e.scope=e.className,delete e.className)}function L(e,n){
n&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",
e.__beforeBegin=T,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,
void 0===e.relevance&&(e.relevance=0))}function D(e,n){
Array.isArray(e.illegal)&&(e.illegal=f(...e.illegal))}function B(e,n){
if(e.match){
if(e.begin||e.end)throw Error("begin & end are not supported with match")
;e.begin=e.match,delete e.match}}function j(e,n){
void 0===e.relevance&&(e.relevance=1)}const $=(e,n)=>{if(!e.beforeMatch)return
;if(e.starts)throw Error("beforeMatch cannot be used with starts")
;const t=Object.assign({},e);Object.keys(e).forEach((n=>{delete e[n]
})),e.keywords=t.keywords,e.begin=h(t.beforeMatch,g(t.begin)),e.starts={
relevance:0,contains:[Object.assign(t,{endsParent:!0})]
},e.relevance=0,delete t.beforeMatch
},P=["of","and","for","in","not","or","if","then","parent","list","value"]
;function U(e,n,t="keyword"){const i=Object.create(null)
;return"string"==typeof e?a(t,e.split(" ")):Array.isArray(e)?a(t,e):Object.keys(e).forEach((t=>{
Object.assign(i,U(e[t],n,t))})),i;function a(e,t){
n&&(t=t.map((e=>e.toLowerCase()))),t.forEach((n=>{const t=n.split("|")
;i[t[0]]=[e,H(t[0],t[1])]}))}}function H(e,n){
return n?Number(n):(e=>P.includes(e.toLowerCase()))(e)?0:1}const z={},K=e=>{
console.error(e)},F=(e,...n)=>{console.log("WARN: "+e,...n)},Z=(e,n)=>{
z[`${e}/${n}`]||(console.log(`Deprecated as of ${e}. ${n}`),z[`${e}/${n}`]=!0)
},V=Error();function G(e,n,{key:t}){let i=0;const a=e[t],r={},s={}
;for(let e=1;e<=n.length;e++)s[e+i]=a[e],r[e+i]=!0,i+=p(n[e-1])
;e[t]=s,e[t]._emit=r,e[t]._multi=!0}function q(e){(e=>{
e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,
delete e.scope)})(e),"string"==typeof e.beginScope&&(e.beginScope={
_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope
}),(e=>{if(Array.isArray(e.begin)){
if(e.skip||e.excludeBegin||e.returnBegin)throw K("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),
V
;if("object"!=typeof e.beginScope||null===e.beginScope)throw K("beginScope must be object"),
V;G(e,e.begin,{key:"beginScope"}),e.begin=_(e.begin,{joinWith:""})}})(e),(e=>{
if(Array.isArray(e.end)){
if(e.skip||e.excludeEnd||e.returnEnd)throw K("skip, excludeEnd, returnEnd not compatible with endScope: {}"),
V
;if("object"!=typeof e.endScope||null===e.endScope)throw K("endScope must be object"),
V;G(e,e.end,{key:"endScope"}),e.end=_(e.end,{joinWith:""})}})(e)}function W(e){
function n(n,t){
return RegExp(d(n),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(t?"g":""))
}class t{constructor(){
this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}
addRule(e,n){
n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),
this.matchAt+=p(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null)
;const e=this.regexes.map((e=>e[1]));this.matcherRe=n(_(e,{joinWith:"|"
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
;return e.classNameAliases=r(e.classNameAliases||{}),function t(a,s){const o=a
;if(a.isCompiled)return o
;[R,B,q,$].forEach((e=>e(a,s))),e.compilerExtensions.forEach((e=>e(a,s))),
a.__beforeBegin=null,[L,D,j].forEach((e=>e(a,s))),a.isCompiled=!0;let l=null
;return"object"==typeof a.keywords&&a.keywords.$pattern&&(a.keywords=Object.assign({},a.keywords),
l=a.keywords.$pattern,
delete a.keywords.$pattern),l=l||/\w+/,a.keywords&&(a.keywords=U(a.keywords,e.case_insensitive)),
o.keywordPatternRe=n(l,!0),
s&&(a.begin||(a.begin=/\B|\b/),o.beginRe=n(o.begin),a.end||a.endsWithParent||(a.end=/\B|\b/),
a.end&&(o.endRe=n(o.end)),
o.terminatorEnd=d(o.end)||"",a.endsWithParent&&s.terminatorEnd&&(o.terminatorEnd+=(a.end?"|":"")+s.terminatorEnd)),
a.illegal&&(o.illegalRe=n(a.illegal)),
a.contains||(a.contains=[]),a.contains=[].concat(...a.contains.map((e=>(e=>(e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((n=>r(e,{
variants:null},n)))),e.cachedVariants?e.cachedVariants:X(e)?r(e,{
starts:e.starts?r(e.starts):null
}):Object.isFrozen(e)?r(e):e))("self"===e?a:e)))),a.contains.forEach((e=>{t(e,o)
})),a.starts&&t(a.starts,s),o.matcher=(e=>{const n=new i
;return e.contains.forEach((e=>n.addRule(e.begin,{rule:e,type:"begin"
}))),e.terminatorEnd&&n.addRule(e.terminatorEnd,{type:"end"
}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n})(o),o}(e)}function X(e){
return!!e&&(e.endsWithParent||X(e.starts))}class Q extends Error{
constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}
const J=a,Y=r,ee=Symbol("nomatch");var ne=(e=>{
const n=Object.create(null),a=Object.create(null),r=[];let s=!0
;const o="Could not find the language '{}', did you forget to load/include a language module?",l={
disableAutodetect:!0,name:"Plain text",contains:[]};let d={
ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,
languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",
cssSelector:"pre code",languages:null,__emitter:c};function p(e){
return d.noHighlightRe.test(e)}function m(e,n,t){let i="",a=""
;"object"==typeof n?(i=e,
t=n.ignoreIllegals,a=n.language):(Z("10.7.0","highlight(lang, code, ...args) has been deprecated."),
Z("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),
a=e,i=n),void 0===t&&(t=!0);const r={code:i,language:a};v("before:highlight",r)
;const s=r.result?r.result:_(r.language,r.code,t)
;return s.code=r.code,v("after:highlight",s),s}function _(e,t,a,r){
const l=Object.create(null);function c(){if(!A.keywords)return void O.addText(S)
;let e=0;A.keywordPatternRe.lastIndex=0;let n=A.keywordPatternRe.exec(S),t=""
;for(;n;){t+=S.substring(e,n.index)
;const a=y.case_insensitive?n[0].toLowerCase():n[0],r=(i=a,A.keywords[i]);if(r){
const[e,i]=r
;if(O.addText(t),t="",l[a]=(l[a]||0)+1,l[a]<=7&&(k+=i),e.startsWith("_"))t+=n[0];else{
const t=y.classNameAliases[e]||e;O.addKeyword(n[0],t)}}else t+=n[0]
;e=A.keywordPatternRe.lastIndex,n=A.keywordPatternRe.exec(S)}var i
;t+=S.substr(e),O.addText(t)}function g(){null!=A.subLanguage?(()=>{
if(""===S)return;let e=null;if("string"==typeof A.subLanguage){
if(!n[A.subLanguage])return void O.addText(S)
;e=_(A.subLanguage,S,!0,v[A.subLanguage]),v[A.subLanguage]=e._top
}else e=E(S,A.subLanguage.length?A.subLanguage:null)
;A.relevance>0&&(k+=e.relevance),O.addSublanguage(e._emitter,e.language)
})():c(),S=""}function u(e,n){let t=1;for(;void 0!==n[t];){if(!e._emit[t]){t++
;continue}const i=y.classNameAliases[e[t]]||e[t],a=n[t]
;i?O.addKeyword(a,i):(S=a,c(),S=""),t++}}function b(e,n){
return e.scope&&"string"==typeof e.scope&&O.openNode(y.classNameAliases[e.scope]||e.scope),
e.beginScope&&(e.beginScope._wrap?(O.addKeyword(S,y.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),
S=""):e.beginScope._multi&&(u(e.beginScope,n),S="")),A=Object.create(e,{parent:{
value:A}}),A}function h(e,n,t){let a=((e,n)=>{const t=e&&e.exec(n)
;return t&&0===t.index})(e.endRe,t);if(a){if(e["on:end"]){const t=new i(e)
;e["on:end"](n,t),t.isMatchIgnored&&(a=!1)}if(a){
for(;e.endsParent&&e.parent;)e=e.parent;return e}}
if(e.endsWithParent)return h(e.parent,n,t)}function f(e){
return 0===A.matcher.regexIndex?(S+=e[0],1):(T=!0,0)}function p(e){
const n=e[0],i=t.substr(e.index),a=h(A,e,i);if(!a)return ee;const r=A
;A.endScope&&A.endScope._wrap?(g(),
O.addKeyword(n,A.endScope._wrap)):A.endScope&&A.endScope._multi?(g(),
u(A.endScope,e)):r.skip?S+=n:(r.returnEnd||r.excludeEnd||(S+=n),
g(),r.excludeEnd&&(S=n));do{
A.scope&&O.closeNode(),A.skip||A.subLanguage||(k+=A.relevance),A=A.parent
}while(A!==a.parent);return a.starts&&b(a.starts,e),r.returnEnd?0:n.length}
let m={};function w(n,r){const o=r&&r[0];if(S+=n,null==o)return g(),0
;if("begin"===m.type&&"end"===r.type&&m.index===r.index&&""===o){
if(S+=t.slice(r.index,r.index+1),!s){const n=Error(`0 width match regex (${e})`)
;throw n.languageName=e,n.badRule=m.rule,n}return 1}
if(m=r,"begin"===r.type)return(e=>{
const n=e[0],t=e.rule,a=new i(t),r=[t.__beforeBegin,t["on:begin"]]
;for(const t of r)if(t&&(t(e,a),a.isMatchIgnored))return f(n)
;return t.skip?S+=n:(t.excludeBegin&&(S+=n),
g(),t.returnBegin||t.excludeBegin||(S=n)),b(t,e),t.returnBegin?0:n.length})(r)
;if("illegal"===r.type&&!a){
const e=Error('Illegal lexeme "'+o+'" for mode "'+(A.scope||"<unnamed>")+'"')
;throw e.mode=A,e}if("end"===r.type){const e=p(r);if(e!==ee)return e}
if("illegal"===r.type&&""===o)return 1
;if(I>1e5&&I>3*r.index)throw Error("potential infinite loop, way more iterations than matches")
;return S+=o,o.length}const y=N(e)
;if(!y)throw K(o.replace("{}",e)),Error('Unknown language: "'+e+'"')
;const x=W(y);let M="",A=r||x;const v={},O=new d.__emitter(d);(()=>{const e=[]
;for(let n=A;n!==y;n=n.parent)n.scope&&e.unshift(n.scope)
;e.forEach((e=>O.openNode(e)))})();let S="",k=0,C=0,I=0,T=!1;try{
for(A.matcher.considerAll();;){
I++,T?T=!1:A.matcher.considerAll(),A.matcher.lastIndex=C
;const e=A.matcher.exec(t);if(!e)break;const n=w(t.substring(C,e.index),e)
;C=e.index+n}return w(t.substr(C)),O.closeAllNodes(),O.finalize(),M=O.toHTML(),{
language:e,value:M,relevance:k,illegal:!1,_emitter:O,_top:A}}catch(n){
if(n.message&&n.message.includes("Illegal"))return{language:e,value:J(t),
illegal:!0,relevance:0,_illegalBy:{message:n.message,index:C,
context:t.slice(C-100,C+100),mode:n.mode,resultSoFar:M},_emitter:O};if(s)return{
language:e,value:J(t),illegal:!1,relevance:0,errorRaised:n,_emitter:O,_top:A}
;throw n}}function E(e,t){t=t||d.languages||Object.keys(n);const i=(e=>{
const n={value:J(e),illegal:!1,relevance:0,_top:l,_emitter:new d.__emitter(d)}
;return n._emitter.addText(e),n})(e),a=t.filter(N).filter(A).map((n=>_(n,e,!1)))
;a.unshift(i);const r=a.sort(((e,n)=>{
if(e.relevance!==n.relevance)return n.relevance-e.relevance
;if(e.language&&n.language){if(N(e.language).supersetOf===n.language)return 1
;if(N(n.language).supersetOf===e.language)return-1}return 0})),[s,o]=r,c=s
;return c.secondBest=o,c}function w(e){let n=null;const t=(e=>{
let n=e.className+" ";n+=e.parentNode?e.parentNode.className:""
;const t=d.languageDetectRe.exec(n);if(t){const n=N(t[1])
;return n||(F(o.replace("{}",t[1])),
F("Falling back to no-highlight mode for this block.",e)),n?t[1]:"no-highlight"}
return n.split(/\s+/).find((e=>p(e)||N(e)))})(e);if(p(t))return
;if(v("before:highlightElement",{el:e,language:t
}),e.children.length>0&&(d.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),
console.warn("https://github.com/highlightjs/highlight.js/issues/2886"),
console.warn(e)),
d.throwUnescapedHTML))throw new Q("One of your code blocks includes unescaped HTML.",e.innerHTML)
;n=e;const i=n.textContent,r=t?m(i,{language:t,ignoreIllegals:!0}):E(i)
;e.innerHTML=r.value,((e,n,t)=>{const i=n&&a[n]||t
;e.classList.add("hljs"),e.classList.add("language-"+i)
})(e,t,r.language),e.result={language:r.language,re:r.relevance,
relevance:r.relevance},r.secondBest&&(e.secondBest={
language:r.secondBest.language,relevance:r.secondBest.relevance
}),v("after:highlightElement",{el:e,result:r,text:i})}let y=!1;function x(){
"loading"!==document.readyState?document.querySelectorAll(d.cssSelector).forEach(w):y=!0
}function N(e){return e=(e||"").toLowerCase(),n[e]||n[a[e]]}
function M(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach((e=>{
a[e.toLowerCase()]=n}))}function A(e){const n=N(e)
;return n&&!n.disableAutodetect}function v(e,n){const t=e;r.forEach((e=>{
e[t]&&e[t](n)}))}
"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(()=>{
y&&x()}),!1),Object.assign(e,{highlight:m,highlightAuto:E,highlightAll:x,
highlightElement:w,
highlightBlock:e=>(Z("10.7.0","highlightBlock will be removed entirely in v12.0"),
Z("10.7.0","Please use highlightElement now."),w(e)),configure:e=>{d=Y(d,e)},
initHighlighting:()=>{
x(),Z("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},
initHighlightingOnLoad:()=>{
x(),Z("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")
},registerLanguage:(t,i)=>{let a=null;try{a=i(e)}catch(e){
if(K("Language definition for '{}' could not be registered.".replace("{}",t)),
!s)throw e;K(e),a=l}
a.name||(a.name=t),n[t]=a,a.rawDefinition=i.bind(null,e),a.aliases&&M(a.aliases,{
languageName:t})},unregisterLanguage:e=>{delete n[e]
;for(const n of Object.keys(a))a[n]===e&&delete a[n]},
listLanguages:()=>Object.keys(n),getLanguage:N,registerAliases:M,
autoDetection:A,inherit:Y,addPlugin:e=>{(e=>{
e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=n=>{
e["before:highlightBlock"](Object.assign({block:n.el},n))
}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=n=>{
e["after:highlightBlock"](Object.assign({block:n.el},n))})})(e),r.push(e)}
}),e.debugMode=()=>{s=!1},e.safeMode=()=>{s=!0
},e.versionString="11.3.1",e.regex={concat:h,lookahead:g,either:f,optional:b,
anyNumberOfTimes:u};for(const e in I)"object"==typeof I[e]&&t(I[e])
;return Object.assign(e,I),e})({}),te=Object.freeze({__proto__:null,
grmr_julia:e=>{var n="[A-Za-z_\\u00A1-\\uFFFF][A-Za-z_0-9\\u00A1-\\uFFFF]*",t={
$pattern:n,
keyword:["baremodule","begin","break","catch","ccall","const","continue","do","else","elseif","end","export","false","finally","for","function","global","if","import","in","isa","let","local","macro","module","quote","return","true","try","using","where","while"],
literal:["ARGS","C_NULL","DEPOT_PATH","ENDIAN_BOM","ENV","Inf","Inf16","Inf32","Inf64","InsertionSort","LOAD_PATH","MergeSort","NaN","NaN16","NaN32","NaN64","PROGRAM_FILE","QuickSort","RoundDown","RoundFromZero","RoundNearest","RoundNearestTiesAway","RoundNearestTiesUp","RoundToZero","RoundUp","VERSION|0","devnull","false","im","missing","nothing","pi","stderr","stdin","stdout","true","undef","\u03c0","\u212f"],
built_in:["AbstractArray","AbstractChannel","AbstractChar","AbstractDict","AbstractDisplay","AbstractFloat","AbstractIrrational","AbstractMatrix","AbstractRange","AbstractSet","AbstractString","AbstractUnitRange","AbstractVecOrMat","AbstractVector","Any","ArgumentError","Array","AssertionError","BigFloat","BigInt","BitArray","BitMatrix","BitSet","BitVector","Bool","BoundsError","CapturedException","CartesianIndex","CartesianIndices","Cchar","Cdouble","Cfloat","Channel","Char","Cint","Cintmax_t","Clong","Clonglong","Cmd","Colon","Complex","ComplexF16","ComplexF32","ComplexF64","CompositeException","Condition","Cptrdiff_t","Cshort","Csize_t","Cssize_t","Cstring","Cuchar","Cuint","Cuintmax_t","Culong","Culonglong","Cushort","Cvoid","Cwchar_t","Cwstring","DataType","DenseArray","DenseMatrix","DenseVecOrMat","DenseVector","Dict","DimensionMismatch","Dims","DivideError","DomainError","EOFError","Enum","ErrorException","Exception","ExponentialBackOff","Expr","Float16","Float32","Float64","Function","GlobalRef","HTML","IO","IOBuffer","IOContext","IOStream","IdDict","IndexCartesian","IndexLinear","IndexStyle","InexactError","InitError","Int","Int128","Int16","Int32","Int64","Int8","Integer","InterruptException","InvalidStateException","Irrational","KeyError","LinRange","LineNumberNode","LinearIndices","LoadError","MIME","Matrix","Method","MethodError","Missing","MissingException","Module","NTuple","NamedTuple","Nothing","Number","OrdinalRange","OutOfMemoryError","OverflowError","Pair","PartialQuickSort","PermutedDimsArray","Pipe","ProcessFailedException","Ptr","QuoteNode","Rational","RawFD","ReadOnlyMemoryError","Real","ReentrantLock","Ref","Regex","RegexMatch","RoundingMode","SegmentationFault","Set","Signed","Some","StackOverflowError","StepRange","StepRangeLen","StridedArray","StridedMatrix","StridedVecOrMat","StridedVector","String","StringIndexError","SubArray","SubString","SubstitutionString","Symbol","SystemError","Task","TaskFailedException","Text","TextDisplay","Timer","Tuple","Type","TypeError","TypeVar","UInt","UInt128","UInt16","UInt32","UInt64","UInt8","UndefInitializer","UndefKeywordError","UndefRefError","UndefVarError","Union","UnionAll","UnitRange","Unsigned","Val","Vararg","VecElement","VecOrMat","Vector","VersionNumber","WeakKeyDict","WeakRef"]
},i={keywords:t,illegal:/<\//},a={className:"subst",begin:/\$\(/,end:/\)/,
keywords:t},r={className:"variable",begin:"\\$"+n},s={className:"string",
contains:[e.BACKSLASH_ESCAPE,a,r],variants:[{begin:/\w*"""/,end:/"""\w*/,
relevance:10},{begin:/\w*"/,end:/"\w*/}]},o={className:"string",
contains:[e.BACKSLASH_ESCAPE,a,r],begin:"`",end:"`"},l={className:"meta",
begin:"@"+n};return i.name="Julia",i.contains=[{className:"number",
begin:/(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/,
relevance:0},{className:"string",begin:/'(.|\\[xXuU][a-zA-Z0-9]+)'/},s,o,l,{
className:"comment",variants:[{begin:"#=",end:"=#",relevance:10},{begin:"#",
end:"$"}]},e.HASH_COMMENT_MODE,{className:"keyword",
begin:"\\b(((abstract|primitive)\\s+)type|(mutable\\s+)?struct)\\b"},{begin:/<:/
}],a.contains=i.contains,i},grmr_julia_repl:e=>({name:"Julia REPL",contains:[{
className:"meta",begin:/^julia>/,relevance:10,starts:{end:/^(?![ ]{6})/,
subLanguage:"julia"},aliases:["jldoctest"]}]}),grmr_haskell:e=>{const n={
variants:[e.COMMENT("--","$"),e.COMMENT(/\{-/,/-\}/,{contains:["self"]})]},t={
className:"meta",begin:/\{-#/,end:/#-\}/},i={className:"meta",begin:"^#",end:"$"
},a={className:"type",begin:"\\b[A-Z][\\w']*",relevance:0},r={begin:"\\(",
end:"\\)",illegal:'"',contains:[t,i,{className:"type",
begin:"\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"},e.inherit(e.TITLE_MODE,{
begin:"[_a-z][\\w']*"}),n]},s="([0-9a-fA-F]_*)+",o={className:"number",
relevance:0,variants:[{
match:"\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"},{
match:`\\b0[xX]_*(${s})(\\.(${s}))?([pP][+-]?(([0-9]_*)+))?\\b`},{
match:"\\b0[oO](([0-7]_*)+)\\b"},{match:"\\b0[bB](([01]_*)+)\\b"}]};return{
name:"Haskell",aliases:["hs"],
keywords:"let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
contains:[{beginKeywords:"module",end:"where",keywords:"module where",
contains:[r,n],illegal:"\\W\\.|;"},{begin:"\\bimport\\b",end:"$",
keywords:"import qualified as hiding",contains:[r,n],illegal:"\\W\\.|;"},{
className:"class",begin:"^(\\s*)?(class|instance)\\b",end:"where",
keywords:"class family instance where",contains:[a,r,n]},{className:"class",
begin:"\\b(data|(new)?type)\\b",end:"$",
keywords:"data family type newtype deriving",contains:[t,a,r,{begin:/\{/,
end:/\}/,contains:r.contains},n]},{beginKeywords:"default",end:"$",
contains:[a,r,n]},{beginKeywords:"infix infixl infixr",end:"$",
contains:[e.C_NUMBER_MODE,n]},{begin:"\\bforeign\\b",end:"$",
keywords:"foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
contains:[a,e.QUOTE_STRING_MODE,n]},{className:"meta",
begin:"#!\\/usr\\/bin\\/env runhaskell",end:"$"
},t,i,e.QUOTE_STRING_MODE,o,a,e.inherit(e.TITLE_MODE,{begin:"^[_a-z][\\w']*"
}),n,{begin:"->|<-"}]}},grmr_crystal:e=>{
const n="(_?[ui](8|16|32|64|128))?",t="[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?",i="[A-Za-z_]\\w*(::\\w+)*(\\?|!)?",a={
$pattern:"[a-zA-Z_]\\w*[!?=]?",
keyword:"abstract alias annotation as as? asm begin break case class def do else elsif end ensure enum extend for fun if include instance_sizeof is_a? lib macro module next nil? of out pointerof private protected rescue responds_to? return require select self sizeof struct super then type typeof union uninitialized unless until verbatim when while with yield __DIR__ __END_LINE__ __FILE__ __LINE__",
literal:"false nil true"},r={className:"subst",begin:/#\{/,end:/\}/,keywords:a
},s={className:"template-variable",variants:[{begin:"\\{\\{",end:"\\}\\}"},{
begin:"\\{%",end:"%\\}"}],keywords:a};function o(e,n){const t=[{begin:e,end:n}]
;return t[0].contains=t,t}const l={className:"string",
contains:[e.BACKSLASH_ESCAPE,r],variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/
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
contains:[e.BACKSLASH_ESCAPE,r],variants:[{begin:"//[a-z]*",relevance:0},{
begin:"/(?!\\/)",end:"/[a-z]*"}]}],relevance:0},g=[s,l,c,{className:"regexp",
contains:[e.BACKSLASH_ESCAPE,r],variants:[{begin:"%r\\(",end:"\\)",
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
;return r.contains=g,s.contains=g.slice(1),{name:"Crystal",aliases:["cr"],
keywords:a,contains:g}},grmr_scala:e=>{const n=e.regex,t={className:"subst",
variants:[{begin:"\\$[A-Za-z0-9_]+"},{begin:/\$\{/,end:/\}/}]},i={
className:"string",variants:[{begin:'"""',end:'"""'},{begin:'"',end:'"',
illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{begin:'[a-z]+"',end:'"',
illegal:"\\n",contains:[e.BACKSLASH_ESCAPE,t]},{className:"string",
begin:'[a-z]+"""',end:'"""',contains:[t],relevance:10}]},a={className:"type",
begin:"\\b[A-Z][A-Za-z0-9_]*",relevance:0},r={className:"title",
begin:/[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
relevance:0},s={className:"class",beginKeywords:"class object trait type",
end:/[:={\[\n;]/,excludeEnd:!0,
contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{
beginKeywords:"extends with",relevance:10},{begin:/\[/,end:/\]/,excludeBegin:!0,
excludeEnd:!0,relevance:0,contains:[a]},{className:"params",begin:/\(/,end:/\)/,
excludeBegin:!0,excludeEnd:!0,relevance:0,contains:[a]},r]},o={
className:"function",beginKeywords:"def",end:n.lookahead(/[:={\[(\n;]/),
contains:[r]};return{name:"Scala",keywords:{literal:"true false null",
keyword:"type yield lazy override def with val var sealed abstract private trait object if then forSome for while do throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit export enum given"
},
contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,i,a,o,s,e.C_NUMBER_MODE,{
begin:[/^\s*/,"extension",/\s+(?=[[(])/],beginScope:{2:"keyword"}},[{
begin:[/^\s*/,/end/,/\s+/,/(extension\b)?/],beginScope:{2:"keyword",4:"keyword"}
}],{match:/\.inline\b/},{begin:/\binline(?=\s)/,keywords:"inline"},{
begin:[/\(\s*/,/using/,/\s+(?!\))/],beginScope:{2:"keyword"}},{className:"meta",
begin:"@[A-Za-z]+"}]}},grmr_c:e=>{const n=e.regex,t=e.COMMENT("//","$",{
contains:[{begin:/\\\n/}]
}),i="[a-zA-Z_]\\w*::",a="(decltype\\(auto\\)|"+n.optional(i)+"[a-zA-Z_]\\w*"+n.optional("<[^<>]+>")+")",r={
className:"type",variants:[{begin:"\\b[a-z\\d_]*_t\\b"},{
match:/\batomic_[a-z]{3,6}\b/}]},s={className:"string",variants:[{
begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{
begin:"(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
end:"'",illegal:"."},e.END_SAME_AS_BEGIN({
begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},o={
className:"number",variants:[{begin:"\\b(0b[01']+)"},{
begin:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
},{
begin:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
}],relevance:0},l={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{
keyword:"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
},contains:[{begin:/\\\n/,relevance:0},e.inherit(s,{className:"string"}),{
className:"string",begin:/<.*?>/},t,e.C_BLOCK_COMMENT_MODE]},c={
className:"title",begin:n.optional(i)+e.IDENT_RE,relevance:0
},d=n.optional(i)+e.IDENT_RE+"\\s*\\(",g={
keyword:["asm","auto","break","case","continue","default","do","else","enum","extern","for","fortran","goto","if","inline","register","restrict","return","sizeof","struct","switch","typedef","union","volatile","while","_Alignas","_Alignof","_Atomic","_Generic","_Noreturn","_Static_assert","_Thread_local","alignas","alignof","noreturn","static_assert","thread_local","_Pragma"],
type:["float","double","signed","unsigned","int","short","long","char","void","_Bool","_Complex","_Imaginary","_Decimal32","_Decimal64","_Decimal128","const","static","complex","bool","imaginary"],
literal:"true false NULL",
built_in:"std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"
},u=[l,r,t,e.C_BLOCK_COMMENT_MODE,o,s],b={variants:[{begin:/=/,end:/;/},{
begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],
keywords:g,contains:u.concat([{begin:/\(/,end:/\)/,keywords:g,
contains:u.concat(["self"]),relevance:0}]),relevance:0},h={
begin:"("+a+"[\\*&\\s]+)+"+d,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,
keywords:g,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:"decltype\\(auto\\)",
keywords:g,relevance:0},{begin:d,returnBegin:!0,contains:[e.inherit(c,{
className:"title.function"})],relevance:0},{relevance:0,match:/,/},{
className:"params",begin:/\(/,end:/\)/,keywords:g,relevance:0,
contains:[t,e.C_BLOCK_COMMENT_MODE,s,o,r,{begin:/\(/,end:/\)/,keywords:g,
relevance:0,contains:["self",t,e.C_BLOCK_COMMENT_MODE,s,o,r]}]
},r,t,e.C_BLOCK_COMMENT_MODE,l]};return{name:"C",aliases:["h"],keywords:g,
disableAutodetect:!0,illegal:"</",contains:[].concat(b,h,u,[l,{
begin:e.IDENT_RE+"::",keywords:g},{className:"class",
beginKeywords:"enum class struct union",end:/[{;:<>=]/,contains:[{
beginKeywords:"final class struct"},e.TITLE_MODE]}]),exports:{preprocessor:l,
strings:s,keywords:g}}},grmr_diff:e=>{const n=e.regex;return{name:"Diff",
aliases:["patch"],contains:[{className:"meta",relevance:10,
match:n.either(/^@@ +-\d+,\d+ +\+\d+,\d+ +@@/,/^\*\*\* +\d+,\d+ +\*\*\*\*$/,/^--- +\d+,\d+ +----$/)
},{className:"comment",variants:[{
begin:n.either(/Index: /,/^index/,/={3,}/,/^-{3}/,/^\*{3} /,/^\+{3}/,/^diff --git/),
end:/$/},{match:/^\*{15}$/}]},{className:"addition",begin:/^\+/,end:/$/},{
className:"deletion",begin:/^-/,end:/$/},{className:"addition",begin:/^!/,
end:/$/}]}},grmr_plaintext:e=>({name:"Plain text",aliases:["text","txt"],
disableAutodetect:!0})});const ie=ne;for(const e of Object.keys(te)){
const n=e.replace("grmr_","").replace("_","-");ie.registerLanguage(n,te[e])}
return ie}()
;"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=hljs);