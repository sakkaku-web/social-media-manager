var lt=Object.defineProperty;var ut=(t,e,n)=>e in t?lt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Q=(t,e,n)=>(ut(t,typeof e!="symbol"?e+"":e,n),n);const ct=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}};ct();function U(){}function ce(t,e){for(const n in e)t[n]=e[n];return t}function Ge(t){return t()}function Ie(){return Object.create(null)}function V(t){t.forEach(Ge)}function ft(t){return typeof t=="function"}function G(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let oe;function Oe(t,e){return oe||(oe=document.createElement("a")),oe.href=e,t===oe.href}function dt(t){return Object.keys(t).length===0}function Be(t,e,n,r){if(t){const i=Je(t,e,n,r);return t[0](i)}}function Je(t,e,n,r){return t[1]&&r?ce(n.ctx.slice(),t[1](r(e))):n.ctx}function Me(t,e,n,r){if(t[2]&&r){const i=t[2](r(n));if(e.dirty===void 0)return i;if(typeof i=="object"){const s=[],a=Math.max(e.dirty.length,i.length);for(let o=0;o<a;o+=1)s[o]=e.dirty[o]|i[o];return s}return e.dirty|i}return e.dirty}function ze(t,e,n,r,i,s){if(i){const a=Je(e,n,r,s);t.p(a,i)}}function Ve(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function Ae(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function p(t,e){t.appendChild(e)}function T(t,e,n){t.insertBefore(e,n||null)}function y(t){t.parentNode.removeChild(t)}function ht(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function _(t){return document.createElement(t)}function fe(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function W(t){return document.createTextNode(t)}function A(){return W(" ")}function se(){return W("")}function F(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function mt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function pt(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function f(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function gt(t){return Array.from(t.childNodes)}function $e(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Y(t,e){t.value=e==null?"":e}function wt(t,e,n,r){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,r?"important":"")}function _t(t,e,{bubbles:n=!1,cancelable:r=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n,r,e),i}let re;function ne(t){re=t}function Ke(){if(!re)throw new Error("Function called outside component initialization");return re}function de(t){Ke().$$.on_mount.push(t)}function Z(){const t=Ke();return(e,n,{cancelable:r=!1}={})=>{const i=t.$$.callbacks[e];if(i){const s=_t(e,n,{cancelable:r});return i.slice().forEach(a=>{a.call(t,s)}),!s.defaultPrevented}return!0}}function He(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(r=>r.call(this,e))}const ee=[],ie=[],le=[],be=[],bt=Promise.resolve();let ye=!1;function yt(){ye||(ye=!0,bt.then(We))}function ke(t){le.push(t)}function Ee(t){be.push(t)}const ge=new Set;let ae=0;function We(){const t=re;do{for(;ae<ee.length;){const e=ee[ae];ae++,ne(e),kt(e.$$)}for(ne(null),ee.length=0,ae=0;ie.length;)ie.pop()();for(let e=0;e<le.length;e+=1){const n=le[e];ge.has(n)||(ge.add(n),n())}le.length=0}while(ee.length);for(;be.length;)be.pop()();ye=!1,ge.clear(),ne(t)}function kt(t){if(t.fragment!==null){t.update(),V(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(ke)}}const ue=new Set;let K;function Xe(){K={r:0,c:[],p:K}}function Qe(){K.r||V(K.c),K=K.p}function P(t,e){t&&t.i&&(ue.delete(t),t.i(e))}function S(t,e,n,r){if(t&&t.o){if(ue.has(t))return;ue.add(t),K.c.push(()=>{ue.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}function vt(t,e){S(t,1,1,()=>{e.delete(t.key)})}function Tt(t,e,n,r,i,s,a,o,l,u,c,d){let g=t.length,b=s.length,m=g;const w={};for(;m--;)w[t[m].key]=m;const h=[],R=new Map,C=new Map;for(m=b;m--;){const k=d(i,s,m),O=n(k);let E=a.get(O);E?r&&E.p(k,e):(E=u(O,k),E.c()),R.set(O,h[m]=E),O in w&&C.set(O,Math.abs(m-w[O]))}const L=new Set,M=new Set;function I(k){P(k,1),k.m(o,c),a.set(k.key,k),c=k.first,b--}for(;g&&b;){const k=h[b-1],O=t[g-1],E=k.key,$=O.key;k===O?(c=k.first,g--,b--):R.has($)?!a.has(E)||L.has(E)?I(k):M.has($)?g--:C.get(E)>C.get($)?(M.add(E),I(k)):(L.add($),g--):(l(O,a),g--)}for(;g--;){const k=t[g];R.has(k.key)||l(k,a)}for(;b;)I(h[b-1]);return h}function $t(t,e){const n={},r={},i={$$scope:1};let s=t.length;for(;s--;){const a=t[s],o=e[s];if(o){for(const l in a)l in o||(r[l]=1);for(const l in o)i[l]||(n[l]=o[l],i[l]=1);t[s]=o}else for(const l in a)i[l]=1}for(const a in r)a in n||(n[a]=void 0);return n}function Rt(t){return typeof t=="object"&&t!==null?t:{}}function xe(t,e,n){const r=t.$$.props[e];r!==void 0&&(t.$$.bound[r]=n,n(t.$$.ctx[r]))}function q(t){t&&t.c()}function x(t,e,n,r){const{fragment:i,on_mount:s,on_destroy:a,after_update:o}=t.$$;i&&i.m(e,n),r||ke(()=>{const l=s.map(Ge).filter(ft);a?a.push(...l):V(l),t.$$.on_mount=[]}),o.forEach(ke)}function N(t,e){const n=t.$$;n.fragment!==null&&(V(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Pt(t,e){t.$$.dirty[0]===-1&&(ee.push(t),yt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function B(t,e,n,r,i,s,a,o=[-1]){const l=re;ne(t);const u=t.$$={fragment:null,ctx:null,props:s,update:U,not_equal:i,bound:Ie(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:Ie(),dirty:o,skip_bound:!1,root:e.target||l.$$.root};a&&a(u.root);let c=!1;if(u.ctx=n?n(t,e.props||{},(d,g,...b)=>{const m=b.length?b[0]:g;return u.ctx&&i(u.ctx[d],u.ctx[d]=m)&&(!u.skip_bound&&u.bound[d]&&u.bound[d](m),c&&Pt(t,d)),g}):[],u.update(),c=!0,V(u.before_update),u.fragment=r?r(u.ctx):!1,e.target){if(e.hydrate){const d=gt(e.target);u.fragment&&u.fragment.l(d),d.forEach(y)}else u.fragment&&u.fragment.c();e.intro&&P(t.$$.fragment),x(t,e.target,e.anchor,e.customElement),We()}ne(l)}class J{$destroy(){N(this,1),this.$destroy=U}$on(e,n){const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const i=r.indexOf(n);i!==-1&&r.splice(i,1)}}$set(e){this.$$set&&!dt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Ne(t){let e,n;return{c(){e=fe("title"),n=W(t[0])},m(r,i){T(r,e,i),p(e,n)},p(r,i){i&1&&$e(n,r[0])},d(r){r&&y(e)}}}function St(t){let e,n,r,i=t[0]&&Ne(t);const s=t[3].default,a=Be(s,t,t[2],null);return{c(){e=fe("svg"),i&&i.c(),n=se(),a&&a.c(),f(e,"xmlns","http://www.w3.org/2000/svg"),f(e,"viewBox",t[1]),f(e,"class","svelte-c8tyih")},m(o,l){T(o,e,l),i&&i.m(e,null),p(e,n),a&&a.m(e,null),r=!0},p(o,[l]){o[0]?i?i.p(o,l):(i=Ne(o),i.c(),i.m(e,n)):i&&(i.d(1),i=null),a&&a.p&&(!r||l&4)&&ze(a,s,o,o[2],r?Me(s,o[2],l,null):Ve(o[2]),null),(!r||l&2)&&f(e,"viewBox",o[1])},i(o){r||(P(a,o),r=!0)},o(o){S(a,o),r=!1},d(o){o&&y(e),i&&i.d(),a&&a.d(o)}}}function It(t,e,n){let{$$slots:r={},$$scope:i}=e,{title:s=null}=e,{viewBox:a}=e;return t.$$set=o=>{"title"in o&&n(0,s=o.title),"viewBox"in o&&n(1,a=o.viewBox),"$$scope"in o&&n(2,i=o.$$scope)},[s,a,i,r]}class Ot extends J{constructor(e){super(),B(this,e,It,St,G,{title:0,viewBox:1})}}function At(t){let e,n,r;return{c(){e=fe("path"),n=A(),r=fe("path"),f(e,"d","M256 48c-42.9 0-84.2 13-119.2 37.5-34.2 24-60.2 57.2-75.1 96.1L58 192h45.7l1.9-5c8.2-17.8 19.4-33.9 33.5-48 31.2-31.2 72.7-48.4 116.9-48.4s85.7 17.2 116.9 48.4c31.2 31.2 48.4 72.7 48.4 116.9 0 44.1-17.2 85.7-48.4 116.9-31.2 31.2-72.7 48.4-116.9 48.4-44.1 0-85.6-17.2-116.9-48.4-14-14-25.3-30.1-33.5-47.9l-1.9-5H58l3.6 10.4c14.9 38.9 40.9 72.1 75.1 96.1C171.8 451.1 213 464 256 464c114.7 0 208-93.3 208-208S370.7 48 256 48z"),f(r,"d","M48 277.4h189.7l-43.6 44.7L224 352l96-96-96-96-31 29.9 44.7 44.7H48v42.8z")},m(i,s){T(i,e,s),T(i,n,s),T(i,r,s)},p:U,d(i){i&&y(e),i&&y(n),i&&y(r)}}}function Et(t){let e,n;const r=[{viewBox:"0 0 512 512"},t[0]];let i={$$slots:{default:[At]},$$scope:{ctx:t}};for(let s=0;s<r.length;s+=1)i=ce(i,r[s]);return e=new Ot({props:i}),{c(){q(e.$$.fragment)},m(s,a){x(e,s,a),n=!0},p(s,[a]){const o=a&1?$t(r,[r[0],Rt(s[0])]):{};a&2&&(o.$$scope={dirty:a,ctx:s}),e.$set(o)},i(s){n||(P(e.$$.fragment,s),n=!0)},o(s){S(e.$$.fragment,s),n=!1},d(s){N(e,s)}}}function xt(t,e,n){return t.$$set=r=>{n(0,e=ce(ce({},e),Ae(r)))},e=Ae(e),[e]}class Ye extends J{constructor(e){super(),B(this,e,xt,Et,G,{})}}const Re={apiBase:"http://localhost:8080"},Nt="http://localhost".replace(/\/+$/,"");class Pe{constructor(e={}){this.configuration=e}set config(e){this.configuration=e}get basePath(){return this.configuration.basePath!=null?this.configuration.basePath:Nt}get fetchApi(){return this.configuration.fetchApi}get middleware(){return this.configuration.middleware||[]}get queryParamsStringify(){return this.configuration.queryParamsStringify||je}get username(){return this.configuration.username}get password(){return this.configuration.password}get apiKey(){const e=this.configuration.apiKey;if(e)return typeof e=="function"?e:()=>e}get accessToken(){const e=this.configuration.accessToken;if(e)return typeof e=="function"?e:async()=>e}get headers(){return this.configuration.headers}get credentials(){return this.configuration.credentials}}const Ct=new Pe;class Ze{constructor(e=Ct){Q(this,"middleware");Q(this,"fetchApi",async(e,n)=>{let r={url:e,init:n};for(const s of this.middleware)s.pre&&(r=await s.pre({fetch:this.fetchApi,...r})||r);let i;try{i=await(this.configuration.fetchApi||fetch)(r.url,r.init)}catch(s){for(const a of this.middleware)a.onError&&(i=await a.onError({fetch:this.fetchApi,url:r.url,init:r.init,error:s,response:i?i.clone():void 0})||i);if(i!==void 0)throw new Dt(s,"The request failed and the interceptors did not return an alternative response")}for(const s of this.middleware)s.post&&(i=await s.post({fetch:this.fetchApi,url:r.url,init:r.init,response:i.clone()})||i);return i});this.configuration=e,this.middleware=e.middleware}withMiddleware(...e){const n=this.clone();return n.middleware=n.middleware.concat(...e),n}withPreMiddleware(...e){const n=e.map(r=>({pre:r}));return this.withMiddleware(...n)}withPostMiddleware(...e){const n=e.map(r=>({post:r}));return this.withMiddleware(...n)}async request(e,n){const{url:r,init:i}=await this.createFetchParams(e,n),s=await this.fetchApi(r,i);if(s.status>=200&&s.status<300)return s;throw new Lt(s,"Response returned an error code")}async createFetchParams(e,n){let r=this.configuration.basePath+e.path;e.query!==void 0&&Object.keys(e.query).length!==0&&(r+="?"+this.configuration.queryParamsStringify(e.query));const i=Object.assign({},this.configuration.headers,e.headers);Object.keys(i).forEach(u=>i[u]===void 0?delete i[u]:{});const s=typeof n=="function"?n:async()=>n,a={method:e.method,headers:i,body:e.body,credentials:this.configuration.credentials},o={...a,...await s({init:a,context:e})},l={...o,body:Ft(o.body)||o.body instanceof URLSearchParams||qt(o.body)?o.body:JSON.stringify(o.body)};return{url:r,init:l}}clone(){const e=this.constructor,n=new e(this.configuration);return n.middleware=this.middleware.slice(),n}}function qt(t){return typeof Blob!="undefined"&&t instanceof Blob}function Ft(t){return typeof FormData!="undefined"&&t instanceof FormData}class Lt extends Error{constructor(n,r){super(r);Q(this,"name","ResponseError");this.response=n}}class Dt extends Error{constructor(n,r){super(r);Q(this,"name","FetchError");this.cause=n}}class z extends Error{constructor(n,r){super(r);Q(this,"name","RequiredError");this.field=n}}function Ut(t,e){const n=t[e];return n!=null}function je(t,e=""){return Object.keys(t).map(n=>et(n,t[n],e)).filter(n=>n.length>0).join("&")}function et(t,e,n=""){const r=n+(n.length?`[${t}]`:t);if(e instanceof Array){const i=e.map(s=>encodeURIComponent(String(s))).join(`&${encodeURIComponent(r)}=`);return`${encodeURIComponent(r)}=${i}`}if(e instanceof Set){const i=Array.from(e);return et(t,i,n)}return e instanceof Date?`${encodeURIComponent(r)}=${encodeURIComponent(e.toISOString())}`:e instanceof Object?je(e,r):`${encodeURIComponent(r)}=${encodeURIComponent(String(e))}`}function tt(t){for(const e of t)if(e.contentType==="multipart/form-data")return!0;return!1}class H{constructor(e,n=r=>r){this.raw=e,this.transformer=n}async value(){return this.transformer(await this.raw.json())}}class ve{constructor(e){this.raw=e}async value(){}}function Gt(t){if(t!==void 0)return t===null?null:{password:t.password,username:t.username}}function Bt(t){return Jt(t)}function Jt(t,e){return t==null?t:{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}function Te(t){return Mt(t)}function Mt(t,e){return t==null?t:{accessToken:t.access_token,expiresIn:t.expires_in,name:t.name,refreshToken:t.refresh_token,userId:t.user_id,username:t.username}}function zt(t){if(t!==void 0)return t===null?null:{refresh_token:t.refreshToken}}function nt(t){return Vt(t)}function Vt(t,e){return t==null?t:{url:Ut(t,"url")?t.url:void 0}}function Kt(t){return Ht(t)}function Ht(t,e){return t==null?t:{link:t.link,mediaUrl:t.media_url,tweetId:t.tweet_id}}function Wt(t){return Xt(t)}function Xt(t,e){return t==null?t:{images:t.images.map(Kt)}}function rt(t){return Qt(t)}function Qt(t,e){return t==null?t:{accessSecret:t.access_secret,accessToken:t.access_token}}function Yt(t){return Zt(t)}function Zt(t,e){return t==null?t:{id:t.id,name:t.name}}class jt extends Ze{async bookmarksBookmarksGetRaw(e,n){if(e.userId===null||e.userId===void 0)throw new z("userId","Required parameter requestParameters.userId was null or undefined when calling bookmarksBookmarksGet.");const r={};e.userId!==void 0&&(r.user_id=e.userId);const i={};if(this.configuration&&this.configuration.accessToken){const a=this.configuration.accessToken,o=await a("jwt",[]);o&&(i.Authorization=`Bearer ${o}`)}const s=await this.request({path:"/api/pixiv/bookmarks",method:"GET",headers:i,query:r},n);return new ve(s)}async bookmarksBookmarksGet(e,n){await this.bookmarksBookmarksGetRaw(e,n)}async pingPingGetRaw(e){const n={},r={};if(this.configuration&&this.configuration.accessToken){const s=this.configuration.accessToken,a=await s("jwt",[]);a&&(r.Authorization=`Bearer ${a}`)}const i=await this.request({path:"/api/pixiv/ping",method:"GET",headers:r,query:n},e);return new ve(i)}async pingPingGet(e){await this.pingPingGetRaw(e)}async pixivAuthPostRaw(e,n){if(e.login===null||e.login===void 0)throw new z("login","Required parameter requestParameters.login was null or undefined when calling pixivAuthPost.");const r={},i={};i["Content-Type"]="application/json";const s=await this.request({path:"/api/pixiv/auth/",method:"POST",headers:i,query:r,body:Gt(e.login)},n);return new H(s,a=>Te(a))}async pixivAuthPost(e,n){return await(await this.pixivAuthPostRaw(e,n)).value()}async pixivPostPostPostRaw(e,n){if(e.images===null||e.images===void 0)throw new z("images","Required parameter requestParameters.images was null or undefined when calling pixivPostPostPost.");if(e.tags===null||e.tags===void 0)throw new z("tags","Required parameter requestParameters.tags was null or undefined when calling pixivPostPostPost.");if(e.title===null||e.title===void 0)throw new z("title","Required parameter requestParameters.title was null or undefined when calling pixivPostPostPost.");const r={},i={};if(this.configuration&&this.configuration.accessToken){const c=this.configuration.accessToken,d=await c("jwt",[]);d&&(i.Authorization=`Bearer ${d}`)}const a=tt([{contentType:"multipart/form-data"}]);let o,l=!1;l=a,l?o=new FormData:o=new URLSearchParams,e.images&&e.images.forEach(c=>{o.append("images",c)}),e.tags!==void 0&&o.append("tags",e.tags),e.text!==void 0&&o.append("text",e.text),e.title!==void 0&&o.append("title",e.title);const u=await this.request({path:"/api/pixiv/post",method:"POST",headers:i,query:r,body:o},n);return new H(u,c=>nt(c))}async pixivPostPostPost(e,n){return await(await this.pixivPostPostPostRaw(e,n)).value()}async pixivRefreshRefreshPostRaw(e,n){if(e.refreshToken===null||e.refreshToken===void 0)throw new z("refreshToken","Required parameter requestParameters.refreshToken was null or undefined when calling pixivRefreshRefreshPost.");const r={},i={};i["Content-Type"]="application/json";const s=await this.request({path:"/api/pixiv/auth/refresh",method:"POST",headers:i,query:r,body:zt(e.refreshToken)},n);return new H(s,a=>Te(a))}async pixivRefreshRefreshPost(e,n){return await(await this.pixivRefreshRefreshPostRaw(e,n)).value()}}class en extends Ze{async listTweetsTweetsUsernameGetRaw(e,n){if(e.username===null||e.username===void 0)throw new z("username","Required parameter requestParameters.username was null or undefined when calling listTweetsTweetsUsernameGet.");const r={};e.maxId!==void 0&&(r.max_id=e.maxId),e.count!==void 0&&(r.count=e.count);const i={};this.configuration&&(this.configuration.username!==void 0||this.configuration.password!==void 0)&&(i.Authorization="Basic "+btoa(this.configuration.username+":"+this.configuration.password));const s=await this.request({path:"/api/twitter/tweets/{username}".replace("{username}",encodeURIComponent(String(e.username))),method:"GET",headers:i,query:r},n);return new H(s,a=>Wt(a))}async listTweetsTweetsUsernameGet(e,n){return await(await this.listTweetsTweetsUsernameGetRaw(e,n)).value()}async twitterAuthCallbackCallbackGetRaw(e,n){if(e.oauthVerifier===null||e.oauthVerifier===void 0)throw new z("oauthVerifier","Required parameter requestParameters.oauthVerifier was null or undefined when calling twitterAuthCallbackCallbackGet.");if(e.oauthToken===null||e.oauthToken===void 0)throw new z("oauthToken","Required parameter requestParameters.oauthToken was null or undefined when calling twitterAuthCallbackCallbackGet.");const r={};e.oauthVerifier!==void 0&&(r.oauth_verifier=e.oauthVerifier),e.oauthToken!==void 0&&(r.oauth_token=e.oauthToken);const i={},s=await this.request({path:"/api/twitter/auth/callback",method:"GET",headers:i,query:r},n);return new H(s,a=>rt(a))}async twitterAuthCallbackCallbackGet(e,n){return await(await this.twitterAuthCallbackCallbackGetRaw(e,n)).value()}async twitterAuthGetRaw(e,n){const r={};e.returnTo!==void 0&&(r.return_to=e.returnTo);const i={},s=await this.request({path:"/api/twitter/auth/",method:"GET",headers:i,query:r},n);return new ve(s)}async twitterAuthGet(e={},n){await this.twitterAuthGetRaw(e,n)}async twitterPostPostPostRaw(e,n){if(e.text===null||e.text===void 0)throw new z("text","Required parameter requestParameters.text was null or undefined when calling twitterPostPostPost.");const r={},i={};this.configuration&&(this.configuration.username!==void 0||this.configuration.password!==void 0)&&(i.Authorization="Basic "+btoa(this.configuration.username+":"+this.configuration.password));const a=tt([{contentType:"multipart/form-data"}]);let o,l=!1;l=a,l?o=new FormData:o=new URLSearchParams,e.images&&e.images.forEach(c=>{o.append("images",c)}),e.text!==void 0&&o.append("text",e.text);const u=await this.request({path:"/api/twitter/post",method:"POST",headers:i,query:r,body:o},n);return new H(u,c=>nt(c))}async twitterPostPostPost(e,n){return await(await this.twitterPostPostPostRaw(e,n)).value()}async userUserGetRaw(e){const n={},r={};this.configuration&&(this.configuration.username!==void 0||this.configuration.password!==void 0)&&(r.Authorization="Basic "+btoa(this.configuration.username+":"+this.configuration.password));const i=await this.request({path:"/api/twitter/user",method:"GET",headers:r,query:n},e);return new H(i,s=>Yt(s))}async userUserGet(e){return await(await this.userUserGetRaw(e)).value()}}const tn="sns-manager-tokens-",it=localStorage,st=t=>tn+t,te=t=>{const e=st(t);return JSON.parse(it.getItem(e)||"[]")},ot=(t,e)=>{const n=te(e);if(n.findIndex(r=>r.token===t.accessToken)===-1){const r=nn(t,e);r?(n.push(r),rn(n,e)):console.log("Invalid token",t)}else console.warn("User is already logged in. Ignoring")},nn=(t,e)=>{const n=e==="twitter",r=e==="pixiv",i=!!t.accessToken,s=n?rt(t):r?i?t:Te(t):Bt(t);return!s||!s.accessToken||n&&!s.accessSecret?null:{token:s.accessToken,secret:s.accessSecret,refreshToken:s.refreshToken,userId:s.userId,username:s.username}},rn=(t,e)=>{const n=st(e);it.setItem(n,JSON.stringify(t))};function sn(t){let e,n,r,i,s,a;return r=new Ye({}),{c(){e=_("a"),n=_("div"),q(r.$$.fragment),i=A(),s=W(t[0]),f(n,"class","w-4 h-4"),f(e,"href",t[1]()),f(e,"class","flex flex-row items-center font-bold")},m(o,l){T(o,e,l),p(e,n),x(r,n,null),p(e,i),p(e,s),a=!0},p(o,[l]){(!a||l&1)&&$e(s,o[0])},i(o){a||(P(r.$$.fragment,o),a=!0)},o(o){S(r.$$.fragment,o),a=!1},d(o){o&&y(e),N(r)}}}function on(t,e,n){let{provider:r}=e;const i=Z(),s=()=>window.location.origin+window.location.pathname,a=()=>`${Re.apiBase}/api/${r}/auth?return_to=${encodeURIComponent(s())}`;return de(()=>{const l=new URLSearchParams(window.location.search).get(r);if(l){const u=JSON.parse(l);ot(u,r),history.replaceState("","",s()),i("login")}}),t.$$set=o=>{"provider"in o&&n(0,r=o.provider)},[r,a]}class we extends J{constructor(e){super(),B(this,e,on,sn,G,{provider:0})}}function an(t){let e,n,r;return{c(){e=_("input"),f(e,"class","bg-white border py-1 px-2 disabled:bg-gray-200"),f(e,"type","text"),f(e,"name",t[4]),e.disabled=t[1],e.required=t[2],f(e,"placeholder",t[3])},m(i,s){T(i,e,s),Y(e,t[0]),n||(r=F(e,"input",t[7]),n=!0)},p(i,s){s&16&&f(e,"name",i[4]),s&2&&(e.disabled=i[1]),s&4&&(e.required=i[2]),s&8&&f(e,"placeholder",i[3]),s&1&&e.value!==i[0]&&Y(e,i[0])},d(i){i&&y(e),n=!1,r()}}}function ln(t){let e,n,r;return{c(){e=_("input"),f(e,"class","bg-white border py-1 px-2 disabled:bg-gray-200"),f(e,"type","password"),f(e,"name",t[4]),e.disabled=t[1],e.required=t[2],f(e,"placeholder",t[3])},m(i,s){T(i,e,s),Y(e,t[0]),n||(r=F(e,"input",t[6]),n=!0)},p(i,s){s&16&&f(e,"name",i[4]),s&2&&(e.disabled=i[1]),s&4&&(e.required=i[2]),s&8&&f(e,"placeholder",i[3]),s&1&&e.value!==i[0]&&Y(e,i[0])},d(i){i&&y(e),n=!1,r()}}}function un(t){let e;function n(s,a){return s[5]?ln:an}let r=n(t),i=r(t);return{c(){i.c(),e=se()},m(s,a){i.m(s,a),T(s,e,a)},p(s,[a]){r===(r=n(s))&&i?i.p(s,a):(i.d(1),i=r(s),i&&(i.c(),i.m(e.parentNode,e)))},i:U,o:U,d(s){i.d(s),s&&y(e)}}}function cn(t,e,n){let{value:r}=e,{disabled:i=!1}=e,{required:s=!1}=e,{placeholder:a=""}=e,{name:o=""}=e,{password:l=!1}=e;function u(){r=this.value,n(0,r)}function c(){r=this.value,n(0,r)}return t.$$set=d=>{"value"in d&&n(0,r=d.value),"disabled"in d&&n(1,i=d.disabled),"required"in d&&n(2,s=d.required),"placeholder"in d&&n(3,a=d.placeholder),"name"in d&&n(4,o=d.name),"password"in d&&n(5,l=d.password)},[r,i,s,a,o,l,u,c]}class Ce extends J{constructor(e){super(),B(this,e,cn,un,G,{value:0,disabled:1,required:2,placeholder:3,name:4,password:5})}}function fn(t){let e,n,r,i;const s=t[3].default,a=Be(s,t,t[2],null);return{c(){e=_("button"),a&&a.c(),f(e,"class","disabled:text-gray-500 font-semibold border p-2 rounded"),e.disabled=t[0],f(e,"type",t[1])},m(o,l){T(o,e,l),a&&a.m(e,null),n=!0,r||(i=F(e,"click",t[4]),r=!0)},p(o,[l]){a&&a.p&&(!n||l&4)&&ze(a,s,o,o[2],n?Me(s,o[2],l,null):Ve(o[2]),null),(!n||l&1)&&(e.disabled=o[0]),(!n||l&2)&&f(e,"type",o[1])},i(o){n||(P(a,o),n=!0)},o(o){S(a,o),n=!1},d(o){o&&y(e),a&&a.d(o),r=!1,i()}}}function dn(t,e,n){let{$$slots:r={},$$scope:i}=e,{disabled:s=!1}=e,{type:a="button"}=e;function o(l){He.call(this,t,l)}return t.$$set=l=>{"disabled"in l&&n(0,s=l.disabled),"type"in l&&n(1,a=l.type),"$$scope"in l&&n(2,i=l.$$scope)},[s,a,i,r,o]}class hn extends J{constructor(e){super(),B(this,e,dn,fn,G,{disabled:0,type:1})}}function mn(t){let e;return{c(){e=W("Login")},m(n,r){T(n,e,r)},d(n){n&&y(e)}}}function pn(t){let e,n,r,i,s,a,o,l,u,c,d,g,b,m,w,h,R,C,L,M,I,k,O,E,$;r=new Ye({});function X(v){t[7](v)}let j={name:"username",disabled:t[3],placeholder:"Username",required:!0};t[0]!==void 0&&(j.value=t[0]),b=new Ce({props:j}),ie.push(()=>xe(b,"value",X));function at(v){t[8](v)}let Se={name:"password",disabled:t[3],placeholder:"Password",required:!0,password:!0};return t[1]!==void 0&&(Se.value=t[1]),h=new Ce({props:Se}),ie.push(()=>xe(h,"value",at)),I=new hn({props:{type:"submit",disabled:t[3],$$slots:{default:[mn]},$$scope:{ctx:t}}}),{c(){e=_("button"),n=_("div"),q(r.$$.fragment),i=W(`
  Pixiv`),s=A(),a=_("div"),o=_("div"),l=A(),u=_("div"),c=_("h2"),c.textContent="Pixiv Login",d=A(),g=_("form"),q(b.$$.fragment),w=A(),q(h.$$.fragment),C=A(),L=_("div"),L.textContent="Login might be slow or fail often.",M=A(),q(I.$$.fragment),f(n,"class","w-4 h-4"),f(e,"class","flex flex-row items-center font-bold"),f(o,"class","fixed inset-0 -z-10"),f(c,"class","font-bold"),f(L,"class","text-xs text-gray-500"),f(g,"class","flex flex-col gap-2 justify-center z-10"),f(u,"class","bg-white flex flex-col justify-center items-center p-4 gap-2"),f(a,"class",k=`${t[2]?"flex":"hidden"} fixed justify-center items-center inset-0 backdrop-blur-sm `)},m(v,D){T(v,e,D),p(e,n),x(r,n,null),p(e,i),T(v,s,D),T(v,a,D),p(a,o),p(a,l),p(a,u),p(u,c),p(u,d),p(u,g),x(b,g,null),p(g,w),x(h,g,null),p(g,C),p(g,L),p(g,M),x(I,g,null),O=!0,E||($=[F(e,"click",t[5]),F(o,"click",t[6]),F(g,"submit",mt(t[9]))],E=!0)},p(v,[D]){const he={};D&8&&(he.disabled=v[3]),!m&&D&1&&(m=!0,he.value=v[0],Ee(()=>m=!1)),b.$set(he);const me={};D&8&&(me.disabled=v[3]),!R&&D&2&&(R=!0,me.value=v[1],Ee(()=>R=!1)),h.$set(me);const pe={};D&8&&(pe.disabled=v[3]),D&2048&&(pe.$$scope={dirty:D,ctx:v}),I.$set(pe),(!O||D&4&&k!==(k=`${v[2]?"flex":"hidden"} fixed justify-center items-center inset-0 backdrop-blur-sm `))&&f(a,"class",k)},i(v){O||(P(r.$$.fragment,v),P(b.$$.fragment,v),P(h.$$.fragment,v),P(I.$$.fragment,v),O=!0)},o(v){S(r.$$.fragment,v),S(b.$$.fragment,v),S(h.$$.fragment,v),S(I.$$.fragment,v),O=!1},d(v){v&&y(e),N(r),v&&y(s),v&&y(a),N(b),N(h),N(I),E=!1,V($)}}}const gn="pixiv";function wn(t,e,n){const r=Z();let i="",s="",a=!1,o=!1;const l=async()=>{const m=new jt(new Pe({basePath:Re.apiBase}));n(3,o=!0);try{const w=await m.pixivAuthPost({login:{username:i,password:s}});ot(w,gn),r("login"),n(2,a=!1),n(0,i=""),n(1,s="")}catch(w){console.log("Failed to login to pixiv",w)}finally{n(3,o=!1)}},u=()=>n(2,a=!a),c=()=>n(2,a=!1);function d(m){i=m,n(0,i)}function g(m){s=m,n(1,s)}return[i,s,a,o,l,u,c,d,g,()=>l()]}class _n extends J{constructor(e){super(),B(this,e,wn,pn,G,{})}}function bn(t){let e,n,r,i,s,a,o;return{c(){e=_("div"),n=_("a"),r=_("img"),Oe(r.src,i=t[0].image)||f(r,"src",i),f(r,"alt","close up of reference"),f(r,"class","max-h-[75vh] mx-auto"),f(n,"href",s=t[0].link),f(n,"target","_blank"),f(e,"class","fixed inset-0 flex items-center backdrop-blur justify-center"),wt(e,"background","rgba(0,0,0,0.75)")},m(l,u){T(l,e,u),p(e,n),p(n,r),a||(o=[F(n,"click",pt(t[2])),F(e,"click",t[3])],a=!0)},p(l,[u]){u&1&&!Oe(r.src,i=l[0].image)&&f(r,"src",i),u&1&&s!==(s=l[0].link)&&f(n,"href",s)},i:U,o:U,d(l){l&&y(e),a=!1,V(o)}}}function yn(t,e,n){let{image:r}=e;const i=Z();function s(o){He.call(this,t,o)}const a=()=>i("close");return t.$$set=o=>{"image"in o&&n(0,r=o.image)},[r,i,s,a]}class kn extends J{constructor(e){super(),B(this,e,yn,bn,G,{image:0})}}function qe(t,e,n){const r=t.slice();return r[7]=e[n],r}function Fe(t){let e,n,r,i;function s(){return t[4](t[7])}return{c(){e=_("button"),f(e,"class","w-full bg-cover"),f(e,"style",n=`background-image: url(${t[7].image}); height: ${t[3]}px`)},m(a,o){T(a,e,o),r||(i=F(e,"click",s),r=!0)},p(a,o){t=a,o&9&&n!==(n=`background-image: url(${t[7].image}); height: ${t[3]}px`)&&f(e,"style",n)},d(a){a&&y(e),r=!1,i()}}}function Le(t){let e,n;return e=new kn({props:{image:t[2]}}),e.$on("close",t[6]),{c(){q(e.$$.fragment)},m(r,i){x(e,r,i),n=!0},p(r,i){const s={};i&4&&(s.image=r[2]),e.$set(s)},i(r){n||(P(e.$$.fragment,r),n=!0)},o(r){S(e.$$.fragment,r),n=!1},d(r){N(e,r)}}}function vn(t){let e,n,r,i,s=t[0],a=[];for(let l=0;l<s.length;l+=1)a[l]=Fe(qe(t,s,l));let o=t[2]&&Le(t);return{c(){e=_("div");for(let l=0;l<a.length;l+=1)a[l].c();n=A(),o&&o.c(),r=se(),f(e,"class","flex flex-col")},m(l,u){T(l,e,u);for(let c=0;c<a.length;c+=1)a[c].m(e,null);t[5](e),T(l,n,u),o&&o.m(l,u),T(l,r,u),i=!0},p(l,[u]){if(u&13){s=l[0];let c;for(c=0;c<s.length;c+=1){const d=qe(l,s,c);a[c]?a[c].p(d,u):(a[c]=Fe(d),a[c].c(),a[c].m(e,null))}for(;c<a.length;c+=1)a[c].d(1);a.length=s.length}l[2]?o?(o.p(l,u),u&4&&P(o,1)):(o=Le(l),o.c(),P(o,1),o.m(r.parentNode,r)):o&&(Xe(),S(o,1,1,()=>{o=null}),Qe())},i(l){i||(P(o),i=!0)},o(l){S(o),i=!1},d(l){l&&y(e),ht(a,l),t[5](null),l&&y(n),o&&o.d(l),l&&y(r)}}}function Tn(t,e,n){let r,{images:i=[]}=e,s,a;const o=c=>n(2,s=c);function l(c){ie[c?"unshift":"push"](()=>{a=c,n(1,a)})}const u=()=>n(2,s=void 0);return t.$$set=c=>{"images"in c&&n(0,i=c.images)},t.$$.update=()=>{t.$$.dirty&2&&n(3,r=(a==null?void 0:a.offsetWidth)*1.1)},[i,a,s,r,o,l,u]}class $n extends J{constructor(e){super(),B(this,e,Tn,vn,G,{images:0})}}function Rn(t){let e;return{c(){e=_("div"),e.textContent="Error loading the data",f(e,"class","p-8 text-red-600")},m(n,r){T(n,e,r)},p:U,d(n){n&&y(e)}}}function Pn(t){let e;return{c(){e=_("div"),e.textContent="LOADING",f(e,"class","p-8")},m(n,r){T(n,e,r)},p:U,d(n){n&&y(e)}}}function Sn(t){let e,n,r;return{c(){e=_("button"),e.textContent="Load More...",f(e,"class","p-8")},m(i,s){T(i,e,s),n||(r=F(e,"click",t[8]),n=!0)},p:U,d(i){i&&y(e),n=!1,r()}}}function In(t){let e,n,r,i,s,a,o,l,u,c,d,g;o=new $n({props:{images:t[3]}});function b(h,R){if(h[2]==h[1].LOADED)return Sn;if(h[2]==h[1].LOADING)return Pn;if(h[2]==h[1].ERROR)return Rn}let m=b(t),w=m&&m(t);return{c(){e=_("div"),n=_("div"),r=_("span"),i=W(t[0]),s=_("button"),s.textContent="x",a=A(),q(o.$$.fragment),l=A(),u=_("div"),w&&w.c(),f(s,"class","font-bold"),f(n,"class","flex gap-4"),f(u,"class","flex flex-col items-center text-gray-500 text-sm text-center"),f(e,"class","flex flex-col gap-2 basis-1/6")},m(h,R){T(h,e,R),p(e,n),p(n,r),p(r,i),p(n,s),p(e,a),x(o,e,null),p(e,l),p(e,u),w&&w.m(u,null),c=!0,d||(g=F(s,"click",t[7]),d=!0)},p(h,[R]){(!c||R&1)&&$e(i,h[0]);const C={};R&8&&(C.images=h[3]),o.$set(C),m===(m=b(h))&&w?w.p(h,R):(w&&w.d(1),w=m&&m(h),w&&(w.c(),w.m(u,null)))},i(h){c||(P(o.$$.fragment,h),c=!0)},o(h){S(o.$$.fragment,h),c=!1},d(h){h&&y(e),N(o),w&&w.d(),d=!1,g()}}}const On=40;function An(t,e,n){let{user:r}=e,{api:i}=e;const s=Z();var a;(function(m){m[m.LOADING=0]="LOADING",m[m.LOADED=1]="LOADED",m[m.FINISHED=2]="FINISHED",m[m.ERROR=3]="ERROR"})(a||(a={}));let o=a.LOADED,l,u=[];const c=()=>s("remove");de(()=>d(r));const d=async m=>{n(2,o=a.LOADING);try{const w=await i.listTweetsTweetsUsernameGet({username:m,maxId:l,count:On});if(w.images.length===0){n(2,o=a.FINISHED);return}l=w.images[w.images.length-1].tweetId;const R=w.images.map(C=>({image:C.mediaUrl,link:C.link}));n(3,u=[...u,...R]),n(2,o=a.LOADED)}catch{n(2,o=a.ERROR)}},g=()=>c(),b=()=>d(r);return t.$$set=m=>{"user"in m&&n(0,r=m.user),"api"in m&&n(6,i=m.api)},[r,a,o,u,c,d,i,g,b]}class En extends J{constructor(e){super(),B(this,e,An,In,G,{user:0,api:6})}}function De(t,e,n){const r=t.slice();return r[4]=e[n],r}function Ue(t,e){let n,r,i;function s(){return e[3](e[4])}return r=new En({props:{api:e[1],user:e[4]}}),r.$on("remove",s),{key:t,first:null,c(){n=se(),q(r.$$.fragment),this.first=n},m(a,o){T(a,n,o),x(r,a,o),i=!0},p(a,o){e=a;const l={};o&1&&(l.user=e[4]),r.$set(l)},i(a){i||(P(r.$$.fragment,a),i=!0)},o(a){S(r.$$.fragment,a),i=!1},d(a){a&&y(n),N(r,a)}}}function xn(t){let e=[],n=new Map,r,i,s=t[0];const a=o=>o[4];for(let o=0;o<s.length;o+=1){let l=De(t,s,o),u=a(l);n.set(u,e[o]=Ue(u,l))}return{c(){for(let o=0;o<e.length;o+=1)e[o].c();r=se()},m(o,l){for(let u=0;u<e.length;u+=1)e[u].m(o,l);T(o,r,l),i=!0},p(o,[l]){l&7&&(s=o[0],Xe(),e=Tt(e,l,a,1,o,s,n,r.parentNode,vt,Ue,r,De),Qe())},i(o){if(!i){for(let l=0;l<s.length;l+=1)P(e[l]);i=!0}},o(o){for(let l=0;l<e.length;l+=1)S(e[l]);i=!1},d(o){for(let l=0;l<e.length;l+=1)e[l].d(o);o&&y(r)}}}function Nn(t,e,n){let{users:r}=e;const i=new en(new Pe({basePath:Re.apiBase})),s=Z(),a=o=>s("remove",{user:o});return t.$$set=o=>{"users"in o&&n(0,r=o.users)},[r,i,s,a]}class Cn extends J{constructor(e){super(),B(this,e,Nn,xn,G,{users:0})}}function qn(t){let e,n,r,i,s;return{c(){e=_("h1"),e.textContent="Twitter",n=A(),r=_("input"),f(e,"class","font-bold text-xl"),f(r,"class","border"),f(r,"placeholder","add user")},m(a,o){T(a,e,o),T(a,n,o),T(a,r,o),Y(r,t[0]),i||(s=[F(r,"input",t[2]),F(r,"keydown",t[1])],i=!0)},p(a,[o]){o&1&&r.value!==a[0]&&Y(r,a[0])},i:U,o:U,d(a){a&&y(e),a&&y(n),a&&y(r),i=!1,V(s)}}}function Fn(t,e,n){let r="";const i=Z(),s=o=>{o.key=="Enter"&&(i("add",{user:r}),n(0,r=""))};function a(){r=this.value,n(0,r)}return[r,s,a]}class Ln extends J{constructor(e){super(),B(this,e,Fn,qn,G,{})}}function Dn(t){let e,n,r,i,s,a,o,l,u,c,d,g,b,m,w,h,R,C,L,M,I,k,O,E;return s=new we({props:{provider:"twitter"}}),s.$on("login",t[6]),o=new we({props:{provider:"reddit"}}),o.$on("login",t[7]),u=new we({props:{provider:"pinterest"}}),u.$on("login",t[8]),d=new _n({}),d.$on("login",t[9]),h=new Ln({}),h.$on("add",t[11]),I=new Cn({props:{users:t[1]}}),I.$on("remove",t[12]),{c(){e=_("div"),n=_("header"),r=_("button"),r.textContent="Open Sidebar",i=A(),q(s.$$.fragment),a=A(),q(o.$$.fragment),l=A(),q(u.$$.fragment),c=A(),q(d.$$.fragment),g=A(),b=_("div"),m=_("button"),m.textContent="x",w=A(),q(h.$$.fragment),C=A(),L=_("main"),M=_("div"),q(I.$$.fragment),f(n,"class","flex flex-row justify-center gap-4 border-b p-2"),f(b,"class",R="absolute inset-y-0 left-0 bg-red-300 w-80 "+(t[0]?"block":"hidden")),f(M,"class","flex grow"),f(L,"class","p-4 flex"),f(e,"class","h-full flex flex-col")},m($,X){T($,e,X),p(e,n),p(n,r),p(n,i),x(s,n,null),p(n,a),x(o,n,null),p(n,l),x(u,n,null),p(n,c),x(d,n,null),p(e,g),p(e,b),p(b,m),p(b,w),x(h,b,null),p(e,C),p(e,L),p(L,M),x(I,M,null),k=!0,O||(E=[F(r,"click",t[5]),F(m,"click",t[10])],O=!0)},p($,[X]){(!k||X&1&&R!==(R="absolute inset-y-0 left-0 bg-red-300 w-80 "+($[0]?"block":"hidden")))&&f(b,"class",R);const j={};X&2&&(j.users=$[1]),I.$set(j)},i($){k||(P(s.$$.fragment,$),P(o.$$.fragment,$),P(u.$$.fragment,$),P(d.$$.fragment,$),P(h.$$.fragment,$),P(I.$$.fragment,$),k=!0)},o($){S(s.$$.fragment,$),S(o.$$.fragment,$),S(u.$$.fragment,$),S(d.$$.fragment,$),S(h.$$.fragment,$),S(I.$$.fragment,$),k=!1},d($){$&&y(e),N(s),N(o),N(u),N(d),N(h),N(I),O=!1,V(E)}}}const _e="sns-manager-twitter-reference-users";function Un(t,e,n){let r=!1,i=[];de(async()=>{n(1,i=JSON.parse(localStorage.getItem(_e)||"[]"))});const s=h=>{n(1,i=i.filter(R=>R!==h)),localStorage.setItem(_e,JSON.stringify(i))},a=h=>{n(1,i=[...i,h]),localStorage.setItem(_e,JSON.stringify(i))},o=()=>{te("twitter"),te("reddit"),te("pixiv"),te("pinterest")};return de(()=>o()),[r,i,s,a,o,()=>n(0,r=!r),()=>o(),()=>o(),()=>o(),()=>o(),()=>n(0,r=!1),h=>a(h.detail.user),h=>s(h.detail.user)]}class Gn extends J{constructor(e){super(),B(this,e,Un,Dn,G,{})}}new Gn({target:document.getElementById("app")});
