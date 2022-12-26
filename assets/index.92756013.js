var ct=Object.defineProperty;var ft=(t,e,n)=>e in t?ct(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Q=(t,e,n)=>(ft(t,typeof e!="symbol"?e+"":e,n),n);const dt=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}};dt();function J(){}function ce(t,e){for(const n in e)t[n]=e[n];return t}function Je(t){return t()}function Ie(){return Object.create(null)}function V(t){t.forEach(Je)}function ht(t){return typeof t=="function"}function x(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let oe;function Ae(t,e){return oe||(oe=document.createElement("a")),oe.href=e,t===oe.href}function mt(t){return Object.keys(t).length===0}function Me(t,e,n,i){if(t){const r=ze(t,e,n,i);return t[0](r)}}function ze(t,e,n,i){return t[1]&&i?ce(n.ctx.slice(),t[1](i(e))):n.ctx}function Ve(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const s=[],a=Math.max(e.dirty.length,r.length);for(let o=0;o<a;o+=1)s[o]=e.dirty[o]|r[o];return s}return e.dirty|r}return e.dirty}function Ke(t,e,n,i,r,s){if(r){const a=ze(e,n,i,s);t.p(a,r)}}function He(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Oe(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function w(t,e){t.appendChild(e)}function $(t,e,n){t.insertBefore(e,n||null)}function v(t){t.parentNode.removeChild(t)}function pt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function b(t){return document.createElement(t)}function fe(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function W(t){return document.createTextNode(t)}function A(){return W(" ")}function se(){return W("")}function D(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function gt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function wt(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function f(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function _t(t){return Array.from(t.childNodes)}function $e(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Y(t,e){t.value=e==null?"":e}function bt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function yt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}let ie;function ne(t){ie=t}function We(){if(!ie)throw new Error("Function called outside component initialization");return ie}function de(t){We().$$.on_mount.push(t)}function Z(){const t=We();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const s=yt(e,n,{cancelable:i});return r.slice().forEach(a=>{a.call(t,s)}),!s.defaultPrevented}return!0}}function Xe(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const ee=[],re=[],le=[],be=[],kt=Promise.resolve();let ye=!1;function vt(){ye||(ye=!0,kt.then(Qe))}function ke(t){le.push(t)}function Ee(t){be.push(t)}const ge=new Set;let ae=0;function Qe(){const t=ie;do{for(;ae<ee.length;){const e=ee[ae];ae++,ne(e),Tt(e.$$)}for(ne(null),ee.length=0,ae=0;re.length;)re.pop()();for(let e=0;e<le.length;e+=1){const n=le[e];ge.has(n)||(ge.add(n),n())}le.length=0}while(ee.length);for(;be.length;)be.pop()();ye=!1,ge.clear(),ne(t)}function Tt(t){if(t.fragment!==null){t.update(),V(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(ke)}}const ue=new Set;let K;function Ye(){K={r:0,c:[],p:K}}function Ze(){K.r||V(K.c),K=K.p}function P(t,e){t&&t.i&&(ue.delete(t),t.i(e))}function R(t,e,n,i){if(t&&t.o){if(ue.has(t))return;ue.add(t),K.c.push(()=>{ue.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function $t(t,e){R(t,1,1,()=>{e.delete(t.key)})}function Pt(t,e,n,i,r,s,a,o,l,u,c,d){let _=t.length,m=s.length,p=_;const h={};for(;p--;)h[t[p].key]=p;const g=[],O=new Map,B=new Map;for(p=m;p--;){const y=d(r,s,p),I=n(y);let E=a.get(I);E?i&&E.p(y,e):(E=u(I,y),E.c()),O.set(I,g[p]=E),I in h&&B.set(I,Math.abs(p-h[I]))}const L=new Set,M=new Set;function S(y){P(y,1),y.m(o,c),a.set(y.key,y),c=y.first,m--}for(;_&&m;){const y=g[m-1],I=t[_-1],E=y.key,T=I.key;y===I?(c=y.first,_--,m--):O.has(T)?!a.has(E)||L.has(E)?S(y):M.has(T)?_--:B.get(E)>B.get(T)?(M.add(E),S(y)):(L.add(T),_--):(l(I,a),_--)}for(;_--;){const y=t[_];O.has(y.key)||l(y,a)}for(;m;)S(g[m-1]);return g}function Rt(t,e){const n={},i={},r={$$scope:1};let s=t.length;for(;s--;){const a=t[s],o=e[s];if(o){for(const l in a)l in o||(i[l]=1);for(const l in o)r[l]||(n[l]=o[l],r[l]=1);t[s]=o}else for(const l in a)r[l]=1}for(const a in i)a in n||(n[a]=void 0);return n}function St(t){return typeof t=="object"&&t!==null?t:{}}function Ne(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function q(t){t&&t.c()}function N(t,e,n,i){const{fragment:r,on_mount:s,on_destroy:a,after_update:o}=t.$$;r&&r.m(e,n),i||ke(()=>{const l=s.map(Je).filter(ht);a?a.push(...l):V(l),t.$$.on_mount=[]}),o.forEach(ke)}function C(t,e){const n=t.$$;n.fragment!==null&&(V(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function It(t,e){t.$$.dirty[0]===-1&&(ee.push(t),vt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function G(t,e,n,i,r,s,a,o=[-1]){const l=ie;ne(t);const u=t.$$={fragment:null,ctx:null,props:s,update:J,not_equal:r,bound:Ie(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:Ie(),dirty:o,skip_bound:!1,root:e.target||l.$$.root};a&&a(u.root);let c=!1;if(u.ctx=n?n(t,e.props||{},(d,_,...m)=>{const p=m.length?m[0]:_;return u.ctx&&r(u.ctx[d],u.ctx[d]=p)&&(!u.skip_bound&&u.bound[d]&&u.bound[d](p),c&&It(t,d)),_}):[],u.update(),c=!0,V(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){const d=_t(e.target);u.fragment&&u.fragment.l(d),d.forEach(v)}else u.fragment&&u.fragment.c();e.intro&&P(t.$$.fragment),N(t,e.target,e.anchor,e.customElement),Qe()}ne(l)}class U{$destroy(){C(this,1),this.$destroy=J}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!mt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Ce(t){let e,n;return{c(){e=fe("title"),n=W(t[0])},m(i,r){$(i,e,r),w(e,n)},p(i,r){r&1&&$e(n,i[0])},d(i){i&&v(e)}}}function At(t){let e,n,i,r=t[0]&&Ce(t);const s=t[3].default,a=Me(s,t,t[2],null);return{c(){e=fe("svg"),r&&r.c(),n=se(),a&&a.c(),f(e,"xmlns","http://www.w3.org/2000/svg"),f(e,"viewBox",t[1]),f(e,"class","svelte-c8tyih")},m(o,l){$(o,e,l),r&&r.m(e,null),w(e,n),a&&a.m(e,null),i=!0},p(o,[l]){o[0]?r?r.p(o,l):(r=Ce(o),r.c(),r.m(e,n)):r&&(r.d(1),r=null),a&&a.p&&(!i||l&4)&&Ke(a,s,o,o[2],i?Ve(s,o[2],l,null):He(o[2]),null),(!i||l&2)&&f(e,"viewBox",o[1])},i(o){i||(P(a,o),i=!0)},o(o){R(a,o),i=!1},d(o){o&&v(e),r&&r.d(),a&&a.d(o)}}}function Ot(t,e,n){let{$$slots:i={},$$scope:r}=e,{title:s=null}=e,{viewBox:a}=e;return t.$$set=o=>{"title"in o&&n(0,s=o.title),"viewBox"in o&&n(1,a=o.viewBox),"$$scope"in o&&n(2,r=o.$$scope)},[s,a,r,i]}class Et extends U{constructor(e){super(),G(this,e,Ot,At,x,{title:0,viewBox:1})}}function Nt(t){let e,n,i;return{c(){e=fe("path"),n=A(),i=fe("path"),f(e,"d","M256 48c-42.9 0-84.2 13-119.2 37.5-34.2 24-60.2 57.2-75.1 96.1L58 192h45.7l1.9-5c8.2-17.8 19.4-33.9 33.5-48 31.2-31.2 72.7-48.4 116.9-48.4s85.7 17.2 116.9 48.4c31.2 31.2 48.4 72.7 48.4 116.9 0 44.1-17.2 85.7-48.4 116.9-31.2 31.2-72.7 48.4-116.9 48.4-44.1 0-85.6-17.2-116.9-48.4-14-14-25.3-30.1-33.5-47.9l-1.9-5H58l3.6 10.4c14.9 38.9 40.9 72.1 75.1 96.1C171.8 451.1 213 464 256 464c114.7 0 208-93.3 208-208S370.7 48 256 48z"),f(i,"d","M48 277.4h189.7l-43.6 44.7L224 352l96-96-96-96-31 29.9 44.7 44.7H48v42.8z")},m(r,s){$(r,e,s),$(r,n,s),$(r,i,s)},p:J,d(r){r&&v(e),r&&v(n),r&&v(i)}}}function Ct(t){let e,n;const i=[{viewBox:"0 0 512 512"},t[0]];let r={$$slots:{default:[Nt]},$$scope:{ctx:t}};for(let s=0;s<i.length;s+=1)r=ce(r,i[s]);return e=new Et({props:r}),{c(){q(e.$$.fragment)},m(s,a){N(e,s,a),n=!0},p(s,[a]){const o=a&1?Rt(i,[i[0],St(s[0])]):{};a&2&&(o.$$scope={dirty:a,ctx:s}),e.$set(o)},i(s){n||(P(e.$$.fragment,s),n=!0)},o(s){R(e.$$.fragment,s),n=!1},d(s){C(e,s)}}}function Dt(t,e,n){return t.$$set=i=>{n(0,e=ce(ce({},e),Oe(i)))},e=Oe(e),[e]}class je extends U{constructor(e){super(),G(this,e,Dt,Ct,x,{})}}const Pe={apiBase:"http://localhost:8080"},Lt="http://localhost".replace(/\/+$/,"");class Re{constructor(e={}){this.configuration=e}set config(e){this.configuration=e}get basePath(){return this.configuration.basePath!=null?this.configuration.basePath:Lt}get fetchApi(){return this.configuration.fetchApi}get middleware(){return this.configuration.middleware||[]}get queryParamsStringify(){return this.configuration.queryParamsStringify||tt}get username(){return this.configuration.username}get password(){return this.configuration.password}get apiKey(){const e=this.configuration.apiKey;if(e)return typeof e=="function"?e:()=>e}get accessToken(){const e=this.configuration.accessToken;if(e)return typeof e=="function"?e:async()=>e}get headers(){return this.configuration.headers}get credentials(){return this.configuration.credentials}}const qt=new Re;class et{constructor(e=qt){Q(this,"middleware");Q(this,"fetchApi",async(e,n)=>{let i={url:e,init:n};for(const s of this.middleware)s.pre&&(i=await s.pre({fetch:this.fetchApi,...i})||i);let r;try{r=await(this.configuration.fetchApi||fetch)(i.url,i.init)}catch(s){for(const a of this.middleware)a.onError&&(r=await a.onError({fetch:this.fetchApi,url:i.url,init:i.init,error:s,response:r?r.clone():void 0})||r);if(r!==void 0)throw new Ut(s,"The request failed and the interceptors did not return an alternative response")}for(const s of this.middleware)s.post&&(r=await s.post({fetch:this.fetchApi,url:i.url,init:i.init,response:r.clone()})||r);return r});this.configuration=e,this.middleware=e.middleware}withMiddleware(...e){const n=this.clone();return n.middleware=n.middleware.concat(...e),n}withPreMiddleware(...e){const n=e.map(i=>({pre:i}));return this.withMiddleware(...n)}withPostMiddleware(...e){const n=e.map(i=>({post:i}));return this.withMiddleware(...n)}async request(e,n){const{url:i,init:r}=await this.createFetchParams(e,n),s=await this.fetchApi(i,r);if(s.status>=200&&s.status<300)return s;throw new Gt(s,"Response returned an error code")}async createFetchParams(e,n){let i=this.configuration.basePath+e.path;e.query!==void 0&&Object.keys(e.query).length!==0&&(i+="?"+this.configuration.queryParamsStringify(e.query));const r=Object.assign({},this.configuration.headers,e.headers);Object.keys(r).forEach(u=>r[u]===void 0?delete r[u]:{});const s=typeof n=="function"?n:async()=>n,a={method:e.method,headers:r,body:e.body,credentials:this.configuration.credentials},o={...a,...await s({init:a,context:e})},l={...o,body:xt(o.body)||o.body instanceof URLSearchParams||Ft(o.body)?o.body:JSON.stringify(o.body)};return{url:i,init:l}}clone(){const e=this.constructor,n=new e(this.configuration);return n.middleware=this.middleware.slice(),n}}function Ft(t){return typeof Blob!="undefined"&&t instanceof Blob}function xt(t){return typeof FormData!="undefined"&&t instanceof FormData}class Gt extends Error{constructor(n,i){super(i);Q(this,"name","ResponseError");this.response=n}}class Ut extends Error{constructor(n,i){super(i);Q(this,"name","FetchError");this.cause=n}}class z extends Error{constructor(n,i){super(i);Q(this,"name","RequiredError");this.field=n}}function Bt(t,e){const n=t[e];return n!=null}function tt(t,e=""){return Object.keys(t).map(n=>nt(n,t[n],e)).filter(n=>n.length>0).join("&")}function nt(t,e,n=""){const i=n+(n.length?`[${t}]`:t);if(e instanceof Array){const r=e.map(s=>encodeURIComponent(String(s))).join(`&${encodeURIComponent(i)}=`);return`${encodeURIComponent(i)}=${r}`}if(e instanceof Set){const r=Array.from(e);return nt(t,r,n)}return e instanceof Date?`${encodeURIComponent(i)}=${encodeURIComponent(e.toISOString())}`:e instanceof Object?tt(e,i):`${encodeURIComponent(i)}=${encodeURIComponent(String(e))}`}function it(t){for(const e of t)if(e.contentType==="multipart/form-data")return!0;return!1}class H{constructor(e,n=i=>i){this.raw=e,this.transformer=n}async value(){return this.transformer(await this.raw.json())}}class ve{constructor(e){this.raw=e}async value(){}}function Jt(t){if(t!==void 0)return t===null?null:{password:t.password,username:t.username}}function Mt(t){return zt(t)}function zt(t,e){return t==null?t:{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}function Te(t){return Vt(t)}function Vt(t,e){return t==null?t:{accessToken:t.access_token,expiresIn:t.expires_in,name:t.name,refreshToken:t.refresh_token,userId:t.user_id,username:t.username}}function Kt(t){if(t!==void 0)return t===null?null:{refresh_token:t.refreshToken}}function rt(t){return Ht(t)}function Ht(t,e){return t==null?t:{url:Bt(t,"url")?t.url:void 0}}function Wt(t){return Xt(t)}function Xt(t,e){return t==null?t:{link:t.link,mediaUrl:t.media_url,tweetId:t.tweet_id}}function Qt(t){return Yt(t)}function Yt(t,e){return t==null?t:{images:t.images.map(Wt)}}function st(t){return Zt(t)}function Zt(t,e){return t==null?t:{accessSecret:t.access_secret,accessToken:t.access_token}}function jt(t){return en(t)}function en(t,e){return t==null?t:{id:t.id,name:t.name}}class tn extends et{async bookmarksBookmarksGetRaw(e,n){if(e.userId===null||e.userId===void 0)throw new z("userId","Required parameter requestParameters.userId was null or undefined when calling bookmarksBookmarksGet.");const i={};e.userId!==void 0&&(i.user_id=e.userId);const r={};if(this.configuration&&this.configuration.accessToken){const a=this.configuration.accessToken,o=await a("jwt",[]);o&&(r.Authorization=`Bearer ${o}`)}const s=await this.request({path:"/api/pixiv/bookmarks",method:"GET",headers:r,query:i},n);return new ve(s)}async bookmarksBookmarksGet(e,n){await this.bookmarksBookmarksGetRaw(e,n)}async pingPingGetRaw(e){const n={},i={};if(this.configuration&&this.configuration.accessToken){const s=this.configuration.accessToken,a=await s("jwt",[]);a&&(i.Authorization=`Bearer ${a}`)}const r=await this.request({path:"/api/pixiv/ping",method:"GET",headers:i,query:n},e);return new ve(r)}async pingPingGet(e){await this.pingPingGetRaw(e)}async pixivAuthPostRaw(e,n){if(e.login===null||e.login===void 0)throw new z("login","Required parameter requestParameters.login was null or undefined when calling pixivAuthPost.");const i={},r={};r["Content-Type"]="application/json";const s=await this.request({path:"/api/pixiv/auth/",method:"POST",headers:r,query:i,body:Jt(e.login)},n);return new H(s,a=>Te(a))}async pixivAuthPost(e,n){return await(await this.pixivAuthPostRaw(e,n)).value()}async pixivPostPostPostRaw(e,n){if(e.images===null||e.images===void 0)throw new z("images","Required parameter requestParameters.images was null or undefined when calling pixivPostPostPost.");if(e.tags===null||e.tags===void 0)throw new z("tags","Required parameter requestParameters.tags was null or undefined when calling pixivPostPostPost.");if(e.title===null||e.title===void 0)throw new z("title","Required parameter requestParameters.title was null or undefined when calling pixivPostPostPost.");const i={},r={};if(this.configuration&&this.configuration.accessToken){const c=this.configuration.accessToken,d=await c("jwt",[]);d&&(r.Authorization=`Bearer ${d}`)}const a=it([{contentType:"multipart/form-data"}]);let o,l=!1;l=a,l?o=new FormData:o=new URLSearchParams,e.images&&e.images.forEach(c=>{o.append("images",c)}),e.tags!==void 0&&o.append("tags",e.tags),e.text!==void 0&&o.append("text",e.text),e.title!==void 0&&o.append("title",e.title);const u=await this.request({path:"/api/pixiv/post",method:"POST",headers:r,query:i,body:o},n);return new H(u,c=>rt(c))}async pixivPostPostPost(e,n){return await(await this.pixivPostPostPostRaw(e,n)).value()}async pixivRefreshRefreshPostRaw(e,n){if(e.refreshToken===null||e.refreshToken===void 0)throw new z("refreshToken","Required parameter requestParameters.refreshToken was null or undefined when calling pixivRefreshRefreshPost.");const i={},r={};r["Content-Type"]="application/json";const s=await this.request({path:"/api/pixiv/auth/refresh",method:"POST",headers:r,query:i,body:Kt(e.refreshToken)},n);return new H(s,a=>Te(a))}async pixivRefreshRefreshPost(e,n){return await(await this.pixivRefreshRefreshPostRaw(e,n)).value()}}class nn extends et{async listTweetsTweetsUsernameGetRaw(e,n){if(e.username===null||e.username===void 0)throw new z("username","Required parameter requestParameters.username was null or undefined when calling listTweetsTweetsUsernameGet.");const i={};e.maxId!==void 0&&(i.max_id=e.maxId),e.count!==void 0&&(i.count=e.count);const r={};this.configuration&&(this.configuration.username!==void 0||this.configuration.password!==void 0)&&(r.Authorization="Basic "+btoa(this.configuration.username+":"+this.configuration.password));const s=await this.request({path:"/api/twitter/tweets/{username}".replace("{username}",encodeURIComponent(String(e.username))),method:"GET",headers:r,query:i},n);return new H(s,a=>Qt(a))}async listTweetsTweetsUsernameGet(e,n){return await(await this.listTweetsTweetsUsernameGetRaw(e,n)).value()}async twitterAuthCallbackCallbackGetRaw(e,n){if(e.oauthVerifier===null||e.oauthVerifier===void 0)throw new z("oauthVerifier","Required parameter requestParameters.oauthVerifier was null or undefined when calling twitterAuthCallbackCallbackGet.");if(e.oauthToken===null||e.oauthToken===void 0)throw new z("oauthToken","Required parameter requestParameters.oauthToken was null or undefined when calling twitterAuthCallbackCallbackGet.");const i={};e.oauthVerifier!==void 0&&(i.oauth_verifier=e.oauthVerifier),e.oauthToken!==void 0&&(i.oauth_token=e.oauthToken);const r={},s=await this.request({path:"/api/twitter/auth/callback",method:"GET",headers:r,query:i},n);return new H(s,a=>st(a))}async twitterAuthCallbackCallbackGet(e,n){return await(await this.twitterAuthCallbackCallbackGetRaw(e,n)).value()}async twitterAuthGetRaw(e,n){const i={};e.returnTo!==void 0&&(i.return_to=e.returnTo);const r={},s=await this.request({path:"/api/twitter/auth/",method:"GET",headers:r,query:i},n);return new ve(s)}async twitterAuthGet(e={},n){await this.twitterAuthGetRaw(e,n)}async twitterPostPostPostRaw(e,n){if(e.text===null||e.text===void 0)throw new z("text","Required parameter requestParameters.text was null or undefined when calling twitterPostPostPost.");const i={},r={};this.configuration&&(this.configuration.username!==void 0||this.configuration.password!==void 0)&&(r.Authorization="Basic "+btoa(this.configuration.username+":"+this.configuration.password));const a=it([{contentType:"multipart/form-data"}]);let o,l=!1;l=a,l?o=new FormData:o=new URLSearchParams,e.images&&e.images.forEach(c=>{o.append("images",c)}),e.text!==void 0&&o.append("text",e.text);const u=await this.request({path:"/api/twitter/post",method:"POST",headers:r,query:i,body:o},n);return new H(u,c=>rt(c))}async twitterPostPostPost(e,n){return await(await this.twitterPostPostPostRaw(e,n)).value()}async userUserGetRaw(e){const n={},i={};this.configuration&&(this.configuration.username!==void 0||this.configuration.password!==void 0)&&(i.Authorization="Basic "+btoa(this.configuration.username+":"+this.configuration.password));const r=await this.request({path:"/api/twitter/user",method:"GET",headers:i,query:n},e);return new H(r,s=>jt(s))}async userUserGet(e){return await(await this.userUserGetRaw(e)).value()}}const rn="sns-manager-tokens-",ot=localStorage,at=t=>rn+t,te=t=>{const e=at(t);return JSON.parse(ot.getItem(e)||"[]")},lt=(t,e)=>{const n=te(e);if(n.findIndex(i=>i.token===t.accessToken)===-1){const i=sn(t,e);i?(n.push(i),on(n,e)):console.log("Invalid token",t)}else console.warn("User is already logged in. Ignoring")},sn=(t,e)=>{const n=e==="twitter",i=e==="pixiv",r=!!t.accessToken,s=n?st(t):i?r?t:Te(t):Mt(t);return!s||!s.accessToken||n&&!s.accessSecret?null:{token:s.accessToken,secret:s.accessSecret,refreshToken:s.refreshToken,userId:s.userId,username:s.username}},on=(t,e)=>{const n=at(e);ot.setItem(n,JSON.stringify(t))};function an(t){let e,n,i,r,s,a;return i=new je({}),{c(){e=b("a"),n=b("div"),q(i.$$.fragment),r=A(),s=W(t[0]),f(n,"class","w-4 h-4"),f(e,"href",t[1]()),f(e,"class","flex flex-row items-center font-bold")},m(o,l){$(o,e,l),w(e,n),N(i,n,null),w(e,r),w(e,s),a=!0},p(o,[l]){(!a||l&1)&&$e(s,o[0])},i(o){a||(P(i.$$.fragment,o),a=!0)},o(o){R(i.$$.fragment,o),a=!1},d(o){o&&v(e),C(i)}}}function ln(t,e,n){let{provider:i}=e;const r=Z(),s=()=>window.location.origin+window.location.pathname,a=()=>`${Pe.apiBase}/api/${i}/auth?return_to=${encodeURIComponent(s())}`;return de(()=>{const l=new URLSearchParams(window.location.search).get(i);if(l){const u=JSON.parse(l);lt(u,i),history.replaceState("","",s()),r("login")}}),t.$$set=o=>{"provider"in o&&n(0,i=o.provider)},[i,a]}class we extends U{constructor(e){super(),G(this,e,ln,an,x,{provider:0})}}function un(t){let e,n,i;return{c(){e=b("input"),f(e,"class","bg-white border py-1 px-2 disabled:bg-gray-200"),f(e,"type","text"),f(e,"name",t[4]),e.disabled=t[1],e.required=t[2],f(e,"placeholder",t[3])},m(r,s){$(r,e,s),Y(e,t[0]),n||(i=D(e,"input",t[7]),n=!0)},p(r,s){s&16&&f(e,"name",r[4]),s&2&&(e.disabled=r[1]),s&4&&(e.required=r[2]),s&8&&f(e,"placeholder",r[3]),s&1&&e.value!==r[0]&&Y(e,r[0])},d(r){r&&v(e),n=!1,i()}}}function cn(t){let e,n,i;return{c(){e=b("input"),f(e,"class","bg-white border py-1 px-2 disabled:bg-gray-200"),f(e,"type","password"),f(e,"name",t[4]),e.disabled=t[1],e.required=t[2],f(e,"placeholder",t[3])},m(r,s){$(r,e,s),Y(e,t[0]),n||(i=D(e,"input",t[6]),n=!0)},p(r,s){s&16&&f(e,"name",r[4]),s&2&&(e.disabled=r[1]),s&4&&(e.required=r[2]),s&8&&f(e,"placeholder",r[3]),s&1&&e.value!==r[0]&&Y(e,r[0])},d(r){r&&v(e),n=!1,i()}}}function fn(t){let e;function n(s,a){return s[5]?cn:un}let i=n(t),r=i(t);return{c(){r.c(),e=se()},m(s,a){r.m(s,a),$(s,e,a)},p(s,[a]){i===(i=n(s))&&r?r.p(s,a):(r.d(1),r=i(s),r&&(r.c(),r.m(e.parentNode,e)))},i:J,o:J,d(s){r.d(s),s&&v(e)}}}function dn(t,e,n){let{value:i}=e,{disabled:r=!1}=e,{required:s=!1}=e,{placeholder:a=""}=e,{name:o=""}=e,{password:l=!1}=e;function u(){i=this.value,n(0,i)}function c(){i=this.value,n(0,i)}return t.$$set=d=>{"value"in d&&n(0,i=d.value),"disabled"in d&&n(1,r=d.disabled),"required"in d&&n(2,s=d.required),"placeholder"in d&&n(3,a=d.placeholder),"name"in d&&n(4,o=d.name),"password"in d&&n(5,l=d.password)},[i,r,s,a,o,l,u,c]}class De extends U{constructor(e){super(),G(this,e,dn,fn,x,{value:0,disabled:1,required:2,placeholder:3,name:4,password:5})}}function hn(t){let e,n,i,r;const s=t[3].default,a=Me(s,t,t[2],null);return{c(){e=b("button"),a&&a.c(),f(e,"class","disabled:text-gray-500 font-semibold border p-2 rounded"),e.disabled=t[0],f(e,"type",t[1])},m(o,l){$(o,e,l),a&&a.m(e,null),n=!0,i||(r=D(e,"click",t[4]),i=!0)},p(o,[l]){a&&a.p&&(!n||l&4)&&Ke(a,s,o,o[2],n?Ve(s,o[2],l,null):He(o[2]),null),(!n||l&1)&&(e.disabled=o[0]),(!n||l&2)&&f(e,"type",o[1])},i(o){n||(P(a,o),n=!0)},o(o){R(a,o),n=!1},d(o){o&&v(e),a&&a.d(o),i=!1,r()}}}function mn(t,e,n){let{$$slots:i={},$$scope:r}=e,{disabled:s=!1}=e,{type:a="button"}=e;function o(l){Xe.call(this,t,l)}return t.$$set=l=>{"disabled"in l&&n(0,s=l.disabled),"type"in l&&n(1,a=l.type),"$$scope"in l&&n(2,r=l.$$scope)},[s,a,r,i,o]}class pn extends U{constructor(e){super(),G(this,e,mn,hn,x,{disabled:0,type:1})}}function gn(t){let e;return{c(){e=W("Login")},m(n,i){$(n,e,i)},d(n){n&&v(e)}}}function wn(t){let e,n,i,r,s,a,o,l,u,c,d,_,m,p,h,g,O,B,L,M,S,y,I,E,T;i=new je({});function X(k){t[7](k)}let j={name:"username",disabled:t[3],placeholder:"Username",required:!0};t[0]!==void 0&&(j.value=t[0]),m=new De({props:j}),re.push(()=>Ne(m,"value",X));function ut(k){t[8](k)}let Se={name:"password",disabled:t[3],placeholder:"Password",required:!0,password:!0};return t[1]!==void 0&&(Se.value=t[1]),g=new De({props:Se}),re.push(()=>Ne(g,"value",ut)),S=new pn({props:{type:"submit",disabled:t[3],$$slots:{default:[gn]},$$scope:{ctx:t}}}),{c(){e=b("button"),n=b("div"),q(i.$$.fragment),r=W(`
  Pixiv`),s=A(),a=b("div"),o=b("div"),l=A(),u=b("div"),c=b("h2"),c.textContent="Pixiv Login",d=A(),_=b("form"),q(m.$$.fragment),h=A(),q(g.$$.fragment),B=A(),L=b("div"),L.textContent="Login might be slow or fail often.",M=A(),q(S.$$.fragment),f(n,"class","w-4 h-4"),f(e,"class","flex flex-row items-center font-bold"),f(o,"class","fixed inset-0 -z-10"),f(c,"class","font-bold"),f(L,"class","text-xs text-gray-500"),f(_,"class","flex flex-col gap-2 justify-center z-10"),f(u,"class","bg-white flex flex-col justify-center items-center p-4 gap-2"),f(a,"class",y=`${t[2]?"flex":"hidden"} fixed justify-center items-center inset-0 backdrop-blur-sm `)},m(k,F){$(k,e,F),w(e,n),N(i,n,null),w(e,r),$(k,s,F),$(k,a,F),w(a,o),w(a,l),w(a,u),w(u,c),w(u,d),w(u,_),N(m,_,null),w(_,h),N(g,_,null),w(_,B),w(_,L),w(_,M),N(S,_,null),I=!0,E||(T=[D(e,"click",t[5]),D(o,"click",t[6]),D(_,"submit",gt(t[9]))],E=!0)},p(k,[F]){const he={};F&8&&(he.disabled=k[3]),!p&&F&1&&(p=!0,he.value=k[0],Ee(()=>p=!1)),m.$set(he);const me={};F&8&&(me.disabled=k[3]),!O&&F&2&&(O=!0,me.value=k[1],Ee(()=>O=!1)),g.$set(me);const pe={};F&8&&(pe.disabled=k[3]),F&2048&&(pe.$$scope={dirty:F,ctx:k}),S.$set(pe),(!I||F&4&&y!==(y=`${k[2]?"flex":"hidden"} fixed justify-center items-center inset-0 backdrop-blur-sm `))&&f(a,"class",y)},i(k){I||(P(i.$$.fragment,k),P(m.$$.fragment,k),P(g.$$.fragment,k),P(S.$$.fragment,k),I=!0)},o(k){R(i.$$.fragment,k),R(m.$$.fragment,k),R(g.$$.fragment,k),R(S.$$.fragment,k),I=!1},d(k){k&&v(e),C(i),k&&v(s),k&&v(a),C(m),C(g),C(S),E=!1,V(T)}}}const _n="pixiv";function bn(t,e,n){const i=Z();let r="",s="",a=!1,o=!1;const l=async()=>{const p=new tn(new Re({basePath:Pe.apiBase}));n(3,o=!0);try{const h=await p.pixivAuthPost({login:{username:r,password:s}});lt(h,_n),i("login"),n(2,a=!1),n(0,r=""),n(1,s="")}catch(h){console.log("Failed to login to pixiv",h)}finally{n(3,o=!1)}},u=()=>n(2,a=!a),c=()=>n(2,a=!1);function d(p){r=p,n(0,r)}function _(p){s=p,n(1,s)}return[r,s,a,o,l,u,c,d,_,()=>l()]}class yn extends U{constructor(e){super(),G(this,e,bn,wn,x,{})}}function kn(t){let e,n,i,r,s,a,o;return{c(){e=b("div"),n=b("a"),i=b("img"),Ae(i.src,r=t[0].image)||f(i,"src",r),f(i,"alt","close up of reference"),f(i,"class","max-h-[75vh] mx-auto"),f(n,"href",s=t[0].link),f(n,"target","_blank"),f(e,"class","fixed inset-0 flex items-center backdrop-blur justify-center"),bt(e,"background","rgba(0,0,0,0.75)")},m(l,u){$(l,e,u),w(e,n),w(n,i),a||(o=[D(n,"click",wt(t[2])),D(e,"click",t[3])],a=!0)},p(l,[u]){u&1&&!Ae(i.src,r=l[0].image)&&f(i,"src",r),u&1&&s!==(s=l[0].link)&&f(n,"href",s)},i:J,o:J,d(l){l&&v(e),a=!1,V(o)}}}function vn(t,e,n){let{image:i}=e;const r=Z();function s(o){Xe.call(this,t,o)}const a=()=>r("close");return t.$$set=o=>{"image"in o&&n(0,i=o.image)},[i,r,s,a]}class Tn extends U{constructor(e){super(),G(this,e,vn,kn,x,{image:0})}}function Le(t,e,n){const i=t.slice();return i[7]=e[n],i}function qe(t){let e,n,i,r;function s(){return t[4](t[7])}return{c(){e=b("button"),f(e,"class","w-full bg-cover"),f(e,"style",n=`background-image: url(${t[7].image}); height: ${t[3]}px`)},m(a,o){$(a,e,o),i||(r=D(e,"click",s),i=!0)},p(a,o){t=a,o&9&&n!==(n=`background-image: url(${t[7].image}); height: ${t[3]}px`)&&f(e,"style",n)},d(a){a&&v(e),i=!1,r()}}}function Fe(t){let e,n;return e=new Tn({props:{image:t[2]}}),e.$on("close",t[6]),{c(){q(e.$$.fragment)},m(i,r){N(e,i,r),n=!0},p(i,r){const s={};r&4&&(s.image=i[2]),e.$set(s)},i(i){n||(P(e.$$.fragment,i),n=!0)},o(i){R(e.$$.fragment,i),n=!1},d(i){C(e,i)}}}function $n(t){let e,n,i,r,s=t[0],a=[];for(let l=0;l<s.length;l+=1)a[l]=qe(Le(t,s,l));let o=t[2]&&Fe(t);return{c(){e=b("div");for(let l=0;l<a.length;l+=1)a[l].c();n=A(),o&&o.c(),i=se(),f(e,"class","flex flex-col")},m(l,u){$(l,e,u);for(let c=0;c<a.length;c+=1)a[c].m(e,null);t[5](e),$(l,n,u),o&&o.m(l,u),$(l,i,u),r=!0},p(l,[u]){if(u&13){s=l[0];let c;for(c=0;c<s.length;c+=1){const d=Le(l,s,c);a[c]?a[c].p(d,u):(a[c]=qe(d),a[c].c(),a[c].m(e,null))}for(;c<a.length;c+=1)a[c].d(1);a.length=s.length}l[2]?o?(o.p(l,u),u&4&&P(o,1)):(o=Fe(l),o.c(),P(o,1),o.m(i.parentNode,i)):o&&(Ye(),R(o,1,1,()=>{o=null}),Ze())},i(l){r||(P(o),r=!0)},o(l){R(o),r=!1},d(l){l&&v(e),pt(a,l),t[5](null),l&&v(n),o&&o.d(l),l&&v(i)}}}function Pn(t,e,n){let i,{images:r=[]}=e,s,a;const o=c=>n(2,s=c);function l(c){re[c?"unshift":"push"](()=>{a=c,n(1,a)})}const u=()=>n(2,s=void 0);return t.$$set=c=>{"images"in c&&n(0,r=c.images)},t.$$.update=()=>{t.$$.dirty&2&&n(3,i=(a==null?void 0:a.offsetWidth)*1.1)},[r,a,s,i,o,l,u]}class Rn extends U{constructor(e){super(),G(this,e,Pn,$n,x,{images:0})}}function xe(t){let e,n,i;return{c(){e=b("button"),e.textContent="Load More...",f(e,"class","text-gray-500 text-sm p-8")},m(r,s){$(r,e,s),n||(i=D(e,"click",t[8]),n=!0)},p:J,d(r){r&&v(e),n=!1,i()}}}function Ge(t){let e,n,i;return{c(){e=b("div"),e.textContent="LOADING",f(e,"class","text-gray-500 text-sm p-8")},m(r,s){$(r,e,s),n||(i=D(e,"click",t[9]),n=!0)},p:J,d(r){r&&v(e),n=!1,i()}}}function Sn(t){let e,n,i,r,s,a,o,l,u,c,d,_;o=new Rn({props:{images:t[3]}});let m=t[2]==t[1].LOADED&&xe(t),p=t[2]==t[1].LOADING&&Ge(t);return{c(){e=b("div"),n=b("div"),i=b("span"),r=W(t[0]),s=b("button"),s.textContent="x",a=A(),q(o.$$.fragment),l=A(),m&&m.c(),u=A(),p&&p.c(),f(s,"class","font-bold"),f(n,"class","flex gap-4"),f(e,"class","flex flex-col gap-2 basis-1/6")},m(h,g){$(h,e,g),w(e,n),w(n,i),w(i,r),w(n,s),w(e,a),N(o,e,null),w(e,l),m&&m.m(e,null),w(e,u),p&&p.m(e,null),c=!0,d||(_=D(s,"click",t[7]),d=!0)},p(h,[g]){(!c||g&1)&&$e(r,h[0]);const O={};g&8&&(O.images=h[3]),o.$set(O),h[2]==h[1].LOADED?m?m.p(h,g):(m=xe(h),m.c(),m.m(e,u)):m&&(m.d(1),m=null),h[2]==h[1].LOADING?p?p.p(h,g):(p=Ge(h),p.c(),p.m(e,null)):p&&(p.d(1),p=null)},i(h){c||(P(o.$$.fragment,h),c=!0)},o(h){R(o.$$.fragment,h),c=!1},d(h){h&&v(e),C(o),m&&m.d(),p&&p.d(),d=!1,_()}}}const In=40;function An(t,e,n){let{user:i}=e,{api:r}=e;const s=Z();var a;(function(h){h[h.LOADING=0]="LOADING",h[h.LOADED=1]="LOADED",h[h.FINISHED=2]="FINISHED"})(a||(a={}));let o=a.LOADED,l,u=[];const c=()=>s("remove");de(()=>d(i));const d=async h=>{n(2,o=a.LOADING);const g=await r.listTweetsTweetsUsernameGet({username:h,maxId:l,count:In});if(g.images.length===0){n(2,o=a.FINISHED);return}l=g.images[g.images.length-1].tweetId;const B=g.images.map(L=>({image:L.mediaUrl,link:L.link}));n(3,u=[...u,...B]),n(2,o=a.LOADED)},_=()=>c(),m=()=>d(i),p=()=>d(i);return t.$$set=h=>{"user"in h&&n(0,i=h.user),"api"in h&&n(6,r=h.api)},[i,a,o,u,c,d,r,_,m,p]}class On extends U{constructor(e){super(),G(this,e,An,Sn,x,{user:0,api:6})}}function Ue(t,e,n){const i=t.slice();return i[4]=e[n],i}function Be(t,e){let n,i,r;function s(){return e[3](e[4])}return i=new On({props:{api:e[1],user:e[4]}}),i.$on("remove",s),{key:t,first:null,c(){n=se(),q(i.$$.fragment),this.first=n},m(a,o){$(a,n,o),N(i,a,o),r=!0},p(a,o){e=a;const l={};o&1&&(l.user=e[4]),i.$set(l)},i(a){r||(P(i.$$.fragment,a),r=!0)},o(a){R(i.$$.fragment,a),r=!1},d(a){a&&v(n),C(i,a)}}}function En(t){let e=[],n=new Map,i,r,s=t[0];const a=o=>o[4];for(let o=0;o<s.length;o+=1){let l=Ue(t,s,o),u=a(l);n.set(u,e[o]=Be(u,l))}return{c(){for(let o=0;o<e.length;o+=1)e[o].c();i=se()},m(o,l){for(let u=0;u<e.length;u+=1)e[u].m(o,l);$(o,i,l),r=!0},p(o,[l]){l&7&&(s=o[0],Ye(),e=Pt(e,l,a,1,o,s,n,i.parentNode,$t,Be,i,Ue),Ze())},i(o){if(!r){for(let l=0;l<s.length;l+=1)P(e[l]);r=!0}},o(o){for(let l=0;l<e.length;l+=1)R(e[l]);r=!1},d(o){for(let l=0;l<e.length;l+=1)e[l].d(o);o&&v(i)}}}function Nn(t,e,n){let{users:i}=e;const r=new nn(new Re({basePath:Pe.apiBase})),s=Z(),a=o=>s("remove",{user:o});return t.$$set=o=>{"users"in o&&n(0,i=o.users)},[i,r,s,a]}class Cn extends U{constructor(e){super(),G(this,e,Nn,En,x,{users:0})}}function Dn(t){let e,n,i,r,s;return{c(){e=b("h1"),e.textContent="Twitter",n=A(),i=b("input"),f(e,"class","font-bold text-xl"),f(i,"class","border"),f(i,"placeholder","add user")},m(a,o){$(a,e,o),$(a,n,o),$(a,i,o),Y(i,t[0]),r||(s=[D(i,"input",t[2]),D(i,"keydown",t[1])],r=!0)},p(a,[o]){o&1&&i.value!==a[0]&&Y(i,a[0])},i:J,o:J,d(a){a&&v(e),a&&v(n),a&&v(i),r=!1,V(s)}}}function Ln(t,e,n){let i="";const r=Z(),s=o=>{o.key=="Enter"&&(r("add",{user:i}),n(0,i=""))};function a(){i=this.value,n(0,i)}return[i,s,a]}class qn extends U{constructor(e){super(),G(this,e,Ln,Dn,x,{})}}function Fn(t){let e,n,i,r,s,a,o,l,u,c,d,_,m,p,h,g,O,B,L,M,S,y,I,E;return s=new we({props:{provider:"twitter"}}),s.$on("login",t[6]),o=new we({props:{provider:"reddit"}}),o.$on("login",t[7]),u=new we({props:{provider:"pinterest"}}),u.$on("login",t[8]),d=new yn({}),d.$on("login",t[9]),g=new qn({}),g.$on("add",t[11]),S=new Cn({props:{users:t[1]}}),S.$on("remove",t[12]),{c(){e=b("div"),n=b("header"),i=b("button"),i.textContent="Open Sidebar",r=A(),q(s.$$.fragment),a=A(),q(o.$$.fragment),l=A(),q(u.$$.fragment),c=A(),q(d.$$.fragment),_=A(),m=b("div"),p=b("button"),p.textContent="x",h=A(),q(g.$$.fragment),B=A(),L=b("main"),M=b("div"),q(S.$$.fragment),f(n,"class","flex flex-row justify-center gap-4 border-b p-2"),f(m,"class",O="absolute inset-y-0 left-0 bg-red-300 w-80 "+(t[0]?"block":"hidden")),f(M,"class","flex grow"),f(L,"class","p-4 flex"),f(e,"class","h-full flex flex-col")},m(T,X){$(T,e,X),w(e,n),w(n,i),w(n,r),N(s,n,null),w(n,a),N(o,n,null),w(n,l),N(u,n,null),w(n,c),N(d,n,null),w(e,_),w(e,m),w(m,p),w(m,h),N(g,m,null),w(e,B),w(e,L),w(L,M),N(S,M,null),y=!0,I||(E=[D(i,"click",t[5]),D(p,"click",t[10])],I=!0)},p(T,[X]){(!y||X&1&&O!==(O="absolute inset-y-0 left-0 bg-red-300 w-80 "+(T[0]?"block":"hidden")))&&f(m,"class",O);const j={};X&2&&(j.users=T[1]),S.$set(j)},i(T){y||(P(s.$$.fragment,T),P(o.$$.fragment,T),P(u.$$.fragment,T),P(d.$$.fragment,T),P(g.$$.fragment,T),P(S.$$.fragment,T),y=!0)},o(T){R(s.$$.fragment,T),R(o.$$.fragment,T),R(u.$$.fragment,T),R(d.$$.fragment,T),R(g.$$.fragment,T),R(S.$$.fragment,T),y=!1},d(T){T&&v(e),C(s),C(o),C(u),C(d),C(g),C(S),I=!1,V(E)}}}const _e="sns-manager-twitter-reference-users";function xn(t,e,n){let i=!1,r=[];de(async()=>{n(1,r=JSON.parse(localStorage.getItem(_e)||"[]"))});const s=g=>{n(1,r=r.filter(O=>O!==g)),localStorage.setItem(_e,JSON.stringify(r))},a=g=>{n(1,r=[...r,g]),localStorage.setItem(_e,JSON.stringify(r))},o=()=>{te("twitter"),te("reddit"),te("pixiv"),te("pinterest")};return de(()=>o()),[i,r,s,a,o,()=>n(0,i=!i),()=>o(),()=>o(),()=>o(),()=>o(),()=>n(0,i=!1),g=>a(g.detail.user),g=>s(g.detail.user)]}class Gn extends U{constructor(e){super(),G(this,e,xn,Fn,x,{})}}new Gn({target:document.getElementById("app")});
