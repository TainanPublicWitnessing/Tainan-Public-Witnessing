(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{b80y:function(l,n,e){"use strict";e.r(n);var u=e("8Y7J"),t=e("mrSG"),i=e("p+/S"),o=e("O3pp"),r=e("Ouoq"),a=e("lJxs"),s=e("Xr7G");let b=(()=>{class l{constructor(l){this.firestore=l}getSites(){return this.firestore.collection("Settings").doc("Sites").get().pipe(Object(a.a)(l=>l.data().sites))}}return l.ngInjectableDef=u.Pb({factory:function(){return new l(u.Qb(s.a))},token:l,providedIn:"root"}),l})();var d=e("ZZ/e");class h{constructor(l,n,e,u,t,i,o){this.activatedRoute=l,this.router=n,this.shiftService=e,this.userService=u,this.settingsService=t,this.statisticsService=i,this.alertController=o,this.pageMode="",this.shiftId="",this.report={tracts:0,videos:0,scriptures:0,return_visits:0,agree_visit:0,attendance:0,experience:""},this.time=new Date,this.shift_titleData=["\u65e9\u4e0a","\u4e2d\u5348","\u4e0b\u5348"],this.siteData=[]}ngOnInit(){if(this.shiftId=this.activatedRoute.snapshot.paramMap.get("shiftId"),this.settingsService.getSites().subscribe(l=>{this.siteData=l,console.log(this.siteData)}),this.userService.mess.subscribe(l=>{console.log(l),l.name&&(this.user=l,this.name=l.name.toString(),console.log(this.user),this.getUserTodayShift(this.name))}),null==this.shiftId)this.pageMode="edit",this.userService.user.name&&null==this.user&&(this.user=this.userService.user,this.name=this.userService.user.name.toString(),this.getUserTodayShift(this.name));else{this.pageMode="display";const l=this.shiftId.split("&");this.statisticsService.getReportById(l[0],l[1]).subscribe(l=>{this.name=l.name,this.date=l.date,this.shift_title=l.shift_title,this.site=l.site,this.report=l.report,console.log(l)})}}getUserTodayShift(l){let n=[];console.log(this.time),this.shiftService.getMonthlyShiftByUser(l,this.time).subscribe(l=>{n=l,console.log(n);for(const e of n){const l=new Date(e.date);l.getDate()==this.time.getDate()&&(this.date=l,this.shift_title=e.shift_title,this.site=e.site,console.log(this.date+","+this.shift_title+","+this.site),this.onSelectDate())}})}getShiftReport(){}onSelectDate(){this.displayDay="\u661f\u671f"+"\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".charAt(new Date(this.date).getDay())}onSubmit(){const l={name:this.name,date:this.date,shift_title:this.shift_title,site:this.site,create_on:"",report:{tracts:this.report.tracts,videos:this.report.videos,scriptures:this.report.scriptures,return_visits:this.report.return_visits,agree_visit:this.report.agree_visit,attendance:this.report.attendance,experience:this.report.experience}};console.log(l),this.statisticsService.setReport(l),this.router.navigate(["home"])}checkResport(){null==this.date||null==this.shift_title||null==this.site?this.shiftDataConfirm():this.report.attendance<=0?this.attendanceConfirm():this.reportConfirm()}shiftDataConfirm(){return t.__awaiter(this,void 0,void 0,function*(){const l=yield this.alertController.create({header:"\u63d0\u9192",message:"\u8acb\u586b\u5beb\u73ed\u6b21\u7684\u8cc7\u6599\u5594!",buttons:[{text:"\u597d\u7684!"}]});yield l.present()})}attendanceConfirm(){return t.__awaiter(this,void 0,void 0,function*(){const l=yield this.alertController.create({header:"\u63d0\u9192",message:"\u8acb\u586b\u5beb\u53c3\u8207\u4eba\u6b21\u5594!",buttons:[{text:"\u597d\u7684!"}]});yield l.present()})}reportConfirm(){return t.__awaiter(this,void 0,void 0,function*(){const l=yield this.alertController.create({header:"\u63d0\u4ea4",message:"\u78ba\u8a8d\u8981\u63d0\u4ea4\u5206\u767c\u767b\u8a18?",buttons:[{text:"\u4fee\u6539",role:"cancel",cssClass:"secondary",handler:l=>{}},{text:"\u78ba\u8a8d",handler:()=>{this.onSubmit()}}]});yield l.present()})}}class c{}var g=e("pMnS"),p=e("oBZk"),m=e("EdcL"),C=e("h7RH"),f=e("Af8N"),D=e("10JR"),v=e("s7LF"),k=e("SVse"),q=e("iInd"),x=u.pb({encapsulation:0,styles:[[""]],data:{}});function M(l){return u.Mb(0,[(l()(),u.rb(0,0,null,null,1,"ion-menu-button",[],null,null,null,p.ib,p.z)),u.qb(1,49152,null,0,d.Q,[u.h,u.k,u.x],null,null)],null,null)}function y(l){return u.Mb(0,[(l()(),u.rb(0,0,null,null,2,"ion-back-button",[["defaultHref","/menber-management"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==u.Db(l,2).onClick(e)&&t),t},p.L,p.b)),u.qb(1,49152,null,0,d.f,[u.h,u.k,u.x],{defaultHref:[0,"defaultHref"]},null),u.qb(2,16384,null,0,d.g,[[2,d.gb],d.Fb],{defaultHref:[0,"defaultHref"]},null)],function(l,n){l(n,1,0,"/menber-management"),l(n,2,0,"/menber-management")},null)}function _(l){return u.Mb(0,[(l()(),u.rb(0,0,null,null,4,"ion-buttons",[["slot","primary"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.checkResport()&&u),u},p.N,p.d)),u.qb(1,49152,null,0,d.k,[u.h,u.k,u.x],null,null),(l()(),u.rb(2,0,null,0,2,"ion-button",[],null,null,null,p.M,p.c)),u.qb(3,49152,null,0,d.j,[u.h,u.k,u.x],null,null),(l()(),u.Kb(-1,0,[" \u767b\u8a18 "]))],null,null)}function B(l){return u.Mb(0,[(l()(),u.rb(0,0,null,null,1,"app-login-card",[],null,null,null,m.b,m.a)),u.qb(1,114688,null,0,C.a,[f.a,r.a,D.a],null,null)],function(l,n){l(n,1,0)},null)}function I(l){return u.Mb(0,[(l()(),u.rb(0,0,null,null,2,"ion-select-option",[],null,null,null,p.ob,p.F)),u.qb(1,49152,null,0,d.mb,[u.h,u.k,u.x],{value:[0,"value"]},null),(l()(),u.Kb(2,0,[" "," "]))],function(l,n){l(n,1,0,n.context.$implicit)},function(l,n){l(n,2,0,n.context.$implicit)})}function S(l){return u.Mb(0,[(l()(),u.rb(0,0,null,null,2,"ion-select-option",[],null,null,null,p.ob,p.F)),u.qb(1,49152,null,0,d.mb,[u.h,u.k,u.x],{value:[0,"value"]},null),(l()(),u.Kb(2,0,[" "," "]))],function(l,n){l(n,1,0,n.context.$implicit)},function(l,n){l(n,2,0,n.context.$implicit)})}function H(l){return u.Mb(0,[(l()(),u.rb(0,0,null,null,126,"div",[],null,null,null,null,null)),(l()(),u.rb(1,0,null,null,125,"ion-list",[],null,null,null,p.hb,p.w)),u.qb(2,49152,null,0,d.N,[u.h,u.k,u.x],null,null),(l()(),u.rb(3,0,null,0,2,"ion-list-header",[],null,null,null,p.gb,p.x)),u.qb(4,49152,null,0,d.O,[u.h,u.k,u.x],null,null),(l()(),u.Kb(-1,0,[" \u73ed\u6b21 "])),(l()(),u.rb(6,0,null,0,11,"ion-item",[],null,null,null,p.eb,p.s)),u.qb(7,49152,null,0,d.G,[u.h,u.k,u.x],null,null),(l()(),u.rb(8,0,null,0,6,"ion-datetime",[["cancelText","\u53d6\u6d88"],["displayFormat","YYYY/MM/DD"],["doneText","\u786e\u5b9a"],["placeholder","\u9078\u64c7\u73ed\u8868\u6642\u9593"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionChange"],[null,"ionBlur"]],function(l,n,e){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==u.Db(l,9)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Db(l,9)._handleChangeEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(i.date=e)&&t),"ionChange"===n&&(t=!1!==i.onSelectDate()&&t),t},p.V,p.l)),u.qb(9,16384,null,0,d.Jb,[u.k],null,null),u.Hb(1024,null,v.c,function(l){return[l]},[d.Jb]),u.qb(11,671744,null,0,v.h,[[8,null],[8,null],[8,null],[6,v.c]],{model:[0,"model"]},{update:"ngModelChange"}),u.Hb(2048,null,v.d,null,[v.h]),u.qb(13,16384,null,0,v.e,[[4,v.d]],null,null),u.qb(14,49152,null,0,d.u,[u.h,u.k,u.x],{cancelText:[0,"cancelText"],displayFormat:[1,"displayFormat"],doneText:[2,"doneText"],placeholder:[3,"placeholder"]},null),(l()(),u.rb(15,0,null,0,2,"ion-label",[],null,null,null,p.fb,p.v)),u.qb(16,49152,null,0,d.M,[u.h,u.k,u.x],null,null),(l()(),u.Kb(17,0,["\xa0\xa0",""])),(l()(),u.rb(18,0,null,0,10,"ion-item",[],null,null,null,p.eb,p.s)),u.qb(19,49152,null,0,d.G,[u.h,u.k,u.x],null,null),(l()(),u.rb(20,0,null,0,8,"ion-select",[["cancelText","\u53d6\u6d88"],["doneText","\u786e\u5b9a"],["interface","action-sheet"],["mode","md"],["placeholder","\u9078\u64c7\u73ed\u6b21"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,e){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==u.Db(l,21)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Db(l,21)._handleChangeEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(i.shift_title=e)&&t),t},p.pb,p.E)),u.qb(21,16384,null,0,d.Jb,[u.k],null,null),u.Hb(1024,null,v.c,function(l){return[l]},[d.Jb]),u.qb(23,671744,null,0,v.h,[[8,null],[8,null],[8,null],[6,v.c]],{model:[0,"model"]},{update:"ngModelChange"}),u.Hb(2048,null,v.d,null,[v.h]),u.qb(25,16384,null,0,v.e,[[4,v.d]],null,null),u.qb(26,49152,null,0,d.lb,[u.h,u.k,u.x],{cancelText:[0,"cancelText"],interface:[1,"interface"],interfaceOptions:[2,"interfaceOptions"],mode:[3,"mode"],placeholder:[4,"placeholder"]},null),(l()(),u.gb(16777216,null,0,1,null,I)),u.qb(28,278528,null,0,k.j,[u.M,u.J,u.q],{ngForOf:[0,"ngForOf"]},null),(l()(),u.rb(29,0,null,0,10,"ion-item",[],null,null,null,p.eb,p.s)),u.qb(30,49152,null,0,d.G,[u.h,u.k,u.x],null,null),(l()(),u.rb(31,0,null,0,8,"ion-select",[["cancelText","\u53d6\u6d88"],["doneText","\u786e\u5b9a"],["interface","action-sheet"],["mode","md"],["placeholder","\u9078\u64c7\u5730\u9ede"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,e){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==u.Db(l,32)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Db(l,32)._handleChangeEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(i.site=e)&&t),t},p.pb,p.E)),u.qb(32,16384,null,0,d.Jb,[u.k],null,null),u.Hb(1024,null,v.c,function(l){return[l]},[d.Jb]),u.qb(34,671744,null,0,v.h,[[8,null],[8,null],[8,null],[6,v.c]],{model:[0,"model"]},{update:"ngModelChange"}),u.Hb(2048,null,v.d,null,[v.h]),u.qb(36,16384,null,0,v.e,[[4,v.d]],null,null),u.qb(37,49152,null,0,d.lb,[u.h,u.k,u.x],{cancelText:[0,"cancelText"],interface:[1,"interface"],interfaceOptions:[2,"interfaceOptions"],mode:[3,"mode"],placeholder:[4,"placeholder"]},null),(l()(),u.gb(16777216,null,0,1,null,S)),u.qb(39,278528,null,0,k.j,[u.M,u.J,u.q],{ngForOf:[0,"ngForOf"]},null),(l()(),u.rb(40,0,null,0,2,"ion-list-header",[],null,null,null,p.gb,p.x)),u.qb(41,49152,null,0,d.O,[u.h,u.k,u.x],null,null),(l()(),u.Kb(-1,0,[" \u5206\u767c\u7d71\u8a08 "])),(l()(),u.rb(43,0,null,0,11,"ion-item",[],null,null,null,p.eb,p.s)),u.qb(44,49152,null,0,d.G,[u.h,u.k,u.x],null,null),(l()(),u.rb(45,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,p.fb,p.v)),u.qb(46,49152,null,0,d.M,[u.h,u.k,u.x],{position:[0,"position"]},null),(l()(),u.Kb(-1,0,["\u5370\u5237\u54c1\u548c\u96fb\u5b50\u6a94"])),(l()(),u.rb(48,0,null,0,6,"ion-input",[["inputmode","numeric"],["placeholder","\u8acb\u8f38\u5165\u5370\u5237\u54c1\u548c\u96fb\u5b50\u6a94\u6578\u91cf"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,e){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==u.Db(l,49)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Db(l,49)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(i.report.tracts=e)&&t),t},p.bb,p.r)),u.qb(49,16384,null,0,d.Kb,[u.k],null,null),u.Hb(1024,null,v.c,function(l){return[l]},[d.Kb]),u.qb(51,671744,null,0,v.h,[[8,null],[8,null],[8,null],[6,v.c]],{model:[0,"model"]},{update:"ngModelChange"}),u.Hb(2048,null,v.d,null,[v.h]),u.qb(53,16384,null,0,v.e,[[4,v.d]],null,null),u.qb(54,49152,null,0,d.F,[u.h,u.k,u.x],{inputmode:[0,"inputmode"],placeholder:[1,"placeholder"]},null),(l()(),u.rb(55,0,null,0,11,"ion-item",[],null,null,null,p.eb,p.s)),u.qb(56,49152,null,0,d.G,[u.h,u.k,u.x],null,null),(l()(),u.rb(57,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,p.fb,p.v)),u.qb(58,49152,null,0,d.M,[u.h,u.k,u.x],{position:[0,"position"]},null),(l()(),u.Kb(-1,0,["\u64ad\u653e\u5f71\u7247"])),(l()(),u.rb(60,0,null,0,6,"ion-input",[["inputmode","numeric"],["placeholder","\u8acb\u8f38\u5165\u64ad\u653e\u5f71\u7247\u6578\u91cf"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,e){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==u.Db(l,61)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Db(l,61)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(i.report.videos=e)&&t),t},p.bb,p.r)),u.qb(61,16384,null,0,d.Kb,[u.k],null,null),u.Hb(1024,null,v.c,function(l){return[l]},[d.Kb]),u.qb(63,671744,null,0,v.h,[[8,null],[8,null],[8,null],[6,v.c]],{model:[0,"model"]},{update:"ngModelChange"}),u.Hb(2048,null,v.d,null,[v.h]),u.qb(65,16384,null,0,v.e,[[4,v.d]],null,null),u.qb(66,49152,null,0,d.F,[u.h,u.k,u.x],{inputmode:[0,"inputmode"],placeholder:[1,"placeholder"]},null),(l()(),u.rb(67,0,null,0,11,"ion-item",[],null,null,null,p.eb,p.s)),u.qb(68,49152,null,0,d.G,[u.h,u.k,u.x],null,null),(l()(),u.rb(69,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,p.fb,p.v)),u.qb(70,49152,null,0,d.M,[u.h,u.k,u.x],{position:[0,"position"]},null),(l()(),u.Kb(-1,0,["\u5206\u4eab\u7d93\u6587"])),(l()(),u.rb(72,0,null,0,6,"ion-input",[["inputmode","numeric"],["placeholder","\u8acb\u8f38\u5165\u5206\u4eab\u7d93\u6587\u6578\u91cf"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,e){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==u.Db(l,73)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Db(l,73)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(i.report.scriptures=e)&&t),t},p.bb,p.r)),u.qb(73,16384,null,0,d.Kb,[u.k],null,null),u.Hb(1024,null,v.c,function(l){return[l]},[d.Kb]),u.qb(75,671744,null,0,v.h,[[8,null],[8,null],[8,null],[6,v.c]],{model:[0,"model"]},{update:"ngModelChange"}),u.Hb(2048,null,v.d,null,[v.h]),u.qb(77,16384,null,0,v.e,[[4,v.d]],null,null),u.qb(78,49152,null,0,d.F,[u.h,u.k,u.x],{inputmode:[0,"inputmode"],placeholder:[1,"placeholder"]},null),(l()(),u.rb(79,0,null,0,11,"ion-item",[],null,null,null,p.eb,p.s)),u.qb(80,49152,null,0,d.G,[u.h,u.k,u.x],null,null),(l()(),u.rb(81,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,p.fb,p.v)),u.qb(82,49152,null,0,d.M,[u.h,u.k,u.x],{position:[0,"position"]},null),(l()(),u.Kb(-1,0,["\u7e8c\u8a2a\u6578\u76ee"])),(l()(),u.rb(84,0,null,0,6,"ion-input",[["inputmode","numeric"],["placeholder","\u8acb\u8f38\u5165\u7e8c\u8a2a\u6578\u76ee"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,e){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==u.Db(l,85)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Db(l,85)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(i.report.return_visits=e)&&t),t},p.bb,p.r)),u.qb(85,16384,null,0,d.Kb,[u.k],null,null),u.Hb(1024,null,v.c,function(l){return[l]},[d.Kb]),u.qb(87,671744,null,0,v.h,[[8,null],[8,null],[8,null],[6,v.c]],{model:[0,"model"]},{update:"ngModelChange"}),u.Hb(2048,null,v.d,null,[v.h]),u.qb(89,16384,null,0,v.e,[[4,v.d]],null,null),u.qb(90,49152,null,0,d.F,[u.h,u.k,u.x],{inputmode:[0,"inputmode"],placeholder:[1,"placeholder"]},null),(l()(),u.rb(91,0,null,0,11,"ion-item",[],null,null,null,p.eb,p.s)),u.qb(92,49152,null,0,d.G,[u.h,u.k,u.x],null,null),(l()(),u.rb(93,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,p.fb,p.v)),u.qb(94,49152,null,0,d.M,[u.h,u.k,u.x],{position:[0,"position"]},null),(l()(),u.Kb(-1,0,["\u540c\u610f\u62dc\u8a2a"])),(l()(),u.rb(96,0,null,0,6,"ion-input",[["inputmode","numeric"],["placeholder","\u8acb\u8f38\u5165\u540c\u610f\u62dc\u8a2a\u6578\u91cf"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,e){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==u.Db(l,97)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Db(l,97)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(i.report.agree_visit=e)&&t),t},p.bb,p.r)),u.qb(97,16384,null,0,d.Kb,[u.k],null,null),u.Hb(1024,null,v.c,function(l){return[l]},[d.Kb]),u.qb(99,671744,null,0,v.h,[[8,null],[8,null],[8,null],[6,v.c]],{model:[0,"model"]},{update:"ngModelChange"}),u.Hb(2048,null,v.d,null,[v.h]),u.qb(101,16384,null,0,v.e,[[4,v.d]],null,null),u.qb(102,49152,null,0,d.F,[u.h,u.k,u.x],{inputmode:[0,"inputmode"],placeholder:[1,"placeholder"]},null),(l()(),u.rb(103,0,null,0,11,"ion-item",[],null,null,null,p.eb,p.s)),u.qb(104,49152,null,0,d.G,[u.h,u.k,u.x],null,null),(l()(),u.rb(105,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,p.fb,p.v)),u.qb(106,49152,null,0,d.M,[u.h,u.k,u.x],{position:[0,"position"]},null),(l()(),u.Kb(-1,0,["\u53c3\u8207\u4eba\u6b21"])),(l()(),u.rb(108,0,null,0,6,"ion-input",[["inputmode","numeric"],["placeholder","\u8acb\u8f38\u5165\u53c3\u8207\u4eba\u6b21"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,e){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==u.Db(l,109)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Db(l,109)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(i.report.attendance=e)&&t),t},p.bb,p.r)),u.qb(109,16384,null,0,d.Kb,[u.k],null,null),u.Hb(1024,null,v.c,function(l){return[l]},[d.Kb]),u.qb(111,671744,null,0,v.h,[[8,null],[8,null],[8,null],[6,v.c]],{model:[0,"model"]},{update:"ngModelChange"}),u.Hb(2048,null,v.d,null,[v.h]),u.qb(113,16384,null,0,v.e,[[4,v.d]],null,null),u.qb(114,49152,null,0,d.F,[u.h,u.k,u.x],{inputmode:[0,"inputmode"],placeholder:[1,"placeholder"]},null),(l()(),u.rb(115,0,null,0,11,"ion-item",[],null,null,null,p.eb,p.s)),u.qb(116,49152,null,0,d.G,[u.h,u.k,u.x],null,null),(l()(),u.rb(117,0,null,0,2,"ion-label",[["position","stacked"]],null,null,null,p.fb,p.v)),u.qb(118,49152,null,0,d.M,[u.h,u.k,u.x],{position:[0,"position"]},null),(l()(),u.Kb(-1,0,["\u5982\u679c\u826f\u597d\u7684\u7d93\u9a57\uff0c\u53ef\u4ee5\u5206\u4eab\u55ce\uff1f(\u8acb\u8a18\u4e0b\u50b3\u9053\u54e1\u59d3\u540d)"])),(l()(),u.rb(120,0,null,0,6,"ion-input",[["inputmode","text"],["placeholder","\u8acb\u8f38\u5165\u50b3\u9053\u54e1\u59d3\u540d"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,e){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==u.Db(l,121)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u.Db(l,121)._handleInputEvent(e.target)&&t),"ngModelChange"===n&&(t=!1!==(i.report.experience=e)&&t),t},p.bb,p.r)),u.qb(121,16384,null,0,d.Kb,[u.k],null,null),u.Hb(1024,null,v.c,function(l){return[l]},[d.Kb]),u.qb(123,671744,null,0,v.h,[[8,null],[8,null],[8,null],[6,v.c]],{model:[0,"model"]},{update:"ngModelChange"}),u.Hb(2048,null,v.d,null,[v.h]),u.qb(125,16384,null,0,v.e,[[4,v.d]],null,null),u.qb(126,49152,null,0,d.F,[u.h,u.k,u.x],{inputmode:[0,"inputmode"],placeholder:[1,"placeholder"]},null)],function(l,n){var e=n.component;l(n,11,0,e.date),l(n,14,0,"\u53d6\u6d88","YYYY/MM/DD","\u786e\u5b9a","\u9078\u64c7\u73ed\u8868\u6642\u9593"),l(n,23,0,e.shift_title),l(n,26,0,"\u53d6\u6d88","action-sheet","customActionSheetOptions","md","\u9078\u64c7\u73ed\u6b21"),l(n,28,0,e.shift_titleData),l(n,34,0,e.site),l(n,37,0,"\u53d6\u6d88","action-sheet","customActionSheetOptions","md","\u9078\u64c7\u5730\u9ede"),l(n,39,0,e.siteData),l(n,46,0,"stacked"),l(n,51,0,e.report.tracts),l(n,54,0,"numeric","\u8acb\u8f38\u5165\u5370\u5237\u54c1\u548c\u96fb\u5b50\u6a94\u6578\u91cf"),l(n,58,0,"stacked"),l(n,63,0,e.report.videos),l(n,66,0,"numeric","\u8acb\u8f38\u5165\u64ad\u653e\u5f71\u7247\u6578\u91cf"),l(n,70,0,"stacked"),l(n,75,0,e.report.scriptures),l(n,78,0,"numeric","\u8acb\u8f38\u5165\u5206\u4eab\u7d93\u6587\u6578\u91cf"),l(n,82,0,"stacked"),l(n,87,0,e.report.return_visits),l(n,90,0,"numeric","\u8acb\u8f38\u5165\u7e8c\u8a2a\u6578\u76ee"),l(n,94,0,"stacked"),l(n,99,0,e.report.agree_visit),l(n,102,0,"numeric","\u8acb\u8f38\u5165\u540c\u610f\u62dc\u8a2a\u6578\u91cf"),l(n,106,0,"stacked"),l(n,111,0,e.report.attendance),l(n,114,0,"numeric","\u8acb\u8f38\u5165\u53c3\u8207\u4eba\u6b21"),l(n,118,0,"stacked"),l(n,123,0,e.report.experience),l(n,126,0,"text","\u8acb\u8f38\u5165\u50b3\u9053\u54e1\u59d3\u540d")},function(l,n){var e=n.component;l(n,8,0,u.Db(n,13).ngClassUntouched,u.Db(n,13).ngClassTouched,u.Db(n,13).ngClassPristine,u.Db(n,13).ngClassDirty,u.Db(n,13).ngClassValid,u.Db(n,13).ngClassInvalid,u.Db(n,13).ngClassPending),l(n,17,0,e.displayDay),l(n,20,0,u.Db(n,25).ngClassUntouched,u.Db(n,25).ngClassTouched,u.Db(n,25).ngClassPristine,u.Db(n,25).ngClassDirty,u.Db(n,25).ngClassValid,u.Db(n,25).ngClassInvalid,u.Db(n,25).ngClassPending),l(n,31,0,u.Db(n,36).ngClassUntouched,u.Db(n,36).ngClassTouched,u.Db(n,36).ngClassPristine,u.Db(n,36).ngClassDirty,u.Db(n,36).ngClassValid,u.Db(n,36).ngClassInvalid,u.Db(n,36).ngClassPending),l(n,48,0,u.Db(n,53).ngClassUntouched,u.Db(n,53).ngClassTouched,u.Db(n,53).ngClassPristine,u.Db(n,53).ngClassDirty,u.Db(n,53).ngClassValid,u.Db(n,53).ngClassInvalid,u.Db(n,53).ngClassPending),l(n,60,0,u.Db(n,65).ngClassUntouched,u.Db(n,65).ngClassTouched,u.Db(n,65).ngClassPristine,u.Db(n,65).ngClassDirty,u.Db(n,65).ngClassValid,u.Db(n,65).ngClassInvalid,u.Db(n,65).ngClassPending),l(n,72,0,u.Db(n,77).ngClassUntouched,u.Db(n,77).ngClassTouched,u.Db(n,77).ngClassPristine,u.Db(n,77).ngClassDirty,u.Db(n,77).ngClassValid,u.Db(n,77).ngClassInvalid,u.Db(n,77).ngClassPending),l(n,84,0,u.Db(n,89).ngClassUntouched,u.Db(n,89).ngClassTouched,u.Db(n,89).ngClassPristine,u.Db(n,89).ngClassDirty,u.Db(n,89).ngClassValid,u.Db(n,89).ngClassInvalid,u.Db(n,89).ngClassPending),l(n,96,0,u.Db(n,101).ngClassUntouched,u.Db(n,101).ngClassTouched,u.Db(n,101).ngClassPristine,u.Db(n,101).ngClassDirty,u.Db(n,101).ngClassValid,u.Db(n,101).ngClassInvalid,u.Db(n,101).ngClassPending),l(n,108,0,u.Db(n,113).ngClassUntouched,u.Db(n,113).ngClassTouched,u.Db(n,113).ngClassPristine,u.Db(n,113).ngClassDirty,u.Db(n,113).ngClassValid,u.Db(n,113).ngClassInvalid,u.Db(n,113).ngClassPending),l(n,120,0,u.Db(n,125).ngClassUntouched,u.Db(n,125).ngClassTouched,u.Db(n,125).ngClassPristine,u.Db(n,125).ngClassDirty,u.Db(n,125).ngClassValid,u.Db(n,125).ngClassInvalid,u.Db(n,125).ngClassPending)})}function K(l){return u.Mb(0,[(l()(),u.rb(0,0,null,null,14,"ion-header",[],null,null,null,p.X,p.n)),u.qb(1,49152,null,0,d.A,[u.h,u.k,u.x],null,null),(l()(),u.rb(2,0,null,0,12,"ion-toolbar",[["color","primary"]],null,null,null,p.tb,p.J)),u.qb(3,49152,null,0,d.Ab,[u.h,u.k,u.x],{color:[0,"color"]},null),(l()(),u.rb(4,0,null,0,5,"ion-buttons",[["slot","start"]],null,null,null,p.N,p.d)),u.qb(5,49152,null,0,d.k,[u.h,u.k,u.x],null,null),(l()(),u.gb(16777216,null,0,1,null,M)),u.qb(7,16384,null,0,k.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.gb(16777216,null,0,1,null,y)),u.qb(9,16384,null,0,k.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.rb(10,0,null,0,2,"ion-title",[],null,null,null,p.sb,p.I)),u.qb(11,49152,null,0,d.yb,[u.h,u.k,u.x],null,null),(l()(),u.Kb(-1,0,[" \u767c\u5206\u767b\u8a18 "])),(l()(),u.gb(16777216,null,0,1,null,_)),u.qb(14,16384,null,0,k.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.rb(15,0,null,null,5,"ion-content",[],null,null,null,p.U,p.k)),u.qb(16,49152,null,0,d.t,[u.h,u.k,u.x],null,null),(l()(),u.gb(16777216,null,0,1,null,B)),u.qb(18,16384,null,0,k.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.gb(16777216,null,0,1,null,H)),u.qb(20,16384,null,0,k.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null)],function(l,n){var e=n.component;l(n,3,0,"primary"),l(n,7,0,"edit"==e.pageMode),l(n,9,0,"display"==e.pageMode),l(n,14,0,e.userService.user.name),l(n,18,0,!e.userService.user.name),l(n,20,0,e.userService.user.name)},null)}function T(l){return u.Mb(0,[(l()(),u.rb(0,0,null,null,1,"app-shift-report",[],null,null,null,K,x)),u.qb(1,114688,null,0,h,[q.a,q.m,i.a,r.a,b,o.a,d.a],null,null)],function(l,n){l(n,1,0)},null)}var E=u.nb("app-shift-report",h,T,{},{},[]),P=e("ue05");e.d(n,"ShiftReportPageModuleNgFactory",function(){return F});var F=u.ob(c,[],function(l){return u.Ab([u.Bb(512,u.j,u.Z,[[8,[g.a,E]],[3,u.j],u.v]),u.Bb(4608,k.m,k.l,[u.s,[2,k.t]]),u.Bb(4608,v.j,v.j,[]),u.Bb(4608,d.b,d.b,[u.x,u.g]),u.Bb(4608,d.Eb,d.Eb,[d.b,u.j,u.p]),u.Bb(4608,d.Hb,d.Hb,[d.b,u.j,u.p]),u.Bb(1073742336,k.b,k.b,[]),u.Bb(1073742336,v.i,v.i,[]),u.Bb(1073742336,v.b,v.b,[]),u.Bb(1073742336,d.Cb,d.Cb,[]),u.Bb(1073742336,P.a,P.a,[]),u.Bb(1073742336,q.o,q.o,[[2,q.t],[2,q.m]]),u.Bb(1073742336,c,c,[]),u.Bb(1024,q.k,function(){return[[{path:"",component:h}]]},[])])})}}]);