if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const o=e=>i(e,t),l={module:{uri:t},exports:c,require:o};s[t]=Promise.all(n.map((e=>l[e]||o(e)))).then((e=>(r(...e),c)))}}define(["./workbox-21effbb6"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-60c2ec99.js",revision:null},{url:"assets/index-e4aea835.css",revision:null},{url:"index.html",revision:"b52cc7901505099905d56b3893745291"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"./tasks.png",revision:"440ff227305d5771bc2a3a45be948c29"},{url:"./tasks2.png",revision:"8f7fb0102fbfa1fca7ecb505c6005191"},{url:"manifest.webmanifest",revision:"22e8d80ce35b3aaa43e53b6b162ff856"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({url:e})=>e.pathname.startsWith("/api")),new e.NetworkFirst({cacheName:"api-Cache",plugins:[new e.CacheableResponsePlugin({statuses:[0,200,201]})]}),"GET")}));
