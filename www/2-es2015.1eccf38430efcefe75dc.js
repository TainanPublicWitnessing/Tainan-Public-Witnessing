(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{Ouoq:function(t,e,s){"use strict";var r=s("2Vo4"),i=s("XNiG"),o=s("lJxs"),h=s("bCcq");class a{}var n=s("8Y7J"),c=s("Xr7G"),l=s("SVse");s.d(e,"a",function(){return f});let f=(()=>{class t{constructor(t,e){this.firestore=t,this.datepipe=e,this.all_users_name=[],this.user=new a,this.user$=new r.a(void 0),this.mess=new i.a}getUsersByCongregation(t){return this.firestore.collection("User",e=>e.where("congregation","==",t)).get().pipe(Object(o.a)(t=>{let e=[],s=t.docs.length;for(let r=0;r<s;r++)e[r]=t.docs[r].data().name;return e}))}getUsersDataByCongregation(t){return this.firestore.collection("User",e=>e.where("congregation","==",t)).get().pipe(Object(o.a)(t=>{let e=[],s=t.docs.length;for(let r=0;r<s;r++){let s=t.docs[r].data();s.id=t.docs[r].id,e.push(s)}return e}))}getUsersDataById(t){return this.firestore.doc("User/"+t).snapshotChanges().pipe(Object(o.a)(t=>t.payload.data()))}getAllUsersName(){return this.firestore.collection("User").doc("metadata").get().pipe(Object(o.a)(t=>t.data().primary_keys))}addPersonalShift(t,e,s,r){let i=this.datepipe.transform(e,"yyyyMM"),a=["\u9031\u65e5","\u9031\u4e00","\u9031\u4e8c","\u9031\u4e09","\u9031\u56db","\u9031\u4e94","\u9031\u516d"][new Date(e).getDay()],n=this.firestore.collection("User").doc(Object(h.sha256)(t)).collection("MonthlyData").doc(i);n.get().pipe(Object(o.a)(t=>t.get("personal_shift"))).subscribe(t=>{t.some(function(t){return t.date==this},e)||(t.push({date:e,day:a,shift_title:s,site:r}),t.sort(function(t,e){return t.date.localeCompare(e.date)}),n.set({personal_shift:t}))})}deletePersonalShift(t,e){let s=this.datepipe.transform(e,"yyyyMM"),r=this.firestore.collection("User").doc(Object(h.sha256)(t)).collection("MonthlyData").doc(s);r.get().pipe(Object(o.a)(t=>t.get("personal_shift"))).subscribe(t=>{let s=t.findIndex(function(t){return t.date==this},e);-1!=s&&(t.splice(s,1),r.set({personal_shift:t}))})}login(t,e){return this.firestore.collection("User").doc(Object(h.sha256)(t)).get().pipe(Object(o.a)(t=>t.data().password==Object(h.sha256)(e)&&(this.user.name=t.data().name,this.user.congregation=t.data().congregation,this.user.authority=t.data().authority,this.user$.next(this.user),this.mess.next(this.user),!0)))}addUser(){this.firestore.collection("User").doc(Object(h.sha256)("\u9ec3\u67d4\u6ea6")).set({name:"\u9ec3\u67d4\u6ea6",sex:"\u59ca\u59b9",position:"---",congregation:"\u5b89\u5e73\u5340\u5357\u90e8",identity:"\u50b3\u9053\u54e1",marriage:"\u7368\u8eab",email:"do3450503@gm.tut.edu.tw",cellphone:"0938-561-758",phone:"(06)297-7558",address:"\u53f0\u5357\u5e02\u6c38\u83ef\u4e8c\u885741\u5df750\u865f7\u6a13\u4e4b3",birth_date:"1995-9-12",baptize_date:"2013-12-13",language:"\u4e2d\u6587/\u95a9\u5357\u8a9e",note:"",authority:"user",password:"fff8c56f0291ea5539fa5dcd185676153700582554d6135d8e00288a9747ebc8"})}transUser(){this.firestore.collection("User").doc(Object(h.sha256)("\u5433\u7d20\u78a7")).collection("MonthlyData").doc("201910").get().pipe(Object(o.a)(t=>t.data().personal_shift)).subscribe(t=>{console.log(t),this.firestore.collection("User").doc(Object(h.sha256)("\u4f55\u7d20\u78a7")).collection("MonthlyData").doc("201910").set({personal_shift:t})})}getAllUser(){this.firestore.collection("User").get().pipe(Object(o.a)(t=>{let e=[],s=t.docs.length;for(let r=0;r<s;r++)e.push(t.docs[r].data().name);return e})).subscribe(t=>{t.sort(),console.log(t),this.firestore.collection("User").doc("metadata").set({primary_keys:t})})}}return t.ngInjectableDef=n.Pb({factory:function(){return new t(n.Qb(c.a),n.Qb(l.d))},token:t,providedIn:"root"}),t})()},PDX0:function(t,e){(function(e){t.exports=e}).call(this,{})},bCcq:function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var ERROR="input is invalid type",WINDOW="object"==typeof window,root=WINDOW?window:{};root.JS_SHA256_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"==typeof self,NODE_JS=!root.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS?root=global:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_SHA256_NO_COMMON_JS&&"object"==typeof module&&module.exports,AMD=__webpack_require__("PDX0"),ARRAY_BUFFER=!root.JS_SHA256_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[-2147483648,8388608,32768,128],SHIFT=[24,16,8,0],K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],OUTPUT_TYPES=["hex","array","digest","arrayBuffer"],blocks=[];!root.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!ARRAY_BUFFER||!root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var createOutputMethod=function(t,e){return function(s){return new Sha256(e,!0).update(s)[t]()}},createMethod=function(t){var e=createOutputMethod("hex",t);NODE_JS&&(e=nodeWrap(e,t)),e.create=function(){return new Sha256(t)},e.update=function(t){return e.create().update(t)};for(var s=0;s<OUTPUT_TYPES.length;++s){var r=OUTPUT_TYPES[s];e[r]=createOutputMethod(r,t)}return e},nodeWrap=function(method,is224){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),algorithm=is224?"sha224":"sha256",nodeMethod=function(t){if("string"==typeof t)return crypto.createHash(algorithm).update(t,"utf8").digest("hex");if(null==t)throw new Error(ERROR);return t.constructor===ArrayBuffer&&(t=new Uint8Array(t)),Array.isArray(t)||ArrayBuffer.isView(t)||t.constructor===Buffer?crypto.createHash(algorithm).update(new Buffer(t)).digest("hex"):method(t)};return nodeMethod},createHmacOutputMethod=function(t,e){return function(s,r){return new HmacSha256(s,e,!0).update(r)[t]()}},createHmacMethod=function(t){var e=createHmacOutputMethod("hex",t);e.create=function(e){return new HmacSha256(e,t)},e.update=function(t,s){return e.create(t).update(s)};for(var s=0;s<OUTPUT_TYPES.length;++s){var r=OUTPUT_TYPES[s];e[r]=createHmacOutputMethod(r,t)}return e};function Sha256(t,e){e?(blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function HmacSha256(t,e,s){var r,i=typeof t;if("string"===i){var o,h=[],a=t.length,n=0;for(r=0;r<a;++r)(o=t.charCodeAt(r))<128?h[n++]=o:o<2048?(h[n++]=192|o>>6,h[n++]=128|63&o):o<55296||o>=57344?(h[n++]=224|o>>12,h[n++]=128|o>>6&63,h[n++]=128|63&o):(o=65536+((1023&o)<<10|1023&t.charCodeAt(++r)),h[n++]=240|o>>18,h[n++]=128|o>>12&63,h[n++]=128|o>>6&63,h[n++]=128|63&o);t=h}else{if("object"!==i)throw new Error(ERROR);if(null===t)throw new Error(ERROR);if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||ARRAY_BUFFER&&ArrayBuffer.isView(t)))throw new Error(ERROR)}t.length>64&&(t=new Sha256(e,!0).update(t).array());var c=[],l=[];for(r=0;r<64;++r){var f=t[r]||0;c[r]=92^f,l[r]=54^f}Sha256.call(this,e,s),this.update(l),this.oKeyPad=c,this.inner=!0,this.sharedMemory=s}Sha256.prototype.update=function(t){if(!this.finalized){var e,s=typeof t;if("string"!==s){if("object"!==s)throw new Error(ERROR);if(null===t)throw new Error(ERROR);if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||ARRAY_BUFFER&&ArrayBuffer.isView(t)))throw new Error(ERROR);e=!0}for(var r,i,o=0,h=t.length,a=this.blocks;o<h;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),e)for(i=this.start;o<h&&i<64;++o)a[i>>2]|=t[o]<<SHIFT[3&i++];else for(i=this.start;o<h&&i<64;++o)(r=t.charCodeAt(o))<128?a[i>>2]|=r<<SHIFT[3&i++]:r<2048?(a[i>>2]|=(192|r>>6)<<SHIFT[3&i++],a[i>>2]|=(128|63&r)<<SHIFT[3&i++]):r<55296||r>=57344?(a[i>>2]|=(224|r>>12)<<SHIFT[3&i++],a[i>>2]|=(128|r>>6&63)<<SHIFT[3&i++],a[i>>2]|=(128|63&r)<<SHIFT[3&i++]):(r=65536+((1023&r)<<10|1023&t.charCodeAt(++o)),a[i>>2]|=(240|r>>18)<<SHIFT[3&i++],a[i>>2]|=(128|r>>12&63)<<SHIFT[3&i++],a[i>>2]|=(128|r>>6&63)<<SHIFT[3&i++],a[i>>2]|=(128|63&r)<<SHIFT[3&i++]);this.lastByteIndex=i,this.bytes+=i-this.start,i>=64?(this.block=a[16],this.start=i-64,this.hash(),this.hashed=!0):this.start=i}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Sha256.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[16]=this.block,t[e>>2]|=EXTRA[3&e],this.block=t[16],e>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},Sha256.prototype.hash=function(){var t,e,s,r,i,o,h=this.h0,a=this.h1,n=this.h2,c=this.h3,l=this.h4,f=this.h5,d=this.h6,u=this.h7,p=this.blocks;for(t=16;t<64;++t)p[t]=p[t-16]+(((e=p[t-15])>>>7|e<<25)^(e>>>18|e<<14)^e>>>3)+p[t-7]+(((e=p[t-2])>>>17|e<<15)^(e>>>19|e<<13)^e>>>10)<<0;for(o=a&n,t=0;t<64;t+=4)this.first?(this.is224?(s=300032,u=(e=p[0]-1413257819)-150054599<<0,c=e+24177077<<0):(s=704751109,u=(e=p[0]-210244248)-1521486534<<0,c=e+143694565<<0),this.first=!1):(u=c+(e=u+((l>>>6|l<<26)^(l>>>11|l<<21)^(l>>>25|l<<7))+(l&f^~l&d)+K[t]+p[t])<<0,c=e+(((h>>>2|h<<30)^(h>>>13|h<<19)^(h>>>22|h<<10))+((s=h&a)^h&n^o))<<0),d=n+(e=d+((u>>>6|u<<26)^(u>>>11|u<<21)^(u>>>25|u<<7))+(u&l^~u&f)+K[t+1]+p[t+1])<<0,n=e+(((c>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10))+((r=c&h)^c&a^s))<<0,f=a+(e=f+((d>>>6|d<<26)^(d>>>11|d<<21)^(d>>>25|d<<7))+(d&u^~d&l)+K[t+2]+p[t+2])<<0,a=e+(((n>>>2|n<<30)^(n>>>13|n<<19)^(n>>>22|n<<10))+((i=n&c)^n&h^r))<<0,l=h+(e=l+((f>>>6|f<<26)^(f>>>11|f<<21)^(f>>>25|f<<7))+(f&d^~f&u)+K[t+3]+p[t+3])<<0,h=e+(((a>>>2|a<<30)^(a>>>13|a<<19)^(a>>>22|a<<10))+((o=a&n)^a&c^i))<<0;this.h0=this.h0+h<<0,this.h1=this.h1+a<<0,this.h2=this.h2+n<<0,this.h3=this.h3+c<<0,this.h4=this.h4+l<<0,this.h5=this.h5+f<<0,this.h6=this.h6+d<<0,this.h7=this.h7+u<<0},Sha256.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,s=this.h2,r=this.h3,i=this.h4,o=this.h5,h=this.h6,a=this.h7,n=HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[s>>28&15]+HEX_CHARS[s>>24&15]+HEX_CHARS[s>>20&15]+HEX_CHARS[s>>16&15]+HEX_CHARS[s>>12&15]+HEX_CHARS[s>>8&15]+HEX_CHARS[s>>4&15]+HEX_CHARS[15&s]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]+HEX_CHARS[o>>28&15]+HEX_CHARS[o>>24&15]+HEX_CHARS[o>>20&15]+HEX_CHARS[o>>16&15]+HEX_CHARS[o>>12&15]+HEX_CHARS[o>>8&15]+HEX_CHARS[o>>4&15]+HEX_CHARS[15&o]+HEX_CHARS[h>>28&15]+HEX_CHARS[h>>24&15]+HEX_CHARS[h>>20&15]+HEX_CHARS[h>>16&15]+HEX_CHARS[h>>12&15]+HEX_CHARS[h>>8&15]+HEX_CHARS[h>>4&15]+HEX_CHARS[15&h];return this.is224||(n+=HEX_CHARS[a>>28&15]+HEX_CHARS[a>>24&15]+HEX_CHARS[a>>20&15]+HEX_CHARS[a>>16&15]+HEX_CHARS[a>>12&15]+HEX_CHARS[a>>8&15]+HEX_CHARS[a>>4&15]+HEX_CHARS[15&a]),n},Sha256.prototype.toString=Sha256.prototype.hex,Sha256.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,s=this.h2,r=this.h3,i=this.h4,o=this.h5,h=this.h6,a=this.h7,n=[t>>24&255,t>>16&255,t>>8&255,255&t,e>>24&255,e>>16&255,e>>8&255,255&e,s>>24&255,s>>16&255,s>>8&255,255&s,r>>24&255,r>>16&255,r>>8&255,255&r,i>>24&255,i>>16&255,i>>8&255,255&i,o>>24&255,o>>16&255,o>>8&255,255&o,h>>24&255,h>>16&255,h>>8&255,255&h];return this.is224||n.push(a>>24&255,a>>16&255,a>>8&255,255&a),n},Sha256.prototype.array=Sha256.prototype.digest,Sha256.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),e=new DataView(t);return e.setUint32(0,this.h0),e.setUint32(4,this.h1),e.setUint32(8,this.h2),e.setUint32(12,this.h3),e.setUint32(16,this.h4),e.setUint32(20,this.h5),e.setUint32(24,this.h6),this.is224||e.setUint32(28,this.h7),t},HmacSha256.prototype=new Sha256,HmacSha256.prototype.finalize=function(){if(Sha256.prototype.finalize.call(this),this.inner){this.inner=!1;var t=this.array();Sha256.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(t),Sha256.prototype.finalize.call(this)}};var exports=createMethod();exports.sha256=exports,exports.sha224=createMethod(!0),exports.sha256.hmac=createHmacMethod(),exports.sha224.hmac=createHmacMethod(!0),COMMON_JS?module.exports=exports:(root.sha256=exports.sha256,root.sha224=exports.sha224,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=(function(){return exports}).call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))}()},"p+/S":function(t,e,s){"use strict";s.d(e,"a",function(){return n});var r=s("lJxs"),i=s("bCcq"),o=s("8Y7J"),h=s("Xr7G"),a=s("SVse");let n=(()=>{class t{constructor(t,e){this.firestore=t,this.datepipe=e}getShiftByMonth(t){return this.firestore.collection("MonthlyData").doc(t).collection("shift",t=>t.orderBy("date")).get().pipe(Object(r.a)(t=>{let e=[],s=t.docs.length;for(let r=0;r<s;r++){let s=[];s.push(t.docs[r].data()),s.push(t.docs[r].id),e.push(s)}return e}))}getMonthlyShiftByUser(t,e){console.log("getMonthlySHiftByUser:",t,e);let s=this.datepipe.transform(e,"yyyyMM");return console.log(s),this.firestore.collection("User").doc(Object(i.sha256)(t)).collection("MonthlyData").doc(s).get().pipe(Object(r.a)(t=>(console.log(t),console.log(t.data()),t.get("personal_shift"))))}getMonthlyShiftByDay(t,e){let s=this.datepipe.transform(t,"yyyyMM");return console.log(s,e),this.firestore.collection("MonthlyData").doc(s).collection("shift",t=>t.where("day","==",e)).get().pipe(Object(r.a)(t=>{let e=[],s=t.docs.length;for(let r=0;r<s;r++)e.push(t.docs[r].data());return e}))}getShiftByDate(t){let e=this.datepipe.transform(t,"yyyyMM"),s=this.datepipe.transform(t,"yyyy-MM-dd");return console.log(e,s),this.firestore.collection("MonthlyData").doc(e).collection("shift",t=>t.where("date","==",s)).get().pipe(Object(r.a)(t=>{let e=[],s=t.docs.length;for(let r=0;r<s;r++)e.push(t.docs[r].data());return e}))}setShiftByDate(t,e,s,r){let o=this.datepipe.transform(t,"yyyyMM");this.firestore.collection("MonthlyData").doc(o).collection("shift").doc(Object(i.sha256)(t+e+s)).update({members:r})}getSingleShift(t,e,s){let o=this.datepipe.transform(new Date(t),"yyyyMM");return this.firestore.collection("MonthlyData").doc(o).collection("shift").doc(Object(i.sha256)(t+e+s)).get().pipe(Object(r.a)(t=>t.data()))}ShiftTextProcess(){this.bigShiftString="2020/01/01,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u4e09,\u5289\u66dc\u7444,\u67ef\u9e97\u90c1,\u9ec3\u6dd1\u83ef,|2020/01/01,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u4e09,\u694a\u7d00\u905c,\u5289\u6dd1\u60e0,\u8521\u5100\u96ef,|2020/01/01,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u4e09,\u8a31\u737b\u5347,\u8a31\u5c0f\u6167,\u6d2a\u6b23\u6f2a,|2020/01/01,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u4e09,\u694a\u742a\u6210,\u694a\u6dd1\u82b3,\u674e\u4fca,|2020/01/01,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u4e09,\u6797\u7389\u5a77,\u56b4\u4f73\u4f73,\u9673\u6dd1\u73cd(\u6771\u5340\u6771\u5340),|2020/01/01,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u4e09,\u6797\u9e97\u82b3,\u738b\u6625\u6843,\u80e1\u74ca\u7462,|2020/01/01,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u4e09,\u5433\u7d20\u78a7,\u738b\u96ea\u73b2,\u9ec3\u5bcc\u8cb4,|2020/01/01,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u4e09,\u8521\u7389\u6c11,\u859b\u91c7\u5a25,,|2020/01/02,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u56db,\u80e1\u5bb6\u9298,\u80e1\u74ca\u7462,\u5289\u7f8e\u82f1,\u9673\u9e97\u96ef|2020/01/02,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u56db,\u91d1\u4ec1\u57fa,\u91d1\u9280\u82f1,\u859b\u91c7\u5a25,\u5f35\u60e0\u771f|2020/01/02,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u56db,\u90ed\u671d\u5f6c,\u5f35\u9cf3\u83ef,\u6881\u6bd3\u6db5,\u674e\u6dd1\u6167|2020/01/03,\u5f8c\u706b\u8eca\u7ad9,\u4e0b\u5348,\u9031\u4e94,\u90ed\u671d\u5f6c,\u6797\u7389\u5a77,\u674e\u6dd1\u6167,\u674e\u4fcb\u84c9|2020/01/03,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e94,\u5289\u660e\u4ec1,\u5f35\u6dd1\u771f,\u6d2a\u6b23\u6f2a,\u56b4\u4f73\u4f73|2020/01/03,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e94,\u6797\u5ef6\u6e05,\u9ec3\u6dd1\u83ef,\u5433\u7d20\u78a7,\u6797\u9e97\u82b3|2020/01/03,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e94,\u5442\u80b2\u52dd,\u6797\u61f7\u7766,\u5289\u7f8e\u82f1,\u9673\u6dd1\u73cd(\u6771\u5340\u6771\u5340)|2020/01/04,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u516d,\u5442\u80b2\u52dd,\u5442\u5609\u84c9,\u8b1d\u4e9e\u7f8e,\u9ec3\u6885\u82b1|2020/01/04,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u516d,\u674e\u6dd1\u6167,\u738b\u96c5\u82d3,\u8cf4\u6069\u7d14,\u56b4\u4f73\u4f73|2020/01/04,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u516d,\u6797\u5ef6\u6e05,\u674e\u4fe1\u5bec,\u9b4f\u5f69\u6668,\u5f35\u6587\u6708|2020/01/04,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u516d,\u7530\u982d\u96bc\u4eba,\u7530\u982d\u601d\u6f54,\u67ef\u9e97\u90c1,\u859b\u90c1\u8393|2020/01/04,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u516d,\u7518\u529b\u884c,\u8cf4\u6069\u60e0,\u859b\u82b3\u5b9c,\u674e\u4fcb\u84c9|2020/01/04,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u516d,\u674e\u921e\u51fd,\u8521\u60e0\u797a,\u5433\u601c\u7469,|2020/01/04,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u516d,\u5289\u66dc\u7444,\u6d2a\u6b23\u6f2a,\u9673\u7f8e\u83ef,\u9ec3\u67d4\u6ea6|2020/01/04,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u516d,\u6797\u5efa\u6210,\u5f35\u60e0\u7f8e(\u5b89\u5357\u5340\u5b89\u5357),\u9673\u4ead\u59a4,\u9ec3\u5bcc\u8cb4|2020/01/05,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u65e5,\u80e1\u5bb6\u9298,\u9673\u73ee\u745c,\u8b1d\u73ab\u79c0,\u8b1d\u4e9e\u7f8e|2020/01/05,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u65e5,\u5468\u653f\u9716,\u5433\u7d20\u78a7,\u8cf4\u6069\u7d14,\u859b\u90c1\u8393|2020/01/05,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u65e5,\u674e\u4fe1\u5bec,\u674e\u5a49\u96ea,\u5289\u7f8e\u82f1,|2020/01/05,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u65e5,\u5f35\u4f51\u7dad,\u9ec3\u6885\u82b1,\u67ef\u9e97\u90c1,\u5f35\u60e0\u771f|2020/01/05,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u65e5,\u9673\u6587\u5fd7,\u8521\u7389\u6c11,\u5289\u9e97\u7434,\u694a\u5b5f\u6a3a|2020/01/05,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u65e5,,\u9ec3\u6642,\u674e\u6dd1\u6167,|2020/01/05,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u65e5,\u5289\u66dc\u7444,\u9673\u7f8e\u7469,\u9673\u4f69\u5747,\u694a\u5b63\u7f9a|2020/01/05,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u65e5,\u6797\u5efa\u6210,\u8b5a\u91d1\u6842,\u7f85\u6797\u7f8e\u82f1,|2020/01/06,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e00,\u59ec\u6b63\u5b87,\u9673\u51f1\u60e0,\u9ec3\u6642,\u5f35\u667a\u60e0|2020/01/06,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e00,\u674e\u9054\u98db,\u9ec3\u7a3b\u73cd,\u5289\u76ca\u541b,\u9ec3\u6dd1\u83ef|2020/01/06,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e00,\u8607\u73b2\u73b2,\u56b4\u4f73\u4f73,\u8521\u55ac\u53cc,\u9673\u4ead\u59a4|2020/01/07,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e8c,\u912d\u70b3\u6587,\u912d\u744b\u73e0,\u674e\u854e\u7f9a,\u8a31\u9e97\u7389|2020/01/07,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e8c,\u5f35\u667a\u60e0,\u6797\u9e97\u82b3,\u90b1\u96c5\u840d,\u8449\u7f8e\u6708|2020/01/07,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e8c,\u8521\u5143\u52f3,\u8521\u5143\u52f3,\u8521\u55ac\u53cc,\u738b\u96c5\u82d3|2020/01/08,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e09,\u8a31\u737b\u5347,\u8a31\u5c0f\u6167,\u6797\u9e97\u82b3,\u6d2a\u6b23\u6f2a|2020/01/08,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e09,\u694a\u742a\u6210,\u694a\u6dd1\u82b3,\u9ec3\u9e97\u96f2,\u90b1\u96c5\u840d|2020/01/08,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e09,\u6797\u61f7\u7766,\u8521\u55ac\u53cc,\u9ec3\u4f69\u5100,\u6797\u7389\u5a77|2020/01/09,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u56db,\u674e\u5fd7\u660e,\u674e\u7389\u5982,\u9ec3\u85b0\u8431,\u9673\u9e97\u96ef|2020/01/09,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u56db,\u5442\u5609\u84c9,\u9ec3\u7407\u742a,\u8521\u9e97\u73cd,\u90b1\u96c5\u840d|2020/01/09,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u56db,\u90ed\u671d\u5f6c,\u8449\u61b6\u79cb,\u6797\u4e43\u7389,\u9ec3\u9e97\u96f2|2020/01/10,\u5f8c\u706b\u8eca\u7ad9,\u4e0b\u5348,\u9031\u4e94,\u8521\u5143\u52f3,\u8521\u5100\u96ef,\u6797\u61f7\u7766,\u674e\u6dd1\u6167|2020/01/10,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e94,\u6d2a\u59ff\u84c9,\u6d2a\u6b23\u6f2a,\u90b1\u96c5\u840d,\u56b4\u4f73\u4f73|2020/01/10,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e94,\u6797\u5ef6\u6e05,\u9ec3\u6dd1\u83ef,\u5433\u7d20\u78a7,\u6797\u9e97\u82b3|2020/01/10,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e94,\u5442\u80b2\u52dd,\u6797\u7389\u5a77,\u8521\u9e97\u73cd,\u5289\u7f8e\u82f1|2020/01/11,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u516d,\u5289\u66dc\u7444,\u67ef\u9e97\u90c1,\u5289\u7f8e\u82f1,\u9ec3\u6885\u82b1|2020/01/11,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u516d,\u738b\u96ea\u73b2,\u9ec3\u5bcc\u8cb4,\u859b\u82b3\u5b9c,|2020/01/11,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u516d,\u6797\u5ef6\u6e05,\u9ad8\u96e8\u5a77,\u5433\u601c\u7469,|2020/01/11,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u516d,\u5442\u80b2\u52dd,\u5442\u5609\u84c9,\u9673\u7f8e\u83ef,\u6797\u9cf3\u73e0|2020/01/11,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u516d,\u738b\u63d6\u7fd4,\u56b4\u4f73\u4f73,\u859b\u90c1\u8393,|2020/01/11,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u516d,\u9673\u6771\u541b,\u8521\u60e0\u797a,\u8b1d\u79c0\u9e1e,|2020/01/11,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u516d,\u7530\u982d\u96bc\u4eba,\u7530\u982d\u601d\u6f54,\u6797\u9e97\u82b3,\u8b1d\u4e9e\u7f8e|2020/01/11,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u516d,\u6797\u5efa\u6210,\u8cf4\u6069\u7d14,\u9673\u6dd1\u73cd(\u6771\u5340\u6771\u5340),|2020/01/12,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u65e5,,\u9ec3\u7a3b\u73cd,\u5289\u6dd1\u60e0,|2020/01/12,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u65e5,\u694a\u7d00\u905c,\u8cf4\u6069\u60e0,\u738b\u96ea\u73b2,\u694a\u5b5f\u6a3a|2020/01/12,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u65e5,\u5289\u66dc\u7444,\u674e\u6dd1\u6167,\u9ad8\u96e8\u5a77,|2020/01/12,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u65e5,\u80e1\u5bb6\u9298,\u5f35\u60e0\u7f8e(\u5b89\u5357\u5340\u5b89\u5357),\u8b1d\u4e9e\u7f8e,\u67ef\u9e97\u90c1|2020/01/12,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u65e5,\u6797\u5efa\u6210,\u9ec3\u66c9\u860b,\u5433\u7d20\u78a7,|2020/01/12,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u65e5,\u9673\u6771\u541b,\u5289\u7f8e\u82f1,,|2020/01/12,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u65e5,\u9ec3\u4fe1\u7537,\u859b\u90c1\u8431,\u8b1d\u73ab\u79c0,\u8cf4\u6069\u7d14|2020/01/12,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u65e5,,\u8521\u7389\u6c11,\u9ec3\u85b0\u8431,\u5f35\u60e0\u771f|2020/01/13,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e00,\u738b\u63d6\u7fd4,\u9673\u4f73\u744b,\u8a31\u9e97\u7389,\u674e\u854e\u7f9a|2020/01/13,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e00,\u9ec3\u6dd1\u83ef,\u674e\u6dd1\u6167,\u6797\u9e97\u82b3,\u76e7\u57f9\u543e|2020/01/13,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e00,\u8521\u5143\u6cd3,\u9673\u6dd1\u73cd(\u6771\u5340\u6771\u5340),\u6797\u61f7\u7766,\u9673\u4ead\u59a4|2020/01/14,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e8c,\u912d\u70b3\u6587,\u912d\u744b\u73e0,\u9673\u4f73\u744b,\u5442\u5609\u84c9|2020/01/14,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e8c,\u76e7\u57f9\u543e,\u5f35\u667a\u60e0,\u694a\u5b63\u7f9a,\u9ec3\u7a3b\u73cd|2020/01/14,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e8c,\u9673\u79c0\u73b2(\u6771\u5340\u6771\u5340),\u674e\u6dd1\u6167,\u9ec3\u4f69\u5100,\u9673\u975c\u970f|2020/01/15,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e09,\u8a31\u737b\u5347,\u6797\u9e97\u82b3,\u80e1\u74ca\u7462,\u738b\u6625\u6843|2020/01/15,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e09,\u8521\u767b\u5c71,\u9ec3\u9e97\u96f2,\u5f35\u60e0\u771f,\u67ef\u9e97\u90c1|2020/01/15,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e09,\u694a\u7d00\u905c,\u6797\u61f7\u7766,\u8521\u55ac\u53cc,\u5f90\u4f69\u51e1|2020/01/16,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u56db,\u80e1\u5bb6\u9298,\u674e\u854e\u7f9a,\u738b\u96c5\u82d3,\u9ec3\u85b0\u8431|2020/01/16,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u56db,\u91d1\u4ec1\u57fa,\u91d1\u9280\u82f1,\u90b1\u96c5\u840d,\u5433\u7f8e\u9187|2020/01/16,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u56db,\u674e\u6dd1\u6167,\u5289\u9e97\u83ef,\u8449\u61b6\u79cb,\u6d2a\u6b23\u6f2a|2020/01/17,\u5f8c\u706b\u8eca\u7ad9,\u4e0b\u5348,\u9031\u4e94,\u8521\u5143\u52f3,\u8521\u5100\u96ef,,|2020/01/17,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e94,\u5289\u660e\u4ec1,\u738b\u79c0\u73cd,\u9673\u4f73\u744b,\u56b4\u4f73\u4f73|2020/01/17,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e94,\u80e1\u5bb6\u9298,\u76e7\u57f9\u543e,\u5433\u7d20\u78a7,|2020/01/17,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e94,\u90ed\u671d\u5f6c,\u694a\u7d00\u905c,\u674e\u6dd1\u6167,|2020/01/18,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u516d,\u7530\u982d\u96bc\u4eba,\u7530\u982d\u601d\u6f54,\u9ec3\u9e97\u541b,\u5f35\u60e0\u771f|2020/01/18,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u516d,\u5289\u6b63\u8c6a,\u859b\u90c1\u8393,\u9ad8\u96e8\u5a77,|2020/01/18,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u516d,\u6797\u5ef6\u6e05,\u5289\u9752\u82b3,\u9673\u79c0\u73b2(\u5b89\u5e73\u5340\u5317\u90e8),|2020/01/18,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u516d,\u5b89\u5927\u5c71,\u8b1d\u4e9e\u7f8e,\u9ec3\u67d4\u6ea6,\u9673\u7f8e\u7469|2020/01/18,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u516d,\u738b\u63d6\u7fd4,\u738b\u96ea\u73b2,\u9673\u6dd1\u73cd(\u6771\u5340\u6771\u5340),|2020/01/18,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u516d,\u5289\u66dc\u7444,\u8521\u60e0\u797a,\u6c6a\u745e\u7434,|2020/01/18,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u516d,\u90ed\u671d\u5f6c,\u9ec3\u4fe1\u7537,\u67ef\u9e97\u90c1,\u9ec3\u6885\u82b1|2020/01/18,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u516d,\u674e\u6dd1\u6167,\u56b4\u4f73\u4f73,\u674e\u4fcb\u84c9,|2020/01/19,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u65e5,\u5f35\u4f51\u7dad,\u9ec3\u6885\u82b1,\u8cf4\u6069\u7d14,\u9673\u73ee\u745c|2020/01/19,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u65e5,\u9673\u6587\u5fd7,\u9ec3\u9e97\u541b,\u7f85\u6797\u7f8e\u82f1,|2020/01/19,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u65e5,,\u6797\u60e0\u840d,\u674e\u6dd1\u6167,\u5289\u7f8e\u82f1|2020/01/19,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u65e5,,\u9673\u4f69\u5747,\u9ec3\u7a3b\u73cd,\u8b1d\u73ab\u79c0|2020/01/19,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u65e5,\u5468\u653f\u9716,\u8b5a\u91d1\u6842,\u859b\u90c1\u8393,|2020/01/19,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u65e5,\u5289\u66dc\u7444,\u9ad8\u96e8\u5a77,\u8521\u60e0\u797a,|2020/01/19,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u65e5,\u5442\u80b2\u52dd,\u859b\u90c1\u8431,\u694a\u5b63\u7f9a,\u5442\u5609\u84c9|2020/01/19,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u65e5,\u694a\u7d00\u905c,\u8cf4\u6069\u60e0,\u5433\u7d20\u78a7,\u67ef\u9e97\u90c1|2020/01/20,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e00,\u738b\u63d6\u7fd4,\u9ec3\u4f69\u5100,\u5f35\u667a\u60e0,\u9ec3\u85b0\u8431|2020/01/20,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e00,\u674e\u9054\u98db,\u674e\u6dd1\u6167,\u8607\u73b2\u73b2,\u738b\u6625\u6843|2020/01/20,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e00,\u6797\u4e43\u7389,\u6797\u61f7\u7766,\u76e7\u57f9\u543e,\u8521\u55ac\u53cc|2020/01/21,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e8c,\u738b\u63d6\u7fd4,\u8b1d\u79c0\u9e1e,\u5f35\u60e0\u7f8e(\u6c38\u5eb7\u5340\u6771\u90e8),\u8b1d\u4e9e\u7f8e|2020/01/21,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e8c,\u8b1d\u73ab\u79c0,\u5289\u6dd1\u73cd,\u90b1\u96c5\u840d,\u76e7\u57f9\u543e|2020/01/21,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e8c,\u8521\u9e97\u73cd,\u738b\u96c5\u82d3,\u674e\u6dd1\u6167,\u9ec3\u85b0\u8431|2020/01/22,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e09,\u66f9\u539f,\u66f9\u5982,\u8a31\u5c0f\u6167,\u738b\u6625\u6843|2020/01/22,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e09,\u694a\u742a\u6210,\u694a\u6dd1\u82b3,\u9ec3\u6dd1\u83ef,\u5433\u7d20\u78a7|2020/01/22,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e09,\u8521\u55ac\u53cc,\u8521\u9e97\u73cd,\u8521\u5100\u96ef,\u9ec3\u4f69\u5100|2020/01/23,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u56db,\u6797\u9e97\u82b3,\u9673\u4ead\u59a4,\u5289\u7f8e\u82f1,\u9673\u79c0\u73b2(\u6771\u5340\u6771\u5340)|2020/01/23,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u56db,\u9ec3\u7407\u742a,\u5f35\u60e0\u771f,\u5289\u76ca\u541b,\u5433\u7f8e\u9187|2020/01/23,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u56db,\u90ed\u671d\u5f6c,\u5f35\u9cf3\u83ef,\u6797\u4e43\u7389,\u6881\u6bd3\u6db5|2020/01/24,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u4e94,,,,|2020/01/24,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u4e94,\u8521\u5143\u52f3,\u8521\u5100\u96ef,,\u9673\u6dd1\u73cd(\u6771\u5340\u6771\u5340)|2020/01/24,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u4e94,\u6d2a\u7d39\u9298,\u6d2a\u59ff\u84c9,\u56b4\u4f73\u4f73,\u859b\u90c1\u8431|2020/01/24,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u4e94,,,,|2020/01/24,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u4e94,\u694a\u7d00\u905c,\u674e\u4fcb\u84c9,\u5289\u7f8e\u82f1,|2020/01/24,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u4e94,\u5289\u660e\u4ec1,\u6d2a\u6b23\u6f2a,\u5289\u9752\u82b3,\u65bd\u4f73\u4f36|2020/01/24,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u4e94,\u80e1\u5bb6\u9298,\u6797\u9e97\u82b3,,|2020/01/24,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u4e94,\u90ed\u671d\u5f6c,\u8521\u9e97\u73cd,\u5289\u9e97\u83ef,|2020/01/25,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u516d,\u5289\u66dc\u7444,\u6797\u9e97\u82b3,\u859b\u90c1\u8431,\u9673\u7f8e\u7469|2020/01/25,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u516d,\u5289\u6b63\u8c6a,\u674e\u4fcb\u84c9,\u859b\u90c1\u8393,|2020/01/25,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u516d,\u912d\u70b3\u6587,\u912d\u744b\u73e0,\u9673\u79c0\u73b2(\u5b89\u5e73\u5340\u5317\u90e8),|2020/01/25,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u516d,\u90ed\u671d\u5f6c,\u9ec3\u4fe1\u7537,\u6d2a\u6b23\u6f2a,\u5f35\u60e0\u771f|2020/01/25,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u516d,\u66f9\u539f,\u66f9\u5982,\u56b4\u4f73\u4f73,|2020/01/25,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u516d,\u9673\u6771\u541b,\u5f35\u6587\u6708,\u8521\u60e0\u797a,|2020/01/25,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u516d,\u7530\u982d\u96bc\u4eba,\u7530\u982d\u601d\u6f54,\u5b89\u5927\u5c71,\u6797\u9cf3\u73e0|2020/01/25,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u516d,\u7518\u529b\u884c,\u738b\u96ea\u73b2,\u9673\u6dd1\u73cd(\u6771\u5340\u6771\u5340),|2020/01/26,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u65e5,\u5289\u66dc\u7444,\u8b1d\u4e9e\u7f8e,\u5f35\u60e0\u771f,|2020/01/26,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u65e5,\u6797\u5b50\u53c8,\u6797\u4e43\u7389,\u9ec3\u66c9\u860b,\u8b5a\u91d1\u6842|2020/01/26,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u65e5,\u9673\u6771\u541b,\u5289\u9752\u82b3,\u9ad8\u96e8\u5a77,|2020/01/26,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u65e5,\u9ec3\u4fe1\u7537,\u9673\u7f8e\u7469,\u5289\u6dd1\u60e0,\u5289\u9e97\u7434|2020/01/26,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u65e5,\u8521\u5143\u6cd3,\u6881\u6bd3\u6db5,\u9ec3\u85b0\u8431,\u7f85\u6797\u7f8e\u82f1|2020/01/26,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u65e5,,\u5289\u7f8e\u82f1,\u8521\u60e0\u797a,|2020/01/26,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u65e5,\u80e1\u5bb6\u9298,\u9ec3\u6885\u82b1,\u9ec3\u7a3b\u73cd,\u694a\u5b63\u7f9a|2020/01/26,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u65e5,\u694a\u7d00\u905c,\u9ec3\u67d4\u6ea6,\u738b\u96ea\u73b2,\u694a\u5b5f\u6a3a|2020/01/27,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u4e00,,,,|2020/01/27,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u4e00,,,,|2020/01/27,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u4e00,\u9673\u79c0\u73b2(\u5b89\u5e73\u5340\u5317\u90e8),\u8a31\u9e97\u7389,\u5433\u9e97\u83ef,|2020/01/27,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u4e00,\u738b\u96ea\u73b2,\u859b\u90c1\u8431,\u6797\u9e97\u82b3,|2020/01/27,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u4e00,\u6797\u4e43\u7389,\u9ad8\u96e8\u5a77,\u5433\u7f8e\u9187,|2020/01/27,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u4e00,\u5289\u9752\u82b3,\u9ec3\u85b0\u8431,\u6797\u9cf3\u73e0,|2020/01/27,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u4e00,\u9ec3\u7a3b\u73cd,\u5289\u76ca\u541b,\u5433\u7f8e\u9187,|2020/01/27,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u4e00,\u738b\u6625\u6843,\u56b4\u4f73\u4f73,\u9673\u6dd1\u73cd(\u6771\u5340\u6771\u5340),|2020/01/28,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u4e8c,\u9ad8\u96e8\u5a77,\u6797\u9e97\u82b3,\u9ec3\u7a3b\u73cd,|2020/01/28,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u4e8c,\u738b\u63d6\u7fd4,\u5433\u9e97\u83ef,\u8521\u9e97\u73cd,|2020/01/28,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u4e8c,\u912d\u70b3\u6587,\u912d\u744b\u73e0,\u9673\u975c\u970f,\u5f35\u60e0\u7f8e(\u6c38\u5eb7\u5340\u6771\u90e8)|2020/01/28,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u4e8c,\u8b1d\u73ab\u79c0,\u5289\u6dd1\u73cd,\u8449\u7f8e\u6708,|2020/01/28,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u4e8c,\u5289\u66dc\u7444,\u674e\u4fcb\u84c9,\u8b5a\u91d1\u6842,|2020/01/28,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u4e8c,\u9673\u79c0\u73b2(\u5b89\u5e73\u5340\u5317\u90e8),\u859b\u90c1\u8431,\u738b\u79c0\u73cd,\u5289\u9752\u82b3|2020/01/28,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u4e8c,\u5289\u6dd1\u60e0,\u859b\u91c7\u5a25,\u694a\u5b63\u7f9a,|2020/01/28,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u4e8c,\u9673\u79c0\u73b2(\u6771\u5340\u6771\u5340),\u90ed\u6dd1\u9cf3,\u9ec3\u85b0\u8431,|2020/01/29,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e2d\u5348,\u9031\u4e09,\u674e\u4fca,\u9ad8\u96e8\u5a77,\u90b1\u96c5\u840d,|2020/01/29,\u5b89\u5e73\u6a39\u5c4b\u505c\u8eca\u5834,\u4e0b\u5348,\u9031\u4e09,\u8521\u5100\u96ef,\u9673\u6dd1\u73cd(\u6771\u5340\u6771\u5340),,|2020/01/29,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u65e9\u4e0a,\u9031\u4e09,\u6797\u9e97\u82b3,\u9673\u79c0\u73b2(\u5b89\u5e73\u5340\u5317\u90e8),\u5289\u9752\u82b3,|2020/01/29,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e2d\u5348,\u9031\u4e09,\u694a\u742a\u6210,\u694a\u6dd1\u82b3,\u5f35\u60e0\u771f,|2020/01/29,\u5b89\u5e73\u897f\u9580\u570b\u5c0f,\u4e0b\u5348,\u9031\u4e09,\u694a\u7d00\u905c,\u9ec3\u4f69\u5100,,|2020/01/29,\u5b54\u5edf\u5712\u5340,\u65e9\u4e0a,\u9031\u4e09,\u6d2a\u6b23\u6f2a,\u738b\u6625\u6843,,|2020/01/29,\u5b54\u5edf\u5712\u5340,\u4e2d\u5348,\u9031\u4e09,\u8521\u767b\u5c71,\u9ec3\u5bcc\u8cb4,,|2020/01/29,\u5b54\u5edf\u5712\u5340,\u4e0b\u5348,\u9031\u4e09,\u5289\u6dd1\u60e0,\u8b5a\u91d1\u6842,,|2020/01/30,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u56db,\u80e1\u5bb6\u9298,\u6797\u61f7\u7766,\u80e1\u74ca\u7462,\u738b\u96c5\u82d3|2020/01/30,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u56db,\u91d1\u4ec1\u57fa,\u91d1\u9280\u82f1,\u5442\u5609\u84c9,\u6797\u9e97\u82b3|2020/01/30,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u56db,\u6d2a\u6b23\u6f2a,\u56b4\u4f73\u4f73,\u67ef\u9e97\u90c1,\u9ec3\u9e97\u96f2|2020/01/31,\u5f8c\u706b\u8eca\u7ad9,\u4e0b\u5348,\u9031\u4e94,\u90ed\u671d\u5f6c,\u76e7\u57f9\u543e,,|2020/01/31,\u6210\u5927\u5712\u5340,\u65e9\u4e0a,\u9031\u4e94,\u6d2a\u59ff\u84c9,\u6d2a\u6b23\u6f2a,\u90b1\u96c5\u840d,\u65bd\u4f73\u4f36|2020/01/31,\u6210\u5927\u5712\u5340,\u4e2d\u5348,\u9031\u4e94,\u80e1\u5bb6\u9298,\u6797\u9e97\u82b3,,|2020/01/31,\u6210\u5927\u5712\u5340,\u4e0b\u5348,\u9031\u4e94,\u8521\u5143\u52f3,\u8521\u5100\u96ef,,";let t=[];this.middleSHift=this.bigShiftString.split("|");for(let e of this.middleSHift){this.SmallSHift=e.split(",");let s={date:this.SmallSHift[0].replace(new RegExp("/","g"),"-"),day:this.SmallSHift[3],shift_title:this.SmallSHift[2],site:this.SmallSHift[1],members:[this.SmallSHift[4],this.SmallSHift[5],this.SmallSHift[6],this.SmallSHift[7]]};console.log(s),t.push(s)}console.log(t);for(let e of t)this.firestore.collection("MonthlyData").doc("202001").collection("shift").doc(Object(i.sha256)(e.date+e.shift_title+e.site)).set(e)}resetShift(){this.firestore.collection("MonthlyData").doc("202001").collection("shift").get().pipe(Object(r.a)(t=>{let e=[],s=t.docs.length;for(let r=0;r<s;r++)e.push(t.docs[r].data());return e})).subscribe(t=>{let e,s={},r=this.firestore.collection("User"),o=t.length;for(let i=0;i<o;i++)for(let e=0;e<4;e++)""!=t[i].members[e]&&(s[t[i].members[e]]||(s[t[i].members[e]]=[]),s[t[i].members[e]].push({date:t[i].date,day:t[i].day,site:t[i].site,shift_title:t[i].shift_title}));for(e in s)s[e].sort(function(t,e){return t.date.localeCompare(e.date)}),console.log(e,s[e]),r.doc(Object(i.sha256)(e)).collection("MonthlyData").doc("202001").set({personal_shift:s[e]})})}}return t.ngInjectableDef=o.Pb({factory:function(){return new t(o.Qb(h.a),o.Qb(a.d))},token:t,providedIn:"root"}),t})()}}]);