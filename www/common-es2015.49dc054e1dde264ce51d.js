(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"1OJ9":function(n,e,t){"use strict";t.d(e,"a",function(){return o}),t.d(e,"b",function(){return i}),t.d(e,"c",function(){return r}),t.d(e,"d",function(){return l});const l=()=>{const n=window.TapticEngine;n&&n.selection()},o=()=>{const n=window.TapticEngine;n&&n.gestureSelectionStart()},i=()=>{const n=window.TapticEngine;n&&n.gestureSelectionChanged()},r=()=>{const n=window.TapticEngine;n&&n.gestureSelectionEnd()}},"3QqI":function(n,e,t){"use strict";t.d(e,"a",function(){return l}),t.d(e,"b",function(){return o});class l{constructor(n,e){this.x=n,this.y=e}}const o=(n,e,t,l,o)=>{const a=r(n.y,e.y,t.y,l.y,o);return i(n.x,e.x,t.x,l.x,a[0])},i=(n,e,t,l,o)=>o*(3*e*Math.pow(o-1,2)+o*(-3*t*o+3*t+l*o))-n*Math.pow(o-1,3),r=(n,e,t,l,o)=>a((l-=o)-3*(t-=o)+3*(e-=o)-(n-=o),3*t-6*e+3*n,3*e-3*n,n).filter(n=>n>=0&&n<=1),a=(n,e,t,l)=>{if(0===n)return((n,e,t)=>{const o=e*e-4*n*l;return o<0?[]:[(-e+Math.sqrt(o))/(2*n),(-e-Math.sqrt(o))/(2*n)]})(e,t);const o=(3*(t/=n)-(e/=n)*e)/3,i=(2*e*e*e-9*e*t+27*(l/=n))/27;if(0===o)return[Math.pow(-i,1/3)];if(0===i)return[Math.sqrt(-o),-Math.sqrt(-o)];const r=Math.pow(i/2,2)+Math.pow(o/3,3);if(0===r)return[Math.pow(i/2,.5)-e/3];if(r>0)return[Math.pow(-i/2+Math.sqrt(r),1/3)-Math.pow(i/2+Math.sqrt(r),1/3)-e/3];const a=Math.sqrt(Math.pow(-o/3,3)),u=Math.acos(-i/(2*Math.sqrt(Math.pow(-o/3,3)))),s=2*Math.pow(a,1/3);return[s*Math.cos(u/3)-e/3,s*Math.cos((u+2*Math.PI)/3)-e/3,s*Math.cos((u+4*Math.PI)/3)-e/3]}},"9Xoc":function(n,e,t){"use strict";t.d(e,"a",function(){return l}),t.d(e,"b",function(){return u}),t.d(e,"c",function(){return a}),t.d(e,"d",function(){return g}),t.d(e,"e",function(){return h}),t.d(e,"f",function(){return i}),t.d(e,"g",function(){return o}),t.d(e,"h",function(){return d}),t.d(e,"i",function(){return s}),t.d(e,"j",function(){return c}),t.d(e,"k",function(){return r});const l=n=>{"requestIdleCallback"in window?window.requestIdleCallback(n):setTimeout(n,32)},o=n=>!!n.shadowRoot&&!!n.attachShadow,i=n=>{const e=n.closest("ion-item");return e?e.querySelector("ion-label"):null},r=(n,e,t,l,i)=>{if(n||o(e)){let n=e.querySelector("input.aux-input");n||((n=e.ownerDocument.createElement("input")).type="hidden",n.classList.add("aux-input"),e.appendChild(n)),n.disabled=i,n.name=t,n.value=l||""}},a=(n,e,t)=>Math.max(n,Math.min(e,t)),u=(n,e)=>{if(!n){const n="ASSERT: "+e;throw console.error(n),new Error(n)}},s=n=>n.timeStamp||Date.now(),c=n=>{if(n){const e=n.changedTouches;if(e&&e.length>0){const n=e[0];return{x:n.clientX,y:n.clientY}}if(void 0!==n.pageX)return{x:n.pageX,y:n.pageY}}return{x:0,y:0}},d=n=>{const e="rtl"===document.dir;switch(n){case"start":return e;case"end":return!e;default:throw new Error(`"${n}" is not a valid value for [side]. Use "start" or "end" instead.`)}},g=(n,e)=>{const t=n._original||n;return{_original:n,emit:h(t.emit.bind(t),e)}},h=(n,e=0)=>{let t;return(...l)=>{clearTimeout(t),t=setTimeout(n,e,...l)}}},Af8N:function(n,e,t){"use strict";t.d(e,"a",function(){return r});var l=t("lJxs"),o=t("8Y7J"),i=t("Xr7G");let r=(()=>{class n{constructor(n){this.firestore=n}getCongregations(){this.firestore.collection("Settings").doc("Cangregations").get().pipe(Object(l.a)(n=>n.data().congregations)).subscribe(n=>{this.congregations=n,console.log(this.congregations)})}}return n.ngInjectableDef=o.Pb({factory:function(){return new n(o.Qb(i.a))},token:n,providedIn:"root"}),n})()},EdcL:function(n,e,t){"use strict";var l=t("8Y7J"),o=t("oBZk"),i=t("ZZ/e"),r=t("s7LF"),a=t("SVse");t("h7RH"),t("Af8N"),t("Ouoq"),t("10JR"),t.d(e,"a",function(){return u}),t.d(e,"b",function(){return b});var u=l.pb({encapsulation:0,styles:[[".my-illegal-text[_ngcontent-%COMP%]{font-size:12px;color:red}.my-input[_ngcontent-%COMP%]{text-align:center}ion-button[_ngcontent-%COMP%]{--background:linear-gradient(to right, #FF9800, rgb(248, 178, 73));--background-hover:linear-gradient(to right, rgb(248, 178, 73), #FF9800);--background-activated:linear-gradient(to right, #FF9800, rgb(248, 178, 73))}"]],data:{}});function s(n){return l.Mb(0,[(n()(),l.rb(0,0,null,null,2,"ion-select-option",[],null,null,null,o.ob,o.F)),l.qb(1,49152,null,0,i.mb,[l.h,l.k,l.x],{value:[0,"value"]},null),(n()(),l.Kb(2,0,[" "," "]))],function(n,e){n(e,1,0,e.context.$implicit)},function(n,e){n(e,2,0,e.context.$implicit)})}function c(n){return l.Mb(0,[(n()(),l.rb(0,0,null,null,1,"p",[["class","my-illegal-text"]],null,null,null,null,null)),(n()(),l.Kb(-1,null,["\u4e0d\u53ef\u7a7a\u767d\uff01"]))],null,null)}function d(n){return l.Mb(0,[(n()(),l.rb(0,0,null,null,2,"ion-select-option",[],null,null,null,o.ob,o.F)),l.qb(1,49152,null,0,i.mb,[l.h,l.k,l.x],{value:[0,"value"]},null),(n()(),l.Kb(2,0,[" "," "]))],function(n,e){n(e,1,0,e.context.$implicit)},function(n,e){n(e,2,0,e.context.$implicit)})}function g(n){return l.Mb(0,[(n()(),l.rb(0,0,null,null,1,"p",[["class","my-illegal-text"]],null,null,null,null,null)),(n()(),l.Kb(-1,null,["\u4e0d\u53ef\u7a7a\u767d\uff01"]))],null,null)}function h(n){return l.Mb(0,[(n()(),l.rb(0,0,null,null,1,"p",[["class","my-illegal-text"]],null,null,null,null,null)),(n()(),l.Kb(-1,null,["\u5bc6\u78bc\u6709\u8aa4\uff01"]))],null,null)}function b(n){return l.Mb(0,[(n()(),l.rb(0,0,null,null,47,"ion-card",[["class","welcome-card"]],null,null,null,o.R,o.e)),l.qb(1,49152,null,0,i.l,[l.h,l.k,l.x],null,null),(n()(),l.rb(2,0,null,0,4,"ion-card-header",[],null,null,null,o.P,o.g)),l.qb(3,49152,null,0,i.n,[l.h,l.k,l.x],null,null),(n()(),l.rb(4,0,null,0,2,"ion-card-title",[],null,null,null,o.Q,o.h)),l.qb(5,49152,null,0,i.p,[l.h,l.k,l.x],null,null),(n()(),l.Kb(-1,0,["\u8acb\u5148\u767b\u5165!"])),(n()(),l.rb(7,0,null,0,40,"ion-card-content",[],null,null,null,o.O,o.f)),l.qb(8,49152,null,0,i.m,[l.h,l.k,l.x],null,null),(n()(),l.rb(9,0,null,0,38,"ion-list",[],null,null,null,o.hb,o.w)),l.qb(10,49152,null,0,i.N,[l.h,l.k,l.x],null,null),(n()(),l.rb(11,0,null,0,11,"div",[],null,null,null,null,null)),(n()(),l.rb(12,0,null,null,8,"ion-select",[["cancelText","\u53d6\u6d88"],["class","my-input"],["interface","action-sheet"],["mode","md"],["name","congregation"],["placeholder","\u8acb\u9078\u64c7\u6703\u773e"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionChange"],[null,"ionBlur"]],function(n,e,t){var o=!0,i=n.component;return"ionBlur"===e&&(o=!1!==l.Db(n,13)._handleBlurEvent(t.target)&&o),"ionChange"===e&&(o=!1!==l.Db(n,13)._handleChangeEvent(t.target)&&o),"ngModelChange"===e&&(o=!1!==(i.login_form.congregation=t)&&o),"ionChange"===e&&(o=!1!==i.onChangeCongregation()&&o),o},o.pb,o.E)),l.qb(13,16384,null,0,i.Jb,[l.k],null,null),l.Hb(1024,null,r.c,function(n){return[n]},[i.Jb]),l.qb(15,671744,null,0,r.h,[[8,null],[8,null],[8,null],[6,r.c]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),l.Hb(2048,null,r.d,null,[r.h]),l.qb(17,16384,null,0,r.e,[[4,r.d]],null,null),l.qb(18,49152,null,0,i.lb,[l.h,l.k,l.x],{cancelText:[0,"cancelText"],interface:[1,"interface"],interfaceOptions:[2,"interfaceOptions"],mode:[3,"mode"],name:[4,"name"],placeholder:[5,"placeholder"]},null),(n()(),l.gb(16777216,null,0,1,null,s)),l.qb(20,278528,null,0,a.j,[l.M,l.J,l.q],{ngForOf:[0,"ngForOf"]},null),(n()(),l.gb(16777216,null,null,1,null,c)),l.qb(22,16384,null,0,a.k,[l.M,l.J],{ngIf:[0,"ngIf"]},null),(n()(),l.rb(23,0,null,0,11,"div",[],null,null,null,null,null)),(n()(),l.rb(24,0,null,null,8,"ion-select",[["cancelText","\u53d6\u6d88"],["class","my-input"],["interface","action-sheet"],["mode","md"],["name","name"],["placeholder","\u8acb\u9078\u64c7\u59d3\u540d"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionChange"],[null,"ionBlur"]],function(n,e,t){var o=!0,i=n.component;return"ionBlur"===e&&(o=!1!==l.Db(n,25)._handleBlurEvent(t.target)&&o),"ionChange"===e&&(o=!1!==l.Db(n,25)._handleChangeEvent(t.target)&&o),"ngModelChange"===e&&(o=!1!==(i.login_form.name=t)&&o),"ionChange"===e&&(o=!1!==i.onChangeName()&&o),o},o.pb,o.E)),l.qb(25,16384,null,0,i.Jb,[l.k],null,null),l.Hb(1024,null,r.c,function(n){return[n]},[i.Jb]),l.qb(27,671744,null,0,r.h,[[8,null],[8,null],[8,null],[6,r.c]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),l.Hb(2048,null,r.d,null,[r.h]),l.qb(29,16384,null,0,r.e,[[4,r.d]],null,null),l.qb(30,49152,null,0,i.lb,[l.h,l.k,l.x],{cancelText:[0,"cancelText"],interface:[1,"interface"],interfaceOptions:[2,"interfaceOptions"],mode:[3,"mode"],name:[4,"name"],placeholder:[5,"placeholder"]},null),(n()(),l.gb(16777216,null,0,1,null,d)),l.qb(32,278528,null,0,a.j,[l.M,l.J,l.q],{ngForOf:[0,"ngForOf"]},null),(n()(),l.gb(16777216,null,null,1,null,g)),l.qb(34,16384,null,0,a.k,[l.M,l.J],{ngIf:[0,"ngIf"]},null),(n()(),l.rb(35,0,null,0,9,"div",[],null,null,null,null,null)),(n()(),l.rb(36,0,null,null,6,"ion-input",[["class","my-input"],["placeholder","\u8acb\u8f38\u5165\u5bc6\u78bc"],["type","password"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionChange"],[null,"ionBlur"]],function(n,e,t){var o=!0,i=n.component;return"ionBlur"===e&&(o=!1!==l.Db(n,37)._handleBlurEvent(t.target)&&o),"ionChange"===e&&(o=!1!==l.Db(n,37)._handleInputEvent(t.target)&&o),"ngModelChange"===e&&(o=!1!==(i.login_form.password=t)&&o),"ionChange"===e&&(o=!1!==i.onChangePassword()&&o),o},o.bb,o.r)),l.qb(37,16384,null,0,i.Kb,[l.k],null,null),l.Hb(1024,null,r.c,function(n){return[n]},[i.Kb]),l.qb(39,671744,null,0,r.h,[[8,null],[8,null],[8,null],[6,r.c]],{model:[0,"model"]},{update:"ngModelChange"}),l.Hb(2048,null,r.d,null,[r.h]),l.qb(41,16384,null,0,r.e,[[4,r.d]],null,null),l.qb(42,49152,null,0,i.F,[l.h,l.k,l.x],{placeholder:[0,"placeholder"],type:[1,"type"]},null),(n()(),l.gb(16777216,null,null,1,null,h)),l.qb(44,16384,null,0,a.k,[l.M,l.J],{ngIf:[0,"ngIf"]},null),(n()(),l.rb(45,0,null,0,2,"ion-button",[["expand","block"]],null,[[null,"click"]],function(n,e,t){var l=!0;return"click"===e&&(l=!1!==n.component.onSubmit()&&l),l},o.M,o.c)),l.qb(46,49152,null,0,i.j,[l.h,l.k,l.x],{expand:[0,"expand"]},null),(n()(),l.Kb(-1,0,[" \u767b\u5165 "]))],function(n,e){var t=e.component;n(e,15,0,"congregation",t.login_form.congregation),n(e,18,0,"\u53d6\u6d88","action-sheet","customActionSheetOptions","md","congregation","\u8acb\u9078\u64c7\u6703\u773e"),n(e,20,0,t.congregationsService.congregations),n(e,22,0,!t.is_legal.congregation),n(e,27,0,"name",t.login_form.name),n(e,30,0,"\u53d6\u6d88","action-sheet","customActionSheetOptions","md","name","\u8acb\u9078\u64c7\u59d3\u540d"),n(e,32,0,t.names),n(e,34,0,!t.is_legal.name),n(e,39,0,t.login_form.password),n(e,42,0,"\u8acb\u8f38\u5165\u5bc6\u78bc","password"),n(e,44,0,!t.is_legal.password),n(e,46,0,"block")},function(n,e){n(e,12,0,l.Db(e,17).ngClassUntouched,l.Db(e,17).ngClassTouched,l.Db(e,17).ngClassPristine,l.Db(e,17).ngClassDirty,l.Db(e,17).ngClassValid,l.Db(e,17).ngClassInvalid,l.Db(e,17).ngClassPending),n(e,24,0,l.Db(e,29).ngClassUntouched,l.Db(e,29).ngClassTouched,l.Db(e,29).ngClassPristine,l.Db(e,29).ngClassDirty,l.Db(e,29).ngClassValid,l.Db(e,29).ngClassInvalid,l.Db(e,29).ngClassPending),n(e,36,0,l.Db(e,41).ngClassUntouched,l.Db(e,41).ngClassTouched,l.Db(e,41).ngClassPristine,l.Db(e,41).ngClassDirty,l.Db(e,41).ngClassValid,l.Db(e,41).ngClassInvalid,l.Db(e,41).ngClassPending)})}},O3pp:function(n,e,t){"use strict";t.d(e,"a",function(){return u});var l=t("lJxs"),o=t("bCcq"),i=t("8Y7J"),r=t("Xr7G"),a=t("SVse");let u=(()=>{class n{constructor(n,e){this.firestore=n,this.datepipe=e}setReport(n){n.create_on=new Date;const e=this.datepipe.transform(n.date,"yyyyMM");n.date=this.datepipe.transform(n.date,"yyyy-MM-dd");const t=Object(o.sha256)(n.date+n.shift_title+n.site);this.firestore.collection("Statistics").doc("ShiftReport").collection(e).doc(t).set(n)}getReportById(n,e){const t=new Date(n),o=this.datepipe.transform(t,"yyyyMM");return this.firestore.collection("Statistics").doc("ShiftReport").collection(o).doc(e).get().pipe(Object(l.a)(n=>n.data()))}getReportByDate(n){const e=this.datepipe.transform(n,"yyyyMM"),t=this.datepipe.transform(n,"yyyy-MM-dd");return this.firestore.collection("Statistics").doc("ShiftReport").collection(e,n=>n.where("date","==",t)).get().pipe(Object(l.a)(n=>{let e=[],t=n.docs.length;for(let l=0;l<t;l++){let t=n.docs[l].data();t.id=n.docs[l].id,e.push(t)}return e}))}}return n.ngInjectableDef=i.Pb({factory:function(){return new n(i.Qb(r.a),i.Qb(a.d))},token:n,providedIn:"root"}),n})()},YWFk:function(n,e,t){"use strict";t.d(e,"a",function(){return l});const l=n=>{try{if("string"!=typeof n||""===n)return n;const t=document.createDocumentFragment(),l=document.createElement("div");t.appendChild(l),l.innerHTML=n,a.forEach(n=>{const e=t.querySelectorAll(n);for(let l=e.length-1;l>=0;l--){const n=e[l];n.parentNode?n.parentNode.removeChild(n):t.removeChild(n);const r=i(n);for(let e=0;e<r.length;e++)o(r[e])}});const r=i(t);for(let n=0;n<r.length;n++)o(r[n]);const u=document.createElement("div");u.appendChild(t);const s=u.querySelector("div");return null!==s?s.innerHTML:u.innerHTML}catch(e){return console.error(e),""}},o=n=>{if(n.nodeType&&1!==n.nodeType)return;for(let t=n.attributes.length-1;t>=0;t--){const e=n.attributes[t],l=e.name;if(!r.includes(l.toLowerCase())){n.removeAttribute(l);continue}const o=e.value;null!=o&&o.toLowerCase().includes("javascript:")&&n.removeAttribute(l)}const e=i(n);for(let t=0;t<e.length;t++)o(e[t])},i=n=>null!=n.children?n.children:n.childNodes,r=["class","id","href","src","name","slot"],a=["script","style","iframe","meta","link","object","embed"]},ckTY:function(n,e,t){"use strict";t.d(e,"a",function(){return v}),t.d(e,"b",function(){return m}),t.d(e,"c",function(){return w}),t.d(e,"d",function(){return i});var l=t("S6Yj"),o=t("igpV");const i=n=>new Promise((e,t)=>{Object(l.n)(()=>{r(n),a(n).then(t=>{t.animation&&t.animation.destroy(),u(n),e(t)},e=>{u(n),t(e)})})}),r=n=>{const e=n.enteringEl,t=n.leavingEl;C(e,t,n.direction),n.showGoBack?e.classList.add("can-go-back"):e.classList.remove("can-go-back"),w(e,!1),t&&w(t,!1)},a=async n=>{const e=await s(n);return e?c(e,n):d(n)},u=n=>{const e=n.leavingEl;n.enteringEl.classList.remove("ion-page-invisible"),void 0!==e&&e.classList.remove("ion-page-invisible")},s=async n=>{if(n.leavingEl&&n.animated&&0!==n.duration)return n.animationBuilder?n.animationBuilder:"ios"===n.mode?(await(()=>t.e(103).then(t.bind(null,"Nsvw")))()).iosTransitionAnimation:(await(()=>t.e(104).then(t.bind(null,"nPxl")))()).mdTransitionAnimation},c=async(n,e)=>{let l;await g(e,!0);try{const o=await t.e(7).then(t.bind(null,"vK52"));l=await o.create(n,e.baseEl,e)}catch(i){l=n(e.baseEl,e)}p(e.enteringEl,e.leavingEl);const o=await b(l,e);return l.hasCompleted=o,e.progressCallback&&e.progressCallback(void 0),l.hasCompleted&&f(e.enteringEl,e.leavingEl),{hasCompleted:l.hasCompleted,animation:l}},d=async n=>{const e=n.enteringEl,t=n.leavingEl;return await g(n,!1),p(e,t),f(e,t),{hasCompleted:!0}},g=async(n,e)=>{const t=(void 0!==n.deepWait?n.deepWait:e)?[v(n.enteringEl),v(n.leavingEl)]:[y(n.enteringEl),y(n.leavingEl)];await Promise.all(t),await h(n.viewIsReady,n.enteringEl)},h=async(n,e)=>{n&&await n(e)},b=(n,e)=>{const t=e.progressCallback,l=new Promise(e=>n.onFinish(e));return t?(n.progressStart(!0),t(n)):n.play(),l},p=(n,e)=>{m(e,o.c),m(n,o.a)},f=(n,e)=>{m(n,o.b),m(e,o.d)},m=(n,e)=>{if(n){const t=new CustomEvent(e,{bubbles:!1,cancelable:!1});n.dispatchEvent(t)}},y=n=>n&&n.componentOnReady?n.componentOnReady():Promise.resolve(),v=async n=>{const e=n;if(e){if(null!=e.componentOnReady&&null!=await e.componentOnReady())return;await Promise.all(Array.from(e.children).map(v))}},w=(n,e)=>{e?(n.setAttribute("aria-hidden","true"),n.classList.add("ion-page-hidden")):(n.hidden=!1,n.removeAttribute("aria-hidden"),n.classList.remove("ion-page-hidden"))},C=(n,e,t)=>{void 0!==n&&(n.style.zIndex="back"===t?"99":"101"),void 0!==e&&(e.style.zIndex="100")}},h7RH:function(n,e,t){"use strict";t.d(e,"a",function(){return l}),t("Af8N"),t("Ouoq"),t("10JR");class l{constructor(n,e,t){this.congregationsService=n,this.userService=e,this.navService=t,this.names=[],this.login_form={congregation:"",name:"",password:""},this.is_legal={congregation:!0,name:!0,password:!0}}checkCongregation(){this.is_legal.congregation=!!this.login_form.congregation}checkName(){this.is_legal.name=!!this.login_form.name}checkPassword(){this.is_legal.password=!!this.login_form.password}checkAll(){let n=!0;for(let e in this.is_legal)n=n&&this.is_legal[e];return n}ngOnInit(){this.congregationsService.getCongregations()}onChangeCongregation(){this.checkCongregation(),this.getUsersByCongregation()}onChangeName(){this.checkName()}onChangePassword(){this.checkPassword()}onSubmit(){this.checkCongregation(),this.checkName(),this.checkPassword(),this.checkAll()&&this.login()}getUsersByCongregation(){this.userService.getUsersByCongregation(this.login_form.congregation).subscribe(n=>{this.names=n})}login(){this.userService.login(this.login_form.name,this.login_form.password).subscribe(n=>{n?this.navService.getNavLinkByAuthority(this.userService.user.authority):(this.login_form.password="",this.is_legal.password=!1)})}}},pyhm:function(n,e,t){"use strict";t.d(e,"a",function(){return o}),t.d(e,"b",function(){return i}),t.d(e,"c",function(){return l}),t.d(e,"d",function(){return a});const l=(n,e)=>null!==e.closest(n),o=n=>"string"==typeof n&&n.length>0?{"ion-color":!0,[`ion-color-${n}`]:!0}:void 0,i=n=>{const e={};return(n=>void 0!==n?(Array.isArray(n)?n:n.split(" ")).filter(n=>null!=n).map(n=>n.trim()).filter(n=>""!==n):[])(n).forEach(n=>e[n]=!0),e},r=/^[a-z][a-z0-9+\-.]*:/,a=async(n,e,t)=>{if(null!=n&&"#"!==n[0]&&!r.test(n)){const l=document.querySelector("ion-router");if(l)return null!=e&&e.preventDefault(),l.push(n,t)}return!1}},tkfp:function(n,e,t){"use strict";t.d(e,"a",function(){return l}),t.d(e,"b",function(){return o});const l=async(n,e,t,l,o)=>{if(n)return n.attachViewToDom(e,t,o,l);if("string"!=typeof t&&!(t instanceof HTMLElement))throw new Error("framework delegate is missing");const i="string"==typeof t?e.ownerDocument&&e.ownerDocument.createElement(t):t;return l&&l.forEach(n=>i.classList.add(n)),o&&Object.assign(i,o),e.appendChild(i),i.componentOnReady&&await i.componentOnReady(),i},o=(n,e)=>{if(e){if(n)return n.removeViewFromDom(e.parentElement,e);e.remove()}return Promise.resolve()}},ue05:function(n,e,t){"use strict";t.d(e,"a",function(){return l});class l{}}}]);