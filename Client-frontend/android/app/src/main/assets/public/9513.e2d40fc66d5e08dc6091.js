(self.webpackChunkMultiCash=self.webpackChunkMultiCash||[]).push([[9513],{9513:(e,o,r)=>{"use strict";r.r(o),r.d(o,{RecoverPageModule:()=>M});var n=r(8583),t=r(665),i=r(1575),a=r(3083),s=r(9445),l=r(4762),c=r(2468),d=r(3313),u=r(639),p=r(9709),g=r(4429),m=r(9527),f=r(1354);const h=["recoverSwiper"];function v(e,o){if(1&e&&(u.TgZ(0,"div"),u.TgZ(1,"p",15),u._uU(2),u.qZA(),u.qZA()),2&e){u.oxw();const e=u.MAs(13);u.xp6(2),u.AsE(" ",e.errors.required?"Digite un email":""," ",e.errors.pattern?"Email invalido":""," ")}}const w=function(){return{updateOn:"change"}};function b(e,o){if(1&e){const e=u.EpF();u.TgZ(0,"div",3),u.TgZ(1,"app-title",4),u.NdJ("backEvent",function(){return u.CHM(e),u.oxw().changeSlide("home")}),u.qZA(),u.TgZ(2,"form",5,6),u.TgZ(4,"p",7),u._uU(5," Enviaremos un link de recuperaci\xf3n a tu correo registrado "),u._UZ(6,"br"),u._uU(7,"para verificar que tienes acceso."),u._UZ(8,"br"),u.qZA(),u.TgZ(9,"label",8),u._uU(10,"*Correo electr\xf3nico"),u.qZA(),u.TgZ(11,"input",9,10),u.NdJ("ngModelChange",function(o){return u.CHM(e),u.oxw().account.email=o}),u.qZA(),u.TgZ(14,"div",11),u.YNc(15,v,3,2,"div",12),u.qZA(),u.qZA(),u.qZA(),u.TgZ(16,"div",13),u.TgZ(17,"app-button",14),u.NdJ("click",function(){u.CHM(e);const o=u.MAs(13),r=u.oxw();return o.valid&&r.recover()}),u.qZA(),u.qZA()}if(2&e){const e=u.MAs(13),o=u.oxw();u.xp6(1),u.Q6J("title","Ingrese tu correo electr\xf3nico"),u.xp6(10),u.Q6J("ngModel",o.account.email)("ngModelOptions",u.DdM(6,w)),u.xp6(4),u.Q6J("ngIf",e.invalid&&(e.dirty||e.touched)),u.xp6(2),u.Q6J("label","Enviar")("disable",!e.valid)}}c.ZP.use([c.eZ]);const C=[{path:"",component:(()=>{class e{constructor(e,o,r,n,t){this.navCtrl=e,this.user=o,this.toastCtrl=r,this.modalCtrl=n,this.emailManager=t,this.account={email:"",username:"",idaccount:"",password:""},this.config={slidesPerView:1,spaceBetween:400,allowTouchMove:!1}}ngOnInit(){}changeSlide(e){switch(console.log("swiper: ",this.swiper),e){case"home":this.navCtrl.navigateForward("");break;case"next":this.swiper.swiperRef.slideNext(500);break;case"back":this.swiper.swiperRef.slidePrev(500)}}presentErrorToast(){return(0,l.mG)(this,void 0,void 0,function*(){(yield this.toastCtrl.create({message:this.loginErrorString,duration:3e3,position:"top"})).present()})}getUserPromise(e){return(0,l.mG)(this,void 0,void 0,function*(){yield this.user.getUserPromise(e)})}recover(){return this.presentModal(),new Promise(e=>{this.emailManager.sendConfirmationEmailForRecover({email:this.account.email},o=>{console.log("confirmation send",o),e(!0),this.navCtrl.navigateForward("")})})}presentModal(){return(0,l.mG)(this,void 0,void 0,function*(){const e=yield this.modalCtrl.create({component:d.c,cssClass:"info-modal",componentProps:{icon:"assets/images/pup_land/Email_1.svg",title:"Se enviar\xe1 un link de recuperaci\xf3n a tu correo",content:"Al dar aceptar, enviaremos un link de recuperaci\xf3n a tu correo. Ten a la mano las preguntas de seguridad que fijaste al momento de crear la cuenta. ",btnLabel:"Aceptar"}});return yield e.present()})}}return e.\u0275fac=function(o){return new(o||e)(u.Y36(a.SH),u.Y36(p.K),u.Y36(a.yF),u.Y36(a.IN),u.Y36(g.H))},e.\u0275cmp=u.Xpm({type:e,selectors:[["app-recover"]],viewQuery:function(e,o){if(1&e&&u.Gf(h,5),2&e){let e;u.iGM(e=u.CRH())&&(o.swiper=e.first)}},decls:4,vars:2,consts:[[3,"config","virtual"],["recoverSwiper",""],["swiperSlide",""],[1,"swiper-slide__container"],[3,"title","backEvent"],["novalidate",""],["verificationForm","ngForm"],[1,"p","center","pad-b"],["for","sign-up_email"],["name","email","type","email","required","","spellcheck","false","autocapitalize","off","autocomplete","off","placeholder","Correo electr\xf3nico","pattern","^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",1,"input",3,"ngModel","ngModelOptions","ngModelChange"],["emailAddress","ngModel","emailerror","ngModel"],[1,"msg_alert"],[4,"ngIf"],[1,"recover__btn"],[3,"label","disable","click"],[1,"alert"]],template:function(e,o){1&e&&(u.TgZ(0,"ion-content"),u.TgZ(1,"swiper",0,1),u.YNc(3,b,18,7,"ng-template",2),u.qZA(),u.qZA()),2&e&&(u.xp6(1),u.Q6J("config",o.config)("virtual",!0))},directives:[a.W2,i.nF,i.YC,m.r,t._Y,t.JL,t.F,t.Fj,t.Q7,t.c5,t.JJ,t.On,n.O5,f.r],styles:[".recover__btn[_ngcontent-%COMP%]{margin-bottom:var(--margin-btn)}.msg_warn[_ngcontent-%COMP%]{text-align:center;font-family:var(--font-work);font-weight:var(--fontWeight-body);font-size:11px;color:var(--color-warn)}"]}),e})()}];let Z=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[s.Bz.forChild(C)],s.Bz]}),e})();var E=r(5642);let M=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[n.ez,t.u5,i.kz,E.K,a.Pc,Z]]}),e})()},4429:(e,o,r)=>{"use strict";r.d(o,{H:()=>i});var n=r(639),t=r(1228);let i=(()=>{class e{constructor(e){this.auth=e}sendConfirmationEmailForRecover(e,o){console.log("Recover",e),this.requestPost("/api/sendConfirmationEmailForRecover",e).subscribe(e=>{console.log("after sending email",e),o(e)},e=>{throw console.log("error",e),new Error(e)})}sendSignUpConfirmationEmail(e,o){console.log("got payload",e),this.requestPost("/api/sendSignUpConfirmationEmail",e).subscribe(e=>{console.log("after sending email",e),o(e)},e=>{throw console.log("error",e),new Error(e)})}sendWelcomeVIIOEmail(e,o){console.log("email welcome",e),this.requestPost("/api/sendWelcomeVIIOEmail",e).subscribe(e=>{console.log("after sending email",e),o(e)},e=>{throw console.log("error",e),new Error(e)})}sendDepositConfirmationEmail(e,o){console.log("got payload",e),this.requestPost("/api/sendDepositConfirmationEmail",e).subscribe(e=>{console.log("after sending email",e),o(e)},e=>{throw console.log("error",e),new Error(e)})}sendWithdrawalConfirmationEmail(e,o){console.log("got payload",e),this.requestPost("/api/sendWithdrawalConfirmationEmail",e).subscribe(e=>{console.log("after sending email",e),o(e)},e=>{throw console.log("error",e),new Error(e)})}requestPost(e,o){return this.auth.requestPost(e,o,(e,o)=>{})}}return e.\u0275fac=function(o){return new(o||e)(n.LFG(t.e))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);