(self.webpackChunkMultiCash=self.webpackChunkMultiCash||[]).push([[6682],{1312:(t,e,n)=>{"use strict";n.d(e,{s:()=>a});var i=n(639),o=n(8583);function r(t,e){if(1&t&&(i.TgZ(0,"span",4),i._uU(1),i.qZA()),2&t){const t=i.oxw();i.xp6(1),i.Oqu(t.subText)}}let a=(()=>{class t{constructor(){this.title="TITULO:",this.little=!1,this.style=""}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-compare"]],inputs:{title:"title",text:"text",subText:"subText",little:"little",style:"style"},decls:6,vars:7,consts:[[1,"compare"],[1,"compare__title"],[1,"compare__text"],["class","compare__subtext",4,"ngIf"],[1,"compare__subtext"]],template:function(t,e){1&t&&(i.TgZ(0,"div",0),i.TgZ(1,"p",1),i._uU(2),i.qZA(),i.TgZ(3,"p",2),i._uU(4),i.YNc(5,r,2,1,"span",3),i.qZA(),i.qZA()),2&t&&(i.Tol(e.style),i.ekj("little",e.little),i.xp6(2),i.Oqu(e.title),i.xp6(2),i.Oqu(e.text),i.xp6(1),i.Q6J("ngIf",e.subText))},directives:[o.O5],styles:[".compare[_ngcontent-%COMP%]{display:flex;flex-flow:row nowrap;justify-content:space-between;font-size:var(--fontSize-body);color:var(--color-dark)}.compare__title[_ngcontent-%COMP%]{font-family:var(--font-work);margin:2px 0;text-align:initial;text-transform:uppercase}.compare__text[_ngcontent-%COMP%]{text-align:right}.compare__subtext[_ngcontent-%COMP%], .compare__text[_ngcontent-%COMP%]{font-family:var(--font-work);font-weight:300;margin:2px 0}.compare.little[_ngcontent-%COMP%]{font-size:.6rem}.compare.accent[_ngcontent-%COMP%]{color:var(--color-accent)}"]}),t})()},9527:(t,e,n)=>{"use strict";n.d(e,{r:()=>s});var i=n(639),o=n(8583);function r(t,e){if(1&t){const t=i.EpF();i.TgZ(0,"div",4),i.NdJ("click",function(){return i.CHM(t),i.oxw().backClicked()}),i._uU(1," < "),i.qZA()}}function a(t,e){if(1&t){const t=i.EpF();i.TgZ(0,"div",5),i.NdJ("click",function(){return i.CHM(t),i.oxw().nextClicked()}),i._uU(1," > "),i.qZA()}}let s=(()=>{class t{constructor(){this.title="Titulo",this.arrows=[!0,!0],this.style="",this.backEvent=new i.vpe,this.nextEvent=new i.vpe}ngOnInit(){}backClicked(){this.backEvent.emit()}nextClicked(){this.nextEvent.emit()}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-title"]],inputs:{title:"title",arrows:"arrows",style:"style"},outputs:{backEvent:"backEvent",nextEvent:"nextEvent"},decls:5,vars:5,consts:[[1,"title"],[1,"title__content"],["class","title__btn left",3,"click",4,"ngIf"],["class","title__btn right",3,"click",4,"ngIf"],[1,"title__btn","left",3,"click"],[1,"title__btn","right",3,"click"]],template:function(t,e){1&t&&(i.TgZ(0,"div",0),i.TgZ(1,"h1",1),i._uU(2),i.qZA(),i.YNc(3,r,2,0,"div",2),i.YNc(4,a,2,0,"div",3),i.qZA()),2&t&&(i.Tol(e.style),i.xp6(2),i.hij(" ",e.title," "),i.xp6(1),i.Q6J("ngIf",e.arrows[0]),i.xp6(1),i.Q6J("ngIf",e.arrows[1]))},directives:[o.O5],styles:["[_nghost-%COMP%]{width:100%}.title[_ngcontent-%COMP%]{position:relative;font-family:var(--font-work);width:100%;margin-bottom:30px;color:var(--color-title)}.title[_ngcontent-%COMP%]   .title__content[_ngcontent-%COMP%]{font-size:var(--fontSize-title);font-weight:300;width:100%;text-align:center;margin:0}.title[_ngcontent-%COMP%]   .title__btn[_ngcontent-%COMP%]{position:absolute;top:50%;transform:translateY(-50%)}.title[_ngcontent-%COMP%]   .title__btn.left[_ngcontent-%COMP%]{left:0}.title[_ngcontent-%COMP%]   .title__btn.right[_ngcontent-%COMP%]{right:0}.title.light[_ngcontent-%COMP%]{color:var(--color-light)}"]}),t})()},6682:(t,e,n)=>{"use strict";n.r(e),n.d(e,{UserDataPageModule:()=>A});var i=n(8583),o=n(665),r=n(1575),a=n(3083),s=n(9445),l=n(4762),c=n(2468),p=n(3313),d=n(639),u=n(6578),g=n(9709),m=n(9527),f=n(1312),h=n(1354);const _=["userDataSwiper"],v=function(){return[!0,!1]};function w(t,e){if(1&t){const t=d.EpF();d.TgZ(0,"div",3),d.TgZ(1,"app-title",4),d.NdJ("backEvent",function(){return d.CHM(t),d.oxw().changeSlide("home")}),d.qZA(),d._UZ(2,"app-compare",5),d.qZA(),d.TgZ(3,"div",6),d.TgZ(4,"app-button",7),d.NdJ("click",function(){return d.CHM(t),d.oxw().calculateTime()}),d.qZA(),d.qZA()}if(2&t){const t=d.oxw();d.xp6(1),d.Q6J("title","Mis datos")("arrows",d.DdM(5,v)),d.xp6(1),d.Q6J("title","Correo:")("text",t.currentUser.email),d.xp6(2),d.Q6J("label","Actualizar Datos")}}function x(t,e){if(1&t&&(d.TgZ(0,"div"),d.TgZ(1,"p",17),d._uU(2),d.qZA(),d.qZA()),2&t){d.oxw();const t=d.MAs(6);d.xp6(2),d.AsE(" ",t.errors.required?"Correo requerido":""," ",t.errors.pattern?"Correo invalido":""," ")}}function C(t,e){if(1&t&&(d.TgZ(0,"div"),d.TgZ(1,"p",17),d._uU(2),d.qZA(),d.qZA()),2&t){d.oxw();const t=d.MAs(12);d.xp6(2),d.hij(" ",t.errors.required?"Este campo es requerido":""," ")}}const b=function(){return{updateOn:"change"}};function M(t,e){if(1&t){const t=d.EpF();d.TgZ(0,"div",3),d.TgZ(1,"app-title",8),d.NdJ("backEvent",function(){return d.CHM(t),d.oxw().changeSlide("back")})("nextEvent",function(){return d.CHM(t),d.oxw().changeSlide("next")}),d.qZA(),d.TgZ(2,"form"),d.TgZ(3,"label",9),d._uU(4,"*Correo:"),d.qZA(),d.TgZ(5,"input",10,11),d.NdJ("ngModelChange",function(e){return d.CHM(t),d.oxw().newEmail=e}),d.qZA(),d.TgZ(7,"div",12),d.YNc(8,x,3,2,"div",13),d.qZA(),d.TgZ(9,"label",9),d._uU(10,"*Telefono"),d.qZA(),d.TgZ(11,"input",14,15),d.NdJ("ngModelChange",function(e){return d.CHM(t),d.oxw().newCelphone=e}),d.qZA(),d.TgZ(13,"div",12),d.YNc(14,C,3,1,"div",13),d.qZA(),d.qZA(),d.qZA(),d.TgZ(15,"div",6),d.TgZ(16,"app-button",16),d.NdJ("click",function(){d.CHM(t);const e=d.MAs(12),n=d.oxw();return e.valid&&n.presentModal()}),d.qZA(),d.qZA()}if(2&t){const t=d.MAs(6),e=d.MAs(12),n=d.oxw();d.xp6(1),d.Q6J("title","Actualiza tus datos")("arrows",d.DdM(14,v)),d.xp6(4),d.ekj("alert",n.displayControl(t)),d.Q6J("ngModel",n.newEmail)("ngModelOptions",d.DdM(15,b)),d.xp6(3),d.Q6J("ngIf",n.displayControl(t)),d.xp6(3),d.ekj("alert",n.displayControl(e)),d.Q6J("ngModel",n.newCelphone)("ngModelOptions",d.DdM(16,b)),d.xp6(3),d.Q6J("ngIf",n.displayControl(e)),d.xp6(2),d.Q6J("label","Actualizar")("disable",!e.valid)}}c.ZP.use([c.eZ]);const Z=[{path:"",component:(()=>{class t{constructor(t,e,n,i){this.navCtrl=t,this.modalCtrl=e,this.storage=n,this.userService=i,this.config={slidesPerView:1,spaceBetween:400,allowTouchMove:!1},this.timerUpdate=0,this.newTimerUpdate=new Date,this.currentUser={email:"",phone:"",timerUpdate:new Date}}ngOnInit(){return(0,l.mG)(this,void 0,void 0,function*(){let t=yield this.storage.get(this.storage.getMemo().CURRENT_USER);this.currentUser.email=t.email,this.currentUser.phone=t.phone,this.currentUser.timerUpdate=t.metadata.timerUpdate,console.log("Time User",t.metadata.timerUpdate)})}calculateTime(){const t=(new Date).getTime(),e=new Date(this.currentUser.timerUpdate).getTime();this.timerUpdate=t-e,console.log("Time",this.timerUpdate,t,e),console.log("Tiempo sumado",(new Date).setDate((new Date).getDate()+183)),this.timerUpdate>=0?this.presentModal():this.presentModalBlock()}presentModal(){return(0,l.mG)(this,void 0,void 0,function*(){const t=yield this.modalCtrl.create({component:p.c,cssClass:"info-modal",componentProps:{icon:"assets/images/pup_land/Email_already.svg",title:"Info",content:"Se actualizaran sus datos, \xbfDesea continuar?",btnCallback:()=>{this.changeSlide("back"),this.navCtrl.navigateForward("/dashboard/configuration")&&this.userService.setTimerUpdate({email:this.currentUser.email,newValues:{metadata:{timerUpdate:(new Date).setDate((new Date).getDate()+183)}}})},btnLabelA:"Si",btnLabel:"No"}});return yield t.present()})}presentModalBlock(){return(0,l.mG)(this,void 0,void 0,function*(){const t=yield this.modalCtrl.create({component:p.c,cssClass:"info-modal",componentProps:{icon:"assets/images/pup_land/Email_already.svg",title:"Info",content:"Podra actualizar sus datos en"+Math.ceil(this.timerUpdate/2.7778*10^6)+"horas",btnCallback:()=>{this.navCtrl.navigateForward("/dashboard/configuration")},btnLabelA:"Entendido"}});return yield t.present()})}changeSlide(t){switch(t){case"home":this.navCtrl.navigateForward("/dashboard/configuration");break;case"next":this.swiper.swiperRef.slideNext(500);break;case"back":this.swiper.swiperRef.slidePrev(500)}}displayControl(t){return t.invalid&&(t.dirty||t.touched)}}return t.\u0275fac=function(e){return new(e||t)(d.Y36(a.SH),d.Y36(a.IN),d.Y36(u.V),d.Y36(g.K))},t.\u0275cmp=d.Xpm({type:t,selectors:[["app-user-data"]],viewQuery:function(t,e){if(1&t&&d.Gf(_,5),2&t){let t;d.iGM(t=d.CRH())&&(e.swiper=t.first)}},decls:5,vars:2,consts:[[3,"config","virtual"],["userDataSwiper",""],["swiperSlide",""],[1,"swiper-slide__container"],[3,"title","arrows","backEvent"],[3,"title","text"],[1,"user-data__btn"],[3,"label","click"],[3,"title","arrows","backEvent","nextEvent"],["for",""],["type","text","name","new_email","autocomplete","off","disabled","true","pattern","^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$","required","",3,"ngModel","ngModelOptions","ngModelChange"],["emailerror","ngModel"],[1,"msg_alert"],[4,"ngIf"],["type","number","name","new_celphone","pattern","[0-9._%+-]{6,}","required","",3,"ngModel","ngModelOptions","ngModelChange"],["celphoneError","ngModel"],[3,"label","disable","click"],[1,"alert"]],template:function(t,e){1&t&&(d.TgZ(0,"ion-content"),d.TgZ(1,"swiper",0,1),d.YNc(3,w,5,6,"ng-template",2),d.YNc(4,M,17,17,"ng-template",2),d.qZA(),d.qZA()),2&t&&(d.xp6(1),d.Q6J("config",e.config)("virtual",!0))},directives:[a.W2,r.nF,r.YC,m.r,f.s,h.r,o._Y,o.JL,o.F,o.Fj,o.c5,o.Q7,o.JJ,o.On,i.O5,o.wV],styles:[".user-data__btn[_ngcontent-%COMP%]{margin-bottom:var(--margin-btn)}"]}),t})()}];let T=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[s.Bz.forChild(Z)],s.Bz]}),t})();var k=n(5642);let A=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[i.ez,o.u5,a.Pc,r.kz,k.K,T]]}),t})()}}]);