"use strict";(self.webpackChunkdokko_filler=self.webpackChunkdokko_filler||[]).push([[2974],{95267:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(70665);function o(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function i(e,t){this._pairs=[],e&&(0,r.A)(e,this,t)}const s=i.prototype;s.append=function(e,t){this._pairs.push([e,t])},s.toString=function(e){const t=e?function(t){return e.call(this,t,o)}:o;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};const a=i},7693:(e,t,n)=>{n.d(t,{A:()=>o});const r={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(r).forEach((([e,t])=>{r[t]=e}));const o=r},12125:(e,t,n)=>{function r(e,t){return function(){return e.apply(t,arguments)}}n.d(t,{A:()=>r})},93967:(e,t,n)=>{n.d(t,{A:()=>s});var r=n(17275),o=n(95267);function i(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function s(e,t,n){if(!t)return e;const s=n&&n.encode||i;r.A.isFunction(n)&&(n={serialize:n});const a=n&&n.serialize;let c;if(c=a?a(t,n):r.A.isURLSearchParams(t)?t.toString():new o.A(t,n).toString(s),c){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+c}return e}},76787:(e,t,n)=>{function r(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}n.d(t,{A:()=>r})},12723:(e,t,n)=>{n.d(t,{A:()=>s});var r=n(38458),o=n(74062),i=n(17275);const s=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let n,s=new AbortController;const a=function(e){if(!n){n=!0,l();const t=e instanceof Error?e:this.reason;s.abort(t instanceof o.A?t:new r.A(t instanceof Error?t.message:t))}};let c=t&&setTimeout((()=>{c=null,a(new o.A(`timeout ${t} of ms exceeded`,o.A.ETIMEDOUT))}),t);const l=()=>{e&&(c&&clearTimeout(c),c=null,e.forEach((e=>{e.unsubscribe?e.unsubscribe(a):e.removeEventListener("abort",a)})),e=null)};e.forEach((e=>e.addEventListener("abort",a)));const{signal:u}=s;return u.unsubscribe=()=>i.A.asap(l),u}}},77887:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(17275);const o=function(e){function t(e,n,o,i){let s=e[i++];if("__proto__"===s)return!0;const a=Number.isFinite(+s),c=i>=e.length;if(s=!s&&r.A.isArray(o)?o.length:s,c)return r.A.hasOwnProp(o,s)?o[s]=[o[s],n]:o[s]=n,!a;o[s]&&r.A.isObject(o[s])||(o[s]=[]);return t(e,n,o[s],i)&&r.A.isArray(o[s])&&(o[s]=function(e){const t={},n=Object.keys(e);let r;const o=n.length;let i;for(r=0;r<o;r++)i=n[r],t[i]=e[i];return t}(o[s])),!a}if(r.A.isFormData(e)&&r.A.isFunction(e.entries)){const n={};return r.A.forEachEntry(e,((e,o)=>{t(function(e){return r.A.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}(e),o,n,0)})),n}return null}},99034:(e,t,n)=>{function r(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}n.d(t,{A:()=>r})},68562:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(17275);function o(e){return r.A.isObject(e)&&!0===e.isAxiosError}},73119:(e,t,n)=>{n.d(t,{A:()=>r});const r=null},43325:(e,t,n)=>{n.d(t,{A:()=>o});const r=n(17275).A.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),o=e=>{const t={};let n,o,i;return e&&e.split("\n").forEach((function(e){i=e.indexOf(":"),n=e.substring(0,i).trim().toLowerCase(),o=e.substring(i+1).trim(),!n||t[n]&&r[n]||("set-cookie"===n?t[n]?t[n].push(o):t[n]=[o]:t[n]=t[n]?t[n]+", "+o:o)})),t}},55579:(e,t,n)=>{function r(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}n.d(t,{A:()=>r})},58940:(e,t,n)=>{n.d(t,{mM:()=>c,Vj:()=>a,C1:()=>s});const r=function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o,i=0,s=0;return t=void 0!==t?t:1e3,function(a){const c=Date.now(),l=r[s];o||(o=c),n[i]=a,r[i]=c;let u=s,f=0;for(;u!==i;)f+=n[u++],u%=e;if(i=(i+1)%e,i===s&&(s=(s+1)%e),c-o<t)return;const d=l&&c-l;return d?Math.round(1e3*f/d):void 0}};const o=function(e,t){let n,r,o=0,i=1e3/t;const s=(t,i=Date.now())=>{o=i,n=null,r&&(clearTimeout(r),r=null),e.apply(null,t)};return[(...e)=>{const t=Date.now(),a=t-o;a>=i?s(e,t):(n=e,r||(r=setTimeout((()=>{r=null,s(n)}),i-a)))},()=>n&&s(n)]};var i=n(17275);const s=(e,t,n=3)=>{let i=0;const s=r(50,250);return o((n=>{const r=n.loaded,o=n.lengthComputable?n.total:void 0,a=r-i,c=s(a);i=r;e({loaded:r,total:o,progress:o?r/o:void 0,bytes:a,rate:c||void 0,estimated:c&&o&&r<=o?(o-r)/c:void 0,event:n,lengthComputable:null!=o,[t?"download":"upload"]:!0})}),n)},a=(e,t)=>{const n=null!=e;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},c=e=>(...t)=>i.A.asap((()=>e(...t)))},5434:(e,t,n)=>{n.d(t,{A:()=>p});var r=n(20014),o=n(17275);const i=r.A.hasStandardBrowserEnv?(s=new URL(r.A.origin),a=r.A.navigator&&/(msie|trident)/i.test(r.A.navigator.userAgent),e=>(e=new URL(e,r.A.origin),s.protocol===e.protocol&&s.host===e.host&&(a||s.port===e.port))):()=>!0;var s,a;const c=r.A.hasStandardBrowserEnv?{write(e,t,n,r,i,s){const a=[e+"="+encodeURIComponent(t)];o.A.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),o.A.isString(r)&&a.push("path="+r),o.A.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read:()=>null,remove(){}};var l=n(88262),u=n(44662),f=n(7110),d=n(93967);const p=e=>{const t=(0,u.A)({},e);let n,{data:s,withXSRFToken:a,xsrfHeaderName:p,xsrfCookieName:A,headers:h,auth:m}=t;if(t.headers=h=f.A.from(h),t.url=(0,d.A)((0,l.A)(t.baseURL,t.url),e.params,e.paramsSerializer),m&&h.set("Authorization","Basic "+btoa((m.username||"")+":"+(m.password?unescape(encodeURIComponent(m.password)):""))),o.A.isFormData(s))if(r.A.hasStandardBrowserEnv||r.A.hasStandardBrowserWebWorkerEnv)h.setContentType(void 0);else if(!1!==(n=h.getContentType())){const[e,...t]=n?n.split(";").map((e=>e.trim())).filter(Boolean):[];h.setContentType([e||"multipart/form-data",...t].join("; "))}if(r.A.hasStandardBrowserEnv&&(a&&o.A.isFunction(a)&&(a=a(t)),a||!1!==a&&i(t.url))){const e=p&&A&&c.read(A);e&&h.set(p,e)}return t}},20605:(e,t,n)=>{function r(e){return function(t){return e.apply(null,t)}}n.d(t,{A:()=>r})},70665:(e,t,n)=>{n.d(t,{A:()=>u});var r=n(17275),o=n(74062),i=n(73119);function s(e){return r.A.isPlainObject(e)||r.A.isArray(e)}function a(e){return r.A.endsWith(e,"[]")?e.slice(0,-2):e}function c(e,t,n){return e?e.concat(t).map((function(e,t){return e=a(e),!n&&t?"["+e+"]":e})).join(n?".":""):t}const l=r.A.toFlatObject(r.A,{},null,(function(e){return/^is[A-Z]/.test(e)}));const u=function(e,t,n){if(!r.A.isObject(e))throw new TypeError("target must be an object");t=t||new(i.A||FormData);const u=(n=r.A.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return!r.A.isUndefined(t[e])}))).metaTokens,f=n.visitor||m,d=n.dots,p=n.indexes,A=(n.Blob||"undefined"!=typeof Blob&&Blob)&&r.A.isSpecCompliantForm(t);if(!r.A.isFunction(f))throw new TypeError("visitor must be a function");function h(e){if(null===e)return"";if(r.A.isDate(e))return e.toISOString();if(!A&&r.A.isBlob(e))throw new o.A("Blob is not supported. Use a Buffer instead.");return r.A.isArrayBuffer(e)||r.A.isTypedArray(e)?A&&"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}function m(e,n,o){let i=e;if(e&&!o&&"object"==typeof e)if(r.A.endsWith(n,"{}"))n=u?n:n.slice(0,-2),e=JSON.stringify(e);else if(r.A.isArray(e)&&function(e){return r.A.isArray(e)&&!e.some(s)}(e)||(r.A.isFileList(e)||r.A.endsWith(n,"[]"))&&(i=r.A.toArray(e)))return n=a(n),i.forEach((function(e,o){!r.A.isUndefined(e)&&null!==e&&t.append(!0===p?c([n],o,d):null===p?n:n+"[]",h(e))})),!1;return!!s(e)||(t.append(c(o,n,d),h(e)),!1)}const y=[],b=Object.assign(l,{defaultVisitor:m,convertValue:h,isVisitable:s});if(!r.A.isObject(e))throw new TypeError("data must be an object");return function e(n,o){if(!r.A.isUndefined(n)){if(-1!==y.indexOf(n))throw Error("Circular reference detected in "+o.join("."));y.push(n),r.A.forEach(n,(function(n,i){!0===(!(r.A.isUndefined(n)||null===n)&&f.call(t,n,r.A.isString(i)?i.trim():i,o,b))&&e(n,o?o.concat(i):[i])})),y.pop()}}(e),t}},31076:(e,t,n)=>{n.d(t,{A:()=>s});var r=n(17275),o=n(70665),i=n(20014);function s(e,t){return(0,o.A)(e,new i.A.classes.URLSearchParams,Object.assign({visitor:function(e,t,n,o){return i.A.isNode&&r.A.isBuffer(e)?(this.append(t,e.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)}},t))}},1791:(e,t,n)=>{n.d(t,{E9:()=>i});const r=function*(e,t){let n=e.byteLength;if(!t||n<t)return void(yield e);let r,o=0;for(;o<n;)r=o+t,yield e.slice(o,r),o=r},o=async function*(e){if(e[Symbol.asyncIterator])return void(yield*e);const t=e.getReader();try{for(;;){const{done:e,value:n}=await t.read();if(e)break;yield n}}finally{await t.cancel()}},i=(e,t,n,i)=>{const s=async function*(e,t){for await(const n of o(e))yield*r(n,t)}(e,t);let a,c=0,l=e=>{a||(a=!0,i&&i(e))};return new ReadableStream({async pull(e){try{const{done:t,value:r}=await s.next();if(t)return l(),void e.close();let o=r.byteLength;if(n){let e=c+=o;n(e)}e.enqueue(new Uint8Array(r))}catch(e){throw l(e),e}},cancel:e=>(l(e),s.return())},{highWaterMark:2})}},13390:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(89888),o=n(74062);const i={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{i[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));const s={};i.transitional=function(e,t,n){return(i,a,c)=>{if(!1===e)throw new o.A(function(e,t){return"[Axios v"+r.x+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}(a," has been removed"+(t?" in "+t:"")),o.A.ERR_DEPRECATED);return t&&!s[a]&&(s[a]=!0),!e||e(i,a,c)}},i.spelling=function(e){return(e,t)=>!0};const a={assertOptions:function(e,t,n){if("object"!=typeof e)throw new o.A("options must be an object",o.A.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let i=r.length;for(;i-- >0;){const s=r[i],a=t[s];if(a){const t=e[s],n=void 0===t||a(t,s,e);if(!0!==n)throw new o.A("option "+s+" must be "+n,o.A.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new o.A("Unknown option "+s,o.A.ERR_BAD_OPTION)}},validators:i}},20014:(e,t,n)=>{n.d(t,{A:()=>f});var r={};n.r(r),n.d(r,{hasBrowserEnv:()=>s,hasStandardBrowserEnv:()=>c,hasStandardBrowserWebWorkerEnv:()=>l,navigator:()=>a,origin:()=>u});var o=n(95267);const i={isBrowser:!0,classes:{URLSearchParams:"undefined"!=typeof URLSearchParams?URLSearchParams:o.A,FormData:"undefined"!=typeof FormData?FormData:null,Blob:"undefined"!=typeof Blob?Blob:null},protocols:["http","https","file","blob","url","data"]},s="undefined"!=typeof window&&"undefined"!=typeof document,a="object"==typeof navigator&&navigator||void 0,c=s&&(!a||["ReactNative","NativeScript","NS"].indexOf(a.product)<0),l="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"==typeof self.importScripts,u=s&&window.location.href||"http://localhost",f={...r,...i}},17275:(e,t,n)=>{n.d(t,{A:()=>$});var r=n(12125);const{toString:o}=Object.prototype,{getPrototypeOf:i}=Object,s=(a=Object.create(null),e=>{const t=o.call(e);return a[t]||(a[t]=t.slice(8,-1).toLowerCase())});var a;const c=e=>(e=e.toLowerCase(),t=>s(t)===e),l=e=>t=>typeof t===e,{isArray:u}=Array,f=l("undefined");const d=c("ArrayBuffer");const p=l("string"),A=l("function"),h=l("number"),m=e=>null!==e&&"object"==typeof e,y=e=>{if("object"!==s(e))return!1;const t=i(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)},b=c("Date"),g=c("File"),w=c("Blob"),v=c("FileList"),O=c("URLSearchParams"),[S,E,R,j]=["ReadableStream","Request","Response","Headers"].map(c);function F(e,t,{allOwnKeys:n=!1}={}){if(null==e)return;let r,o;if("object"!=typeof e&&(e=[e]),u(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{const o=n?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let s;for(r=0;r<i;r++)s=o[r],t.call(null,e[s],s,e)}}function T(e,t){t=t.toLowerCase();const n=Object.keys(e);let r,o=n.length;for(;o-- >0;)if(r=n[o],t===r.toLowerCase())return r;return null}const B="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global,C=e=>!f(e)&&e!==B;const U=(L="undefined"!=typeof Uint8Array&&i(Uint8Array),e=>L&&e instanceof L);var L;const P=c("HTMLFormElement"),x=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),k=c("RegExp"),D=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};F(n,((n,o)=>{let i;!1!==(i=t(n,o,e))&&(r[o]=i||n)})),Object.defineProperties(e,r)},N="abcdefghijklmnopqrstuvwxyz",I="0123456789",M={DIGIT:I,ALPHA:N,ALPHA_DIGIT:N+N.toUpperCase()+I};const _=c("AsyncFunction"),q=(z="function"==typeof setImmediate,H=A(B.postMessage),z?setImmediate:H?(V=`axios@${Math.random()}`,W=[],B.addEventListener("message",(({source:e,data:t})=>{e===B&&t===V&&W.length&&W.shift()()}),!1),e=>{W.push(e),B.postMessage(V,"*")}):e=>setTimeout(e));var z,H,V,W;const G="undefined"!=typeof queueMicrotask?queueMicrotask.bind(B):"undefined"!=typeof process&&process.nextTick||q,$={isArray:u,isArrayBuffer:d,isBuffer:function(e){return null!==e&&!f(e)&&null!==e.constructor&&!f(e.constructor)&&A(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{let t;return e&&("function"==typeof FormData&&e instanceof FormData||A(e.append)&&("formdata"===(t=s(e))||"object"===t&&A(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&d(e.buffer),t},isString:p,isNumber:h,isBoolean:e=>!0===e||!1===e,isObject:m,isPlainObject:y,isReadableStream:S,isRequest:E,isResponse:R,isHeaders:j,isUndefined:f,isDate:b,isFile:g,isBlob:w,isRegExp:k,isFunction:A,isStream:e=>m(e)&&A(e.pipe),isURLSearchParams:O,isTypedArray:U,isFileList:v,forEach:F,merge:function e(){const{caseless:t}=C(this)&&this||{},n={},r=(r,o)=>{const i=t&&T(n,o)||o;y(n[i])&&y(r)?n[i]=e(n[i],r):y(r)?n[i]=e({},r):u(r)?n[i]=r.slice():n[i]=r};for(let e=0,t=arguments.length;e<t;e++)arguments[e]&&F(arguments[e],r);return n},extend:(e,t,n,{allOwnKeys:o}={})=>(F(t,((t,o)=>{n&&A(t)?e[o]=(0,r.A)(t,n):e[o]=t}),{allOwnKeys:o}),e),trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},toFlatObject:(e,t,n,r)=>{let o,s,a;const c={};if(t=t||{},null==e)return t;do{for(o=Object.getOwnPropertyNames(e),s=o.length;s-- >0;)a=o[s],r&&!r(a,e,t)||c[a]||(t[a]=e[a],c[a]=!0);e=!1!==n&&i(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:s,kindOfTest:c,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return-1!==r&&r===n},toArray:e=>{if(!e)return null;if(u(e))return e;let t=e.length;if(!h(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1])}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:P,hasOwnProperty:x,hasOwnProp:x,reduceDescriptors:D,freezeMethods:e=>{D(e,((t,n)=>{if(A(e)&&-1!==["arguments","caller","callee"].indexOf(n))return!1;const r=e[n];A(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")}))}))},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach((e=>{n[e]=!0}))};return u(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(e,t,n){return t.toUpperCase()+n})),noop:()=>{},toFiniteNumber:(e,t)=>null!=e&&Number.isFinite(e=+e)?e:t,findKey:T,global:B,isContextDefined:C,ALPHABET:M,generateString:(e=16,t=M.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n},isSpecCompliantForm:function(e){return!!(e&&A(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])},toJSONObject:e=>{const t=new Array(10),n=(e,r)=>{if(m(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[r]=e;const o=u(e)?[]:{};return F(e,((e,t)=>{const i=n(e,r+1);!f(i)&&(o[t]=i)})),t[r]=void 0,o}}return e};return n(e,0)},isAsyncFn:_,isThenable:e=>e&&(m(e)||A(e))&&A(e.then)&&A(e.catch),setImmediate:q,asap:G}}}]);