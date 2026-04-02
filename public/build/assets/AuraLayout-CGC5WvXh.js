import{r,q as L,j as e,Y as g,u as S}from"./app-S-wbH596.js";/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=(...s)=>s.filter((t,a,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===a).join(" ").trim();/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=s=>s.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,o)=>o?o.toUpperCase():a.toLowerCase());/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=s=>{const t=U(s);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var v={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=s=>{for(const t in s)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},I=r.createContext({}),R=()=>r.useContext(I),H=r.forwardRef(({color:s,size:t,strokeWidth:a,absoluteStrokeWidth:o,className:l="",children:c,iconNode:x,...i},m)=>{const{size:u=24,strokeWidth:h=2,absoluteStrokeWidth:k=!1,color:y="currentColor",className:j=""}=R()??{},N=o??k?Number(a??h)*24/Number(t??u):a??h;return r.createElement("svg",{ref:m,...v,width:t??u??v.width,height:t??u??v.height,stroke:s??y,strokeWidth:N,className:E("lucide",j,l),...!c&&!W(i)&&{"aria-hidden":"true"},...i},[...x.map(([_,p])=>r.createElement(_,p)),...Array.isArray(c)?c:[c]])});/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=(s,t)=>{const a=r.forwardRef(({className:o,...l},c)=>r.createElement(H,{ref:c,iconNode:t,className:E(`lucide-${z($(s))}`,`lucide-${s}`,o),...l}));return a.displayName=$(s),a};/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],q=n("chevron-down",O);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],V=n("house",D);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]],F=n("library",B);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Z=n("log-out",Y);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]],G=n("music",K);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],A=n("pause",J);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],M=n("play",Q);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],X=n("plus",T);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],te=n("search",ee);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=[["path",{d:"M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",key:"15892j"}],["path",{d:"M3 20V4",key:"1ptbpl"}]],ae=n("skip-back",se);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["path",{d:"M21 4v16",key:"7j8fe9"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",key:"zs4d6"}]],re=n("skip-forward",oe);/**
 * @license lucide-react v1.7.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],ie=n("user",ne);function le(){const{url:s}=L(),t=[{name:"Home",icon:V,route:"/"},{name:"Search",icon:te,route:"#"},{name:"Library",icon:F,route:"/playlists"},{name:"Upload",icon:X,route:"/songs/create"}];return e.jsx("div",{className:"fixed bottom-6 left-1/2 -translate-x-1/2 z-50",children:e.jsx("div",{className:"glass-panel rounded-full px-6 py-4 flex items-center space-x-8",children:t.map(a=>{const o=a.icon,l=s===a.route;return e.jsxs(g,{href:a.route,className:`flex flex-col items-center justify-center group relative transition-transform hover:scale-110 ${l?"text-white":"text-white/50"}`,children:[e.jsx(o,{className:`w-6 h-6 transition-colors duration-300 ${l?"text-white":"group-hover:text-white/80"}`}),l&&e.jsx("span",{className:"absolute -bottom-3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]"})]},a.name)})})})}function ce(){var h;const{currentSong:s,isPlaying:t,togglePlay:a,playNext:o,playPrev:l,progress:c,duration:x}=S(),[i,m]=r.useState(!1);if(!s)return null;const u=x?c/x*100:0;return e.jsxs("div",{className:"fixed bottom-28 right-8 z-50 transition-all duration-500 ease-in-out",onMouseEnter:()=>m(!0),onMouseLeave:()=>m(!1),children:[e.jsxs("div",{className:`glass-panel overflow-hidden transition-all duration-500 flex items-center ${i?"w-80 rounded-[30px] p-4":"w-20 h-20 rounded-[40px] p-1.5 shadow-[0_0_40px_rgba(29,185,84,0.3)]"}`,children:[e.jsxs("div",{onClick:a,className:`relative flex-shrink-0 cursor-pointer transition-all duration-500 ${i?"w-16 h-16 rounded-2xl shadow-lg":"w-17 h-17 rounded-full"} overflow-hidden bg-black/40 flex items-center justify-center`,children:[s.cover_url?e.jsx("img",{src:s.cover_url,className:`w-full h-full object-cover transition-all duration-[2000ms] ${!i&&t?"animate-[spin_4s_linear_infinite]":"scale-105"}`}):e.jsx(G,{className:"w-6 h-6 text-white/50"}),!i&&e.jsx("div",{className:"absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity",children:t?e.jsx(A,{className:"w-6 h-6 fill-white"}):e.jsx(M,{className:"w-6 h-6 fill-white translate-x-0.5"})})]}),e.jsxs("div",{className:`flex flex-col ml-4 transition-opacity duration-300 overflow-hidden whitespace-nowrap ${i?"opacity-100 flex-1":"opacity-0 w-0"}`,children:[e.jsx("h4",{className:"font-bold text-white text-lg truncate aura-text leading-tight",children:s.title}),e.jsx("p",{className:"text-sm text-white/50 truncate font-medium",children:((h=s.user)==null?void 0:h.name)||"Unknown Artist"}),e.jsxs("div",{className:"flex items-center space-x-5 mt-2",children:[e.jsx("button",{onClick:l,className:"text-white/40 hover:text-white transition",children:e.jsx(ae,{className:"w-5 h-5 fill-current"})}),e.jsx("button",{onClick:a,className:"text-white hover:scale-110 transition drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]",children:t?e.jsx(A,{className:"w-7 h-7 fill-current"}):e.jsx(M,{className:"w-7 h-7 fill-current"})}),e.jsx("button",{onClick:o,className:"text-white/40 hover:text-white transition",children:e.jsx(re,{className:"w-5 h-5 fill-current"})})]})]}),!i&&e.jsxs("svg",{className:"absolute inset-0 w-20 h-20 rotate-[-90deg] pointer-events-none",children:[e.jsx("circle",{cx:"40",cy:"40",r:"38",fill:"none",stroke:"rgba(255,255,255,0.05)",strokeWidth:"2.5"}),e.jsx("circle",{cx:"40",cy:"40",r:"38",fill:"none",stroke:"#1db954",strokeWidth:"2.5",strokeDasharray:"239",strokeDashoffset:239-239*u/100,className:"transition-all duration-300"})]})]}),i&&e.jsx("div",{className:"absolute bottom-1 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full bg-gradient-to-r from-[#1db954] to-[#29ca9c]",style:{width:`${u}%`}})})]})}function ue({children:s}){const{auth:t}=L().props,{currentSong:a,isPlaying:o,togglePlay:l,progress:c,duration:x,seek:i,volume:m,setVolume:u,playNext:h,playPrev:k,isShuffle:y,setIsShuffle:j,isRepeat:N,setIsRepeat:_}=S(),[p,f]=r.useState(!1),b=r.useRef(null),[C,P]=r.useState(!1);return r.useEffect(()=>{const d=()=>{if(C)return;const w=new(window.AudioContext||window.webkitAudioContext);w.state==="suspended"&&w.resume(),P(!0),document.removeEventListener("click",d),document.removeEventListener("keydown",d)};return document.addEventListener("click",d),document.addEventListener("keydown",d),()=>{document.removeEventListener("click",d),document.removeEventListener("keydown",d)}},[C]),r.useEffect(()=>{const d=w=>{b.current&&!b.current.contains(w.target)&&f(!1)};return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[]),e.jsxs("div",{className:"min-h-screen font-sans selection:bg-[#1db954] selection:text-black antialiased relative",children:[t.user&&e.jsxs("div",{className:"fixed top-8 right-8 z-[100]",ref:b,children:[e.jsxs("button",{onClick:()=>f(!p),className:"glass-panel p-2 pl-4 pr-3 rounded-full flex items-center space-x-3 hover:scale-105 active:scale-95 transition-all shadow-xl group border-white/5 hover:border-white/20",children:[e.jsx("span",{className:"text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white transition",children:t.user.name.split(" ")[0]}),e.jsx("div",{className:"w-8 h-8 rounded-full bg-gradient-to-br from-[#1db954] to-emerald-700 flex items-center justify-center text-black font-black text-xs shadow-[0_0_20px_rgba(29,185,84,0.3)]",children:t.user.name[0].toUpperCase()}),e.jsx(q,{className:`w-4 h-4 text-white/20 transition-transform duration-300 ${p?"rotate-180":""}`})]}),p&&e.jsxs("div",{className:"absolute top-full mt-4 right-0 w-64 glass-panel rounded-[2rem] border border-white/10 p-3 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200",children:[e.jsxs("div",{className:"px-4 py-4 mb-2 border-b border-white/5",children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-1",children:"Signed in as"}),e.jsx("p",{className:"text-sm font-bold truncate",children:t.user.email})]}),e.jsxs(g,{href:route("profile.show"),className:"w-full flex items-center space-x-3 px-4 py-4 rounded-2xl hover:bg-white/5 transition group",onClick:()=>f(!1),children:[e.jsx("div",{className:"p-2 rounded-xl bg-white/5 group-hover:bg-[#1db954]/20 transition",children:e.jsx(ie,{className:"w-4 h-4 text-white/40 group-hover:text-[#1db954]"})}),e.jsx("span",{className:"text-sm font-bold",children:"Το Προφίλ μου"})]}),e.jsxs(g,{href:route("logout"),method:"post",as:"button",className:"w-full flex items-center space-x-3 px-4 py-4 rounded-2xl hover:bg-rose-500/10 transition group text-left",onClick:()=>f(!1),children:[e.jsx("div",{className:"p-2 rounded-xl bg-white/5 group-hover:bg-rose-500/20 transition",children:e.jsx(Z,{className:"w-4 h-4 text-white/40 group-hover:text-rose-500"})}),e.jsx("span",{className:"text-sm font-bold",children:"Αποσύνδεση"})]})]})]}),e.jsx("div",{className:"aura-bg"}),e.jsx("div",{className:"aura-blob blob-1"}),e.jsx("div",{className:"aura-blob blob-2"}),e.jsx("header",{className:"absolute top-0 w-full p-8 flex justify-between items-center z-20 pointer-events-none",children:e.jsxs("div",{className:"text-2xl font-black tracking-tighter text-white drop-shadow-xl flex items-center",children:[e.jsx("div",{className:"w-8 h-8 rounded-full bg-gradient-to-tr from-[#1db954] to-purple-500 mr-2 animate-pulse shadow-[0_0_20px_rgba(29,185,84,0.5)]"}),"Aura",e.jsx("span",{className:"text-white/30 font-light",children:"Play"})]})}),e.jsx("main",{className:"relative z-10 pt-24 pb-40 min-h-screen",children:s}),e.jsx(ce,{}),e.jsx(le,{})]})}export{ue as A,G as M,X as P,te as S,ie as U,A as a,M as b,n as c};
