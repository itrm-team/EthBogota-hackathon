(self.webpackChunkMultiCash=self.webpackChunkMultiCash||[]).push([[2524],{2524:(t,e,i)=>{"use strict";i.r(e),i.d(e,{ActivityPageModule:()=>F});var n=i(8583),a=i(665),s=i(3083),r=i(9445),o=i(4762),c=i(639),l=i(9005),u=i(6578);const p=["search"];function g(t,e){if(1&t&&(c.ynx(0),c.TgZ(1,"option",16),c._uU(2),c.qZA(),c.BQk()),2&t){const t=e.$implicit;c.xp6(1),c.Q6J("value",t.type),c.xp6(1),c.Oqu(t.type)}}function d(t,e){if(1&t&&(c.TgZ(0,"div"),c._UZ(1,"app-list",17),c.qZA()),2&t){const t=e.$implicit;c.xp6(1),c.Q6J("list",t.list)("date",t.date)}}let m=(()=>{class t{constructor(t,e){this.transactionServ=t,this.storage=e,this.maximumDate=this.formatISODateToViewDate((new Date).toISOString()),this.startingFilterDate="2018-01-01",this.endingFilterDate=this.maximumDate.year+"-"+this.maximumDate.month+"-"+this.maximumDate.day,this.activityList=[],this.usernameFilter="",this.typeFilter="",this.transactionTypes=[],this.activityListView=[],this.transactionStatus=[]}ionViewWillEnter(){return(0,o.mG)(this,void 0,void 0,function*(){this.transactionTypes=yield this.transactionServ.getTransactionTypes();const t=yield this.storage.get(this.storage.getMemo().CURRENT_USER);this.transactionServ.getUserTransactions(t,t=>{this.activityList=this.formatTransactionsForListing(t),this.activityListView=JSON.parse(JSON.stringify(this.activityList))})})}ngOnInit(){}areDatesEqual(t,e){return t.day==e.day&&t.month==e.month&&t.year==e.year}isDateBetweenDates(t,e,i){return t>=e&&t<=i}formatTransactionsForListing(t){let e=[],i="";for(let n=0;n<t.length;n++){const a=t[n];a.date=this.formatISODateToViewDate(a.transaction_time),this.areDatesEqual(a.date,i)&&""!=i?e[e.length-1].list.push({type:a.TransactionType.type,status:a.TransactionStatus.status,user:a.User.email,info:a.total.toFixed(2)}):(e.push({date:a.date.day+"."+a.date.month+"."+a.date.year,list:[{type:a.TransactionType.type,status:a.TransactionStatus.status,user:a.User.email,info:a.total.toFixed(2)}]}),i=a.date)}return e}getFormattedDay(t){return t>9?t:"0"+t}getFormattedMonth(t){return t>9?t:"0"+t}formatISODateToViewDate(t){let e=t.substring(0,4),i=t.substring(5,7),n=t.substring(8,10);return{day:this.getFormattedDay(parseInt(n)),month:this.getFormattedMonth(parseInt(i)),year:e}}toggleSearch(){this.searchContainer.nativeElement.classList.toggle("close")}revertFormatOfDateString(t){let e=parseInt(t.substring(0,2)),i=parseInt(t.substring(3,5)),n=t.substring(6,10);return new Date(i+"-"+e+"-"+n)}checkIfDateIsInRange(t){const e=this.startingFilterDate.split("-"),i=this.endingFilterDate.split("-"),n=e[1]+"-"+e[2]+"-"+e[0],a=i[1]+"-"+i[2]+"-"+i[0];return this.isDateBetweenDates(this.revertFormatOfDateString(t.date),new Date(n),new Date(a))}getUsernameAndTypeFilteredList(t){let e=[];for(let i=0;i<t.length;i++)t[i].user.includes(this.usernameFilter)&&t[i].type.includes(this.typeFilter)&&e.push(t[i]);return e}filterTransactions(){this.activityListView=this.getActivityListView()}getActivityListView(){let t=JSON.parse(JSON.stringify(this.activityList)).filter(t=>this.checkIfDateIsInRange(t));for(let e=0;e<t.length;e++)t[e].list=this.getUsernameAndTypeFilteredList(t[e].list);return t}}return t.\u0275fac=function(e){return new(e||t)(c.Y36(l.p),c.Y36(u.V))},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-activity"]],viewQuery:function(t,e){if(1&t&&c.Gf(p,5),2&t){let t;c.iGM(t=c.CRH())&&(e.searchContainer=t.first)}},decls:30,vars:13,consts:[[1,"activity"],[1,"activity__title"],[1,"activity__title-btn"],[3,"isIcon","icon","click"],[1,"activity__search","close"],["search",""],[1,"form__date-range"],["for",""],["type","date","id","start","name","start","name","trip-start",3,"ngModel","min","max","ngModelChange"],["type","date","id","end","name","end","name","trip-start",3,"ngModel","min","max","ngModelChange"],["type","text","name","usernameFilter","placeholder","Nombre",3,"ngModel","ngModelChange"],["name","typeFilter",3,"ngModel","ngModelChange"],["value",""],[4,"ngFor","ngForOf"],[1,"activity__search-btn"],[3,"label","click"],[3,"value"],[3,"list","date"]],template:function(t,e){1&t&&(c.TgZ(0,"ion-content"),c.TgZ(1,"div",0),c.TgZ(2,"h2",1),c._uU(3,"Actividad "),c.TgZ(4,"div",2),c.TgZ(5,"app-button",3),c.NdJ("click",function(){return e.toggleSearch()}),c.qZA(),c.qZA(),c.qZA(),c.TgZ(6,"div",4,5),c.TgZ(8,"form"),c.TgZ(9,"div",6),c.TgZ(10,"div"),c.TgZ(11,"label",7),c._uU(12,"Fecha inicial"),c.qZA(),c.TgZ(13,"input",8),c.NdJ("ngModelChange",function(t){return e.startingFilterDate=t}),c.qZA(),c.qZA(),c.TgZ(14,"div"),c.TgZ(15,"label",7),c._uU(16,"Fecha final"),c.qZA(),c.TgZ(17,"input",9),c.NdJ("ngModelChange",function(t){return e.endingFilterDate=t}),c.qZA(),c.qZA(),c.qZA(),c.TgZ(18,"label",7),c._uU(19,"Nombre"),c.qZA(),c.TgZ(20,"input",10),c.NdJ("ngModelChange",function(t){return e.usernameFilter=t}),c.qZA(),c.TgZ(21,"label",7),c._uU(22,"Tipo de operaci\xf3n"),c.qZA(),c.TgZ(23,"select",11),c.NdJ("ngModelChange",function(t){return e.typeFilter=t}),c.TgZ(24,"option",12),c._uU(25,"Ninguno"),c.qZA(),c.YNc(26,g,3,2,"ng-container",13),c.qZA(),c.qZA(),c.TgZ(27,"div",14),c.TgZ(28,"app-button",15),c.NdJ("click",function(){return e.filterTransactions()}),c.qZA(),c.qZA(),c.qZA(),c.YNc(29,d,2,2,"div",13),c.qZA(),c.qZA()),2&t&&(c.xp6(5),c.Q6J("isIcon",!0)("icon","search-outline"),c.xp6(8),c.Q6J("ngModel",e.startingFilterDate)("min","2018-01-01")("max",e.maximumDate.year+"-"+e.maximumDate.month+"-"+e.maximumDate.day),c.xp6(4),c.Q6J("ngModel",e.endingFilterDate)("min","2018-01-01")("max",e.maximumDate.year+"-"+e.maximumDate.month+"-"+e.maximumDate.day),c.xp6(3),c.Q6J("ngModel",e.usernameFilter),c.xp6(3),c.Q6J("ngModel",e.typeFilter),c.xp6(3),c.Q6J("ngForOf",e.transactionTypes),c.xp6(2),c.Q6J("label","Buscar"),c.xp6(1),c.Q6J("ngForOf",e.activityListView))},styles:[".activity[_ngcontent-%COMP%]{padding-top:30px}.activity__title[_ngcontent-%COMP%]{position:relative;font-family:var(--font-work);color:var(--color-dark);font-size:1.3rem;font-weight:400;margin-top:0;letter-spacing:1px}.activity__title-btn[_ngcontent-%COMP%]{position:absolute;right:0;top:0;transform:translateY(-20%)}.activity__search[_ngcontent-%COMP%]{padding-bottom:15px;height:100%;overflow:hidden}.activity__search-btn[_ngcontent-%COMP%]{display:flex;justify-content:center;margin:30px 0}.activity__search.close[_ngcontent-%COMP%]{height:0}"]}),t})();const h=[{path:"",component:m}];let f=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[r.Bz.forChild(h)],r.Bz]}),t})();var y=i(5642),v=i(1354),T=i(3313),Z=i(6945);function _(t,e){if(1&t&&(c.TgZ(0,"div",3),c._uU(1),c.qZA()),2&t){const t=c.oxw();c.xp6(1),c.hij(" ",t.date," ")}}function b(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"div",4),c.TgZ(1,"app-button-link",5,6),c.NdJ("click",function(){const e=c.CHM(t).$implicit,i=c.oxw();return i.presentModal(i.date,e.type,e.info,e.status)}),c.qZA(),c.qZA()}if(2&t){const t=e.$implicit,i=e.index,n=c.oxw();c.xp6(1),c.Q6J("mode","list")("label",t.user)("icon",n.getIcon(t.type))("subLabel",t.type)("status",t.status)("info",t.info)("outline",0===i?"both":"bottom")}}let x=(()=>{class t{constructor(t){this.modalCtrl=t}ngOnInit(){}getIcon(t){return this.active=!0,{Transferencia:"B",Retiro:"D",Recompensa:"A",Deposito:"E",Compra:"C",Venta:"L"}[t]}presentModal(t,e,i,n){return(0,o.mG)(this,void 0,void 0,function*(){const a=yield this.modalCtrl.create({component:T.c,cssClass:"info-modal",componentProps:{icon:"assets/images/pup_land/Frame.svg",title:"Detalle de transacci\xf3n",content:`<p>Tipo de transacci\xf3n: ${e}</p>\n                    <p>Fecha de la transacci\xf3n: ${t}</p>\n                    <p>Estado de la transacci\xf3n: ${n}</p>\n                    <p>Cantidad de la transacci\xf3n: ${i}</p>`,btnLabel:"Entendido"}});return yield a.present()})}}return t.\u0275fac=function(e){return new(e||t)(c.Y36(s.IN))},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-list"]],inputs:{list:"list",date:"date"},decls:3,vars:2,consts:[[1,"list"],["class","list__date",4,"ngIf"],["class","list__items",4,"ngFor","ngForOf"],[1,"list__date"],[1,"list__items"],[3,"mode","label","icon","subLabel","status","info","outline","click"],["active",""]],template:function(t,e){1&t&&(c.TgZ(0,"div",0),c.YNc(1,_,2,1,"div",1),c.YNc(2,b,3,7,"div",2),c.qZA()),2&t&&(c.xp6(1),c.Q6J("ngIf",e.active),c.xp6(1),c.Q6J("ngForOf",e.list))},directives:[n.O5,n.sg,Z.j],styles:[".list[_ngcontent-%COMP%]{padding-bottom:20px}.list__date[_ngcontent-%COMP%]{font-size:.75rem;opacity:.7;padding-bottom:10px;letter-spacing:1px}"]}),t})(),F=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[n.ez,a.u5,s.Pc,y.K,f]]}),t})();c.B6R(m,[s.W2,v.r,a._Y,a.JL,a.F,a.Fj,a.JJ,a.On,a.EJ,a.YN,a.Kr,n.sg,x],[])},9005:(t,e,i)=>{"use strict";i.d(e,{p:()=>s});var n=i(639),a=i(1228);let s=(()=>{class t{constructor(t){this.connection=t}insertTransaction(t,e){this.requestPost("/api/createTransaction",t).subscribe(t=>{e(t)},t=>{throw new Error(t)})}getUserTransactions(t,e){this.requestGet(`/api/getTransactionsOfUser?id_user=${t.id_user}`,t).subscribe(t=>{e(t)},t=>{throw new Error(t)})}getTransactionTypes(){return new Promise((t,e)=>{this.requestGet("/api/getTransactionTypes",{}).subscribe(e=>{t(e)},e=>{throw t([]),new Error(e)})})}getTransactionStatus(){return new Promise((t,e)=>{this.requestGet("/api/getTransactionStatuses",{}).subscribe(e=>{t(e)},e=>{throw t([]),new Error(e)})})}requestGet(t,e){return this.connection.requestGet(t,e,(t,e)=>{})}requestPost(t,e){return this.connection.requestPost(t,e,(t,e)=>{})}}return t.\u0275fac=function(e){return new(e||t)(n.LFG(a.e))},t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);