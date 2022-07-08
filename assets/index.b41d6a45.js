const Z=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}};Z();function O(){}function L(t,e){for(const n in e)t[n]=e[n];return t}function V(t){return t()}function U(){return Object.create(null)}function A(t){t.forEach(V)}function ee(t){return typeof t=="function"}function I(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function te(t){return Object.keys(t).length===0}function ne(t,e,n,o){if(t){const r=W(t,e,n,o);return t[0](r)}}function W(t,e,n,o){return t[1]&&o?L(n.ctx.slice(),t[1](o(e))):n.ctx}function re(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const i=[],f=Math.max(e.dirty.length,r.length);for(let l=0;l<f;l+=1)i[l]=e.dirty[l]|r[l];return i}return e.dirty|r}return e.dirty}function oe(t,e,n,o,r,i){if(r){const f=W(e,n,o,i);t.p(f,r)}}function ie(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let o=0;o<n;o++)e[o]=-1;return e}return-1}function D(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function d(t,e){t.appendChild(e)}function _(t,e,n){t.insertBefore(e,n||null)}function m(t){t.parentNode.removeChild(t)}function E(t){return document.createElement(t)}function j(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function M(t){return document.createTextNode(t)}function N(){return M(" ")}function le(){return M("")}function c(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function fe(t){return Array.from(t.childNodes)}function X(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}let R;function w(t){R=t}const $=[],G=[],B=[],J=[],ue=Promise.resolve();let z=!1;function se(){z||(z=!0,ue.then(Y))}function H(t){B.push(t)}const P=new Set;let x=0;function Y(){const t=R;do{for(;x<$.length;){const e=$[x];x++,w(e),ce(e.$$)}for(w(null),$.length=0,x=0;G.length;)G.pop()();for(let e=0;e<B.length;e+=1){const n=B[e];P.has(n)||(P.add(n),n())}B.length=0}while($.length);for(;J.length;)J.pop()();z=!1,P.clear(),w(t)}function ce(t){if(t.fragment!==null){t.update(),A(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}const k=new Set;let ae;function g(t,e){t&&t.i&&(k.delete(t),t.i(e))}function h(t,e,n,o){if(t&&t.o){if(k.has(t))return;k.add(t),ae.c.push(()=>{k.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}else o&&o()}function de(t,e){const n={},o={},r={$$scope:1};let i=t.length;for(;i--;){const f=t[i],l=e[i];if(l){for(const u in f)u in l||(o[u]=1);for(const u in l)r[u]||(n[u]=l[u],r[u]=1);t[i]=l}else for(const u in f)r[u]=1}for(const f in o)f in n||(n[f]=void 0);return n}function me(t){return typeof t=="object"&&t!==null?t:{}}function v(t){t&&t.c()}function p(t,e,n,o){const{fragment:r,on_mount:i,on_destroy:f,after_update:l}=t.$$;r&&r.m(e,n),o||H(()=>{const u=i.map(V).filter(ee);f?f.push(...u):A(u),t.$$.on_mount=[]}),l.forEach(H)}function y(t,e){const n=t.$$;n.fragment!==null&&(A(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function _e(t,e){t.$$.dirty[0]===-1&&($.push(t),se(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function S(t,e,n,o,r,i,f,l=[-1]){const u=R;w(t);const s=t.$$={fragment:null,ctx:null,props:i,update:O,not_equal:r,bound:U(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:U(),dirty:l,skip_bound:!1,root:e.target||u.$$.root};f&&f(s.root);let b=!1;if(s.ctx=n?n(t,e.props||{},(a,q,...F)=>{const K=F.length?F[0]:q;return s.ctx&&r(s.ctx[a],s.ctx[a]=K)&&(!s.skip_bound&&s.bound[a]&&s.bound[a](K),b&&_e(t,a)),q}):[],s.update(),b=!0,A(s.before_update),s.fragment=o?o(s.ctx):!1,e.target){if(e.hydrate){const a=fe(e.target);s.fragment&&s.fragment.l(a),a.forEach(m)}else s.fragment&&s.fragment.c();e.intro&&g(t.$$.fragment),p(t,e.target,e.anchor,e.customElement),Y()}w(u)}class C{$destroy(){y(this,1),this.$destroy=O}$on(e,n){const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(e){this.$$set&&!te(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Q(t){let e,n;return{c(){e=j("title"),n=M(t[0])},m(o,r){_(o,e,r),d(e,n)},p(o,r){r&1&&X(n,o[0])},d(o){o&&m(e)}}}function ge(t){let e,n,o,r=t[0]&&Q(t);const i=t[3].default,f=ne(i,t,t[2],null);return{c(){e=j("svg"),r&&r.c(),n=le(),f&&f.c(),c(e,"xmlns","http://www.w3.org/2000/svg"),c(e,"viewBox",t[1]),c(e,"class","svelte-c8tyih")},m(l,u){_(l,e,u),r&&r.m(e,null),d(e,n),f&&f.m(e,null),o=!0},p(l,[u]){l[0]?r?r.p(l,u):(r=Q(l),r.c(),r.m(e,n)):r&&(r.d(1),r=null),f&&f.p&&(!o||u&4)&&oe(f,i,l,l[2],o?re(i,l[2],u,null):ie(l[2]),null),(!o||u&2)&&c(e,"viewBox",l[1])},i(l){o||(g(f,l),o=!0)},o(l){h(f,l),o=!1},d(l){l&&m(e),r&&r.d(),f&&f.d(l)}}}function he(t,e,n){let{$$slots:o={},$$scope:r}=e,{title:i=null}=e,{viewBox:f}=e;return t.$$set=l=>{"title"in l&&n(0,i=l.title),"viewBox"in l&&n(1,f=l.viewBox),"$$scope"in l&&n(2,r=l.$$scope)},[i,f,r,o]}class pe extends C{constructor(e){super(),S(this,e,he,ge,I,{title:0,viewBox:1})}}function ye(t){let e,n,o;return{c(){e=j("path"),n=N(),o=j("path"),c(e,"d","M256 48c-42.9 0-84.2 13-119.2 37.5-34.2 24-60.2 57.2-75.1 96.1L58 192h45.7l1.9-5c8.2-17.8 19.4-33.9 33.5-48 31.2-31.2 72.7-48.4 116.9-48.4s85.7 17.2 116.9 48.4c31.2 31.2 48.4 72.7 48.4 116.9 0 44.1-17.2 85.7-48.4 116.9-31.2 31.2-72.7 48.4-116.9 48.4-44.1 0-85.6-17.2-116.9-48.4-14-14-25.3-30.1-33.5-47.9l-1.9-5H58l3.6 10.4c14.9 38.9 40.9 72.1 75.1 96.1C171.8 451.1 213 464 256 464c114.7 0 208-93.3 208-208S370.7 48 256 48z"),c(o,"d","M48 277.4h189.7l-43.6 44.7L224 352l96-96-96-96-31 29.9 44.7 44.7H48v42.8z")},m(r,i){_(r,e,i),_(r,n,i),_(r,o,i)},p:O,d(r){r&&m(e),r&&m(n),r&&m(o)}}}function $e(t){let e,n;const o=[{viewBox:"0 0 512 512"},t[0]];let r={$$slots:{default:[ye]},$$scope:{ctx:t}};for(let i=0;i<o.length;i+=1)r=L(r,o[i]);return e=new pe({props:r}),{c(){v(e.$$.fragment)},m(i,f){p(e,i,f),n=!0},p(i,[f]){const l=f&1?de(o,[o[0],me(i[0])]):{};f&2&&(l.$$scope={dirty:f,ctx:i}),e.$set(l)},i(i){n||(g(e.$$.fragment,i),n=!0)},o(i){h(e.$$.fragment,i),n=!1},d(i){y(e,i)}}}function we(t,e,n){return t.$$set=o=>{n(0,e=L(L({},e),D(o)))},e=D(e),[e]}class ve extends C{constructor(e){super(),S(this,e,we,$e,I,{})}}const be={apiBase:"https://sns-manager.herokuapp.com"};function xe(t){let e,n,o,r,i,f;return o=new ve({}),{c(){e=E("a"),n=E("div"),v(o.$$.fragment),r=N(),i=M(t[0]),c(n,"class","w-4 h-4"),c(e,"href",t[1]()),c(e,"class","flex flex-row items-center")},m(l,u){_(l,e,u),d(e,n),p(o,n,null),d(e,r),d(e,i),f=!0},p(l,[u]){(!f||u&1)&&X(i,l[0])},i(l){f||(g(o.$$.fragment,l),f=!0)},o(l){h(o.$$.fragment,l),f=!1},d(l){l&&m(e),y(o)}}}function Be(t,e,n){let{provider:o}=e;const r=()=>`${be.apiBase}/api/${o.toLowerCase()}/auth`;return t.$$set=i=>{"provider"in i&&n(0,o=i.provider)},[o,r]}class T extends C{constructor(e){super(),S(this,e,Be,xe,I,{provider:0})}}function ke(t){let e,n,o,r,i,f,l,u;return o=new T({props:{provider:"Reddit"}}),i=new T({props:{provider:"Twitter"}}),l=new T({props:{provider:"Pixiv"}}),{c(){e=E("main"),n=E("div"),v(o.$$.fragment),r=N(),v(i.$$.fragment),f=N(),v(l.$$.fragment),c(n,"class","flex flex-row gap-4 font-bold"),c(e,"class","h-full flex flex-col items-center")},m(s,b){_(s,e,b),d(e,n),p(o,n,null),d(n,r),p(i,n,null),d(n,f),p(l,n,null),u=!0},p:O,i(s){u||(g(o.$$.fragment,s),g(i.$$.fragment,s),g(l.$$.fragment,s),u=!0)},o(s){h(o.$$.fragment,s),h(i.$$.fragment,s),h(l.$$.fragment,s),u=!1},d(s){s&&m(e),y(o),y(i),y(l)}}}class Le extends C{constructor(e){super(),S(this,e,null,ke,I,{})}}new Le({target:document.getElementById("app")});
