(self.webpackChunkMultiCash=self.webpackChunkMultiCash||[]).push([[1549],{1549:(e,t,n)=>{"use strict";n.r(t),n.d(t,{ChargePageModule:()=>W});var a=n(8583),i=n(665),r=n(1575),c=n(3083),o=n(9445),s=n(4762),l=n(2468),d=n(3313),u=n(2340),p=n(639),h=n(6578),g=n(5393),m=n(9748),f=n(9005),x=n(4429),v=n(9158);let _=(()=>{class e{constructor(){}toBase64(e,t,n){const a="data:"+t+n+";base64,"+btoa(this.toBinary(e));return console.log("datos:",e),console.log("datos:",a),"data:"+t+n+";base64,"+btoa(this.toBinary(e))}toBinary(e){const t=new Uint16Array(e.length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return String.fromCharCode(...new Uint8Array(t.buffer))}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=p.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var Z=n(9527),b=n(6296),y=n(1354),C=n(6945),T=n(9523),w=n(1312);const S=["chargeSwiper"],k=function(){return[!0,!1]};function J(e,t){if(1&e){const e=p.EpF();p.TgZ(0,"div",4),p.TgZ(1,"app-title",5),p.NdJ("backEvent",function(){return p.CHM(e),p.oxw().changeSlide("home")})("nextEvent",function(){return p.CHM(e),p.oxw().changeSlide("next")}),p.qZA(),p.TgZ(2,"app-pair-input",6),p.NdJ("withdrawPayload",function(t){return p.CHM(e),p.oxw().processInitialPayload(t)}),p.qZA(),p.qZA(),p.TgZ(3,"div",7),p.TgZ(4,"app-button",8),p.NdJ("click",function(){p.CHM(e);const t=p.oxw();return t.maxLimitExchange>=t.amountTransaccion&&t.amountTransaccion>=t.minLimitExchange&&t.changeSlide("next")}),p.qZA(),p.qZA()}if(2&e){const e=p.oxw();p.xp6(1),p.Q6J("title","Cargar")("arrows",p.DdM(5,k)),p.xp6(1),p.Q6J("info",0),p.xp6(2),p.Q6J("disable",!(e.maxLimitExchange>=e.amountTransaccion&&e.amountTransaccion>=e.minLimitExchange))("label","Siguiente")}}function E(e,t){if(1&e){const e=p.EpF();p.TgZ(0,"div",4),p.TgZ(1,"app-title",5),p.NdJ("backEvent",function(){return p.CHM(e),p.oxw().changeSlide("back")})("nextEvent",function(){return p.CHM(e),p.oxw().changeSlide("next")}),p.qZA(),p.TgZ(2,"app-button-link",9),p.NdJ("click",function(){return p.CHM(e),p.oxw().createTransfer("transferencia")}),p.qZA(),p.TgZ(3,"app-button-link",9),p.NdJ("click",function(){return p.CHM(e),p.oxw().createTransfer("wompi")}),p.qZA(),p.qZA()}2&e&&(p.xp6(1),p.Q6J("title","M\xe9todo de pago")("arrows",p.DdM(10,k)),p.xp6(1),p.Q6J("mode","link")("icon","\ue903")("label","Transferenc\xeda bancaria")("outline","both"),p.xp6(1),p.Q6J("mode","link")("icon","\ue905")("label","PSE, Bancolombia, Nequi")("outline","bottom"))}const A=function(){return["/dashboard"]};function U(e,t){if(1&e){const e=p.EpF();p.TgZ(0,"div",4),p.TgZ(1,"app-title",5),p.NdJ("backEvent",function(){return p.CHM(e),p.oxw(2).changeSlide("back")})("nextEvent",function(){return p.CHM(e),p.oxw(2).changeSlide("next")}),p.qZA(),p.TgZ(2,"form",10),p._UZ(3,"input",11),p._UZ(4,"input",12),p._UZ(5,"input",13),p._UZ(6,"input",14),p._UZ(7,"input",15),p.TgZ(8,"button",16),p._uU(9,"Pagar con Wompi"),p.qZA(),p.qZA(),p.qZA(),p.TgZ(10,"p"),p._uU(11," Ser\xe1s redirigido a la pasarela de pago. Al presionar cargar est\xe1s aceptando los t\xe9rminos y condiciones y la pol\xedtica de privacidad para hacer esta compra. "),p.qZA(),p.TgZ(12,"div",7),p._UZ(13,"app-button",17),p.qZA()}if(2&e){const e=p.oxw(2);p.xp6(1),p.Q6J("title","Wompi")("arrows",p.DdM(8,k)),p.xp6(4),p.s9C("value",e.getPrice()),p.xp6(1),p.s9C("value",e.getReference()),p.xp6(1),p.hYB("value","",e.internalUrl,"/response?reference=",e.getReference(),""),p.xp6(6),p.Q6J("label","Regresar")("routerLink",p.DdM(9,A))}}function q(e,t){1&e&&p.YNc(0,U,14,10,"ng-template",2)}function N(e,t){if(1&e&&(p.TgZ(0,"option",23),p._uU(1),p.qZA()),2&e){const e=t.$implicit;p.Q6J("value",e.id),p.xp6(1),p.Oqu(e.name)}}function R(e,t){if(1&e){const e=p.EpF();p.TgZ(0,"div",4),p.TgZ(1,"app-title",5),p.NdJ("backEvent",function(){return p.CHM(e),p.oxw(2).changeSlide("back")})("nextEvent",function(){return p.CHM(e),p.oxw(2).changeSlide("next")}),p.qZA(),p.TgZ(2,"form",null,18),p.TgZ(4,"label",19),p._uU(5,"Banco"),p.qZA(),p.TgZ(6,"select",20),p.NdJ("ngModelChange",function(t){return p.CHM(e),p.oxw(2).selectedBank=t}),p.YNc(7,N,2,2,"option",21),p.qZA(),p.qZA(),p.qZA(),p.TgZ(8,"div",7),p.TgZ(9,"app-button",22),p.NdJ("click",function(){return p.CHM(e),p.oxw(2).changeSlide("next")}),p.qZA(),p.qZA()}if(2&e){const e=p.oxw(2);p.xp6(1),p.Q6J("title","Transferencia")("arrows",p.DdM(5,k)),p.xp6(5),p.Q6J("ngModel",e.selectedBank),p.xp6(1),p.Q6J("ngForOf",e.actionsBank),p.xp6(2),p.Q6J("label","Siguiente")}}function M(e,t){1&e&&p.YNc(0,R,10,6,"ng-template",2)}function Q(e,t){1&e&&(p.TgZ(0,"div"),p._UZ(1,"app-compare",37),p._UZ(2,"app-compare",37),p._UZ(3,"app-compare",37),p._UZ(4,"app-compare",37),p._UZ(5,"app-compare",37),p.qZA()),2&e&&(p.xp6(1),p.Q6J("title","Banco:")("text","Bancolombia S.A."),p.xp6(1),p.Q6J("title","Tipo de cuenta:")("text","Corriente"),p.xp6(1),p.Q6J("title","N\xfamero de cuenta:")("text","08400000291"),p.xp6(1),p.Q6J("title","Titular:")("text","Intelligent trading machines S.A.S."),p.xp6(1),p.Q6J("title","NIT:")("text","901.002.150"))}function P(e,t){1&e&&(p.TgZ(0,"div"),p._UZ(1,"app-compare",37),p._UZ(2,"app-compare",37),p._UZ(3,"app-compare",37),p._UZ(4,"app-compare",37),p._UZ(5,"app-compare",37),p.qZA()),2&e&&(p.xp6(1),p.Q6J("title","BANCO:")("text","Davivienda S.A."),p.xp6(1),p.Q6J("title","Tipo de cuenta:")("text","Ahorros"),p.xp6(1),p.Q6J("title","N\xfamero de cuenta:")("text","457470081169"),p.xp6(1),p.Q6J("title","Titular:")("text","Intelligent trading machines S.A.S."),p.xp6(1),p.Q6J("title","NIT:")("text","901.002.150"))}function B(e,t){if(1&e){const e=p.EpF();p.TgZ(0,"div",4),p.TgZ(1,"app-title",5),p.NdJ("backEvent",function(){return p.CHM(e),p.oxw(2).changeSlide("back")})("nextEvent",function(){return p.CHM(e),p.oxw(2).changeSlide("next")}),p.qZA(),p.TgZ(2,"p",24),p._uU(3," Adjunta comprobante de transferencia. Recuerda que se cargan tus USDC una vez se verifique la recepci\xf3n de fondos. Puede tardar hasta 24 horas. * La transferencia debe realizarse desde una cuenta de la que seas titular. "),p.qZA(),p.TgZ(4,"div",25),p._UZ(5,"app-subtitle",26),p.YNc(6,Q,6,10,"div",3),p.YNc(7,P,6,10,"div",3),p.qZA(),p.TgZ(8,"div",25),p._UZ(9,"app-compare",27),p._UZ(10,"app-compare",27),p._UZ(11,"app-compare",27),p._UZ(12,"app-compare",27),p._UZ(13,"app-compare",27),p.qZA(),p.TgZ(14,"form",28,29),p.TgZ(16,"div",30),p.TgZ(17,"label",31),p._UZ(18,"ion-icon",32),p.TgZ(19,"p",33),p._uU(20,"Toca aqu\xed para cargar tu comprobante"),p.qZA(),p.qZA(),p.TgZ(21,"input",34),p.NdJ("change",function(t){return p.CHM(e),p.oxw(2).handleFileInput(t)}),p.qZA(),p.TgZ(22,"div",35),p.TgZ(23,"p",36),p._uU(24),p.qZA(),p.qZA(),p.qZA(),p.qZA(),p.qZA(),p.TgZ(25,"div",7),p.TgZ(26,"app-button",8),p.NdJ("click",function(){p.CHM(e);const t=p.oxw(2);return 1==t.checkBankFile&&t.uploadTransaction()}),p.qZA(),p.qZA()}if(2&e){const e=p.oxw(2);p.xp6(1),p.Q6J("title","Transferencia bancaria")("arrows",p.DdM(23,k)),p.xp6(4),p.Q6J("text","Informaci\xf3n de pago"),p.xp6(1),p.Q6J("ngIf",0==e.selectedBank),p.xp6(1),p.Q6J("ngIf",1==e.selectedBank),p.xp6(2),p.Q6J("title","Recarga:")("text",e.formatNumber(e.amountTransaccion))("subText"," "+e.sendingCurrency),p.xp6(1),p.Q6J("title","Tasa de cambio:")("text",e.formatNumber(e.selectedExchangeRate.buy_rate))("subText"," "+e.sendingCurrency+"/"+e.selectedBaseCurrency),p.xp6(1),p.Q6J("title","Valor de giro:")("text",e.formatNumber(e.getParcialTotal()))("subText"," "+e.selectedBaseCurrency),p.xp6(1),p.Q6J("title","Comisi\xf3n:")("text",e.formatNumber(e.comisionValue))("subText"," "+e.selectedBaseCurrency),p.xp6(1),p.Q6J("title","Total a pagar:")("text",e.formatNumber(e.getFinishTotal()))("subText"," "+e.selectedBaseCurrency),p.xp6(11),p.hij(" ",0==e.checkBankFile?"Archivo requerido":""," "),p.xp6(2),p.Q6J("disable",!(1==e.checkBankFile))("label","Siguiente")}}function I(e,t){1&e&&p.YNc(0,B,27,24,"ng-template",2)}function F(e,t){1&e&&p._UZ(0,"ion-icon",45)}function O(e,t){1&e&&p._UZ(0,"ion-icon",46)}function Y(e,t){1&e&&(p.TgZ(0,"p",47),p._uU(1," Ocurri\xf3 un error con tu transacci\xf3n, Por favor Intentalo Nuevamente "),p.qZA())}function L(e,t){1&e&&(p.TgZ(0,"div",25),p._UZ(1,"app-compare",37),p._UZ(2,"app-compare",27),p._UZ(3,"app-compare",37),p._UZ(4,"app-compare",37),p._UZ(5,"app-compare",37),p.qZA()),2&e&&(p.xp6(1),p.Q6J("title","BANCO:")("text","Bancolombia"),p.xp6(1),p.Q6J("title","CANTIDAD:")("text","20")("subText","USD"),p.xp6(1),p.Q6J("title","FECHA:")("text","21.07.2022"),p.xp6(1),p.Q6J("title","HORA:")("text","12:12"),p.xp6(1),p.Q6J("title","NO. TRANSACCI\xd3N:")("text","006235588"))}function H(e,t){1&e&&(p.TgZ(0,"div",48),p._UZ(1,"app-button",49),p.qZA()),2&e&&(p.xp6(1),p.Q6J("label","Guardar"))}const D=function(){return["/dashboard/viio"]};function G(e,t){1&e&&(p.TgZ(0,"div",4),p.TgZ(1,"div",38),p.YNc(2,F,1,0,"ion-icon",39),p.YNc(3,O,1,0,"ion-icon",40),p._UZ(4,"app-subtitle",41),p.YNc(5,Y,2,0,"p",42),p.YNc(6,L,6,11,"div",43),p.qZA(),p.qZA(),p.TgZ(7,"div"),p.YNc(8,H,2,1,"div",44),p.TgZ(9,"div",7),p._UZ(10,"app-button",17),p.qZA(),p.qZA()),2&e&&(p.xp6(2),p.Q6J("ngIf",!1),p.xp6(1),p.Q6J("ngIf",!0),p.xp6(1),p.Q6J("text","Transacci\xf3n fallida")("type","alert"),p.xp6(1),p.Q6J("ngIf",!0),p.xp6(1),p.Q6J("ngIf",!1),p.xp6(2),p.Q6J("ngIf",!0),p.xp6(2),p.Q6J("label","Regresar")("routerLink",p.DdM(9,D)))}function z(e,t){1&e&&p.YNc(0,G,11,10,"ng-template",2)}l.ZP.use([l.eZ]);const j=[{path:"",component:(()=>{class e{constructor(e,t,n,a,i,r,c,o,s){this.navCtrl=e,this.modalCtrl=t,this.storage=n,this.exchangeRateServ=a,this.financialEntServ=i,this.transactionServ=r,this.emailManagerServ=c,this.referenceServ=o,this.conversor=s,this.config={slidesPerView:1,spaceBetween:400,allowTouchMove:!1},this.exchangeRates=null,this.selectedQuoteCurrency="USDP",this.selectedExchangeRate={},this.sendingCurrency="USDC",this.selectedBaseCurrency="COP",this.banks=[],this.selectedBank=0,this.actionsBank=[{id:0,name:"Bancolombia"},{id:1,name:"Davivienda"}],this.internalUrl=u.N.internalUrl,this.checkBankFile=0,this.amountTransaccion=0,this.formData=new FormData}ngOnInit(){return(0,s.mG)(this,void 0,void 0,function*(){this.currentUser=yield this.storage.get(this.storage.getMemo().CURRENT_USER),console.log(">>intercome",document.getElementById("intercome")),document.getElementById("intercome"),this.loadExchangeRates(),this.loadExchangeLimits(),this.loadFinancialEntities(),(yield this.referenceServ.test()).subscribe(e=>console.log(e))})}setReference(){return new Promise((e,t)=>{this.referenceServ.createReference(this.currentUser).subscribe(t=>{e(t)})})}getReference(){return this.reference}getPrice(){return 100*this.getFinishTotal()}autoClick(){document.getElementById("wompiButton").click()}createTransaction(){return(0,s.mG)(this,void 0,void 0,function*(){return new Promise((e,t)=>(0,s.mG)(this,void 0,void 0,function*(){const t=yield this.transactionServ.getTransactionTypes(),n=yield this.transactionServ.getTransactionStatus();console.log(this.selectedExchangeRate);const a={transaction_time:(new Date).toISOString,id_user:this.currentUser.id_user,id_transaction_type:t.filter(e=>e.type.toLowerCase().includes("deposit"))[0].id_transaction_type,id_transaction_status:n.filter(e=>e.status.toLowerCase().includes("recibida"))[0].id_transaction_status,id_currency:this.selectedExchangeRate.id_quote_currency,total:this.amountTransaccion,id_exchange_rate:this.selectedExchangeRate.id_exchange_rate,commission:0,metadata:{selectedExchangeRate:this.selectedExchangeRate,reference:this.reference}};console.log(">>charge",a),this.transactionServ.insertTransaction(a,t=>(0,s.mG)(this,void 0,void 0,function*(){e(!!t)}))}))})}createTransfer(e){return(0,s.mG)(this,void 0,void 0,function*(){return new Promise((t,n)=>(0,s.mG)(this,void 0,void 0,function*(){this.paymentMethod=e,this.reference=yield this.setReference(),"wompi"==e?yield this.createTransaction():this.presentInfoModal(),this.reference&&t(e)})).then(()=>{this.changeSlide("next"),"wompi"==e&&this.autoClick()})})}loadFinancialEntities(){this.financialEntServ.getFinancialEntities(e=>{this.banks=e})}loadExchangeRates(){this.exchangeRateServ.getExchangeRates(e=>{this.exchangeRates=e})}loadExchangeLimits(){this.exchangeRateServ.getExchangetLimits(e=>{this.maxLimitExchange=e[0].max_limit,this.minLimitExchange=e[0].min_limit})}quoteCurrencyChanged(e){this.selectedQuoteCurrency=e.target.value,this.getExchangeRateForSelectedCurrency()}baseCurrencyChanged(e){this.selectedBaseCurrency=e.target.value,this.getExchangeRateForSelectedCurrency()}presentModal(){return(0,s.mG)(this,void 0,void 0,function*(){const e=yield this.modalCtrl.create({component:d.c,componentProps:{title:"Usuario no verificado",content:'Para poder hacer uso de VIIO primero debes pasar por el proceso de verificaci\xf3n de usuario <a target="_blank">EN NUESTRO FORMULARIO DE REGISTRO.</a> Tendr\xe1s que iniciar sesi\xf3n de nuevo una vez hayas hecho el proceso de verificaci\xf3n.',btnLabel:"Cancelar",btnLabelA:"Registrarme",btnCallback:()=>{window.open(u.N.onboardingKycUrl,"_system")}}});return yield e.present()})}getExchangeRateForSelectedCurrency(){console.log(this.selectedQuoteCurrency,this.selectedBaseCurrency,this.selectedExchangeRate);for(let e=0;e<this.exchangeRates.length;e++)this.exchangeRates[e].quoteCurrency.ticker==this.selectedQuoteCurrency&&this.exchangeRates[e].baseCurrency.ticker==this.selectedBaseCurrency&&(this.selectedExchangeRate=JSON.parse(JSON.stringify(this.exchangeRates[e])));this.selectedQuoteCurrency==this.selectedBaseCurrency&&(this.selectedExchangeRate.buy_rate=1)}chargeQ1Changed(e){this.chargeQ1=e.target.value,this.getExchangeRateForSelectedCurrency()}getParcialTotal(){var e;return this.amountTransaccion*(null===(e=this.selectedExchangeRate)||void 0===e?void 0:e.buy_rate)}getFinishTotal(){return this.getParcialTotal()+this.getParcialTotal()*this.comisionValue}formatNumber(e){return isNaN(e)?"$0":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(e)}processInitialPayload(e){this.withdrawalPayload=JSON.parse(JSON.stringify(e)),this.selectedExchangeRate=this.withdrawalPayload.selectedExchangeRate,this.amountTransaccion=this.withdrawalPayload.sendingQuantity,this.recipientCurrency=this.withdrawalPayload.selectedRecipientCurrency,this.sendingCurrency=this.withdrawalPayload.selectedSenderCurrency,this.comisionValue=this.withdrawalPayload.comisionValue}presentInfoModal(){return(0,s.mG)(this,void 0,void 0,function*(){const e=yield this.modalCtrl.create({component:d.c,cssClass:"info-modal",componentProps:{title:"Compra con transferencia bancaria",content:"Recuerda que se cargan tus USDC una vez se verifique la recepci\xf3n de fondos. \n        Puede tardar hasta 24 horas.\n        <p>* La transferencia debe realizarse desde una cuenta de la que seas titular.</p>",btnLabel:"Entendido"}});return yield e.present()})}presentSuccessInfoModal(){return(0,s.mG)(this,void 0,void 0,function*(){const e=yield this.modalCtrl.create({component:d.c,cssClass:"info-modal",componentProps:{title:"Transacci\xf3n registrada",content:"Enhorabuena! Tu transacci\xf3n fue registrada exitosamente, revisa tu correo electr\xf3nico por el comprobante de la transacci\xf3n",btnLabel:"Entendido"}});return yield e.present()})}changeSlide(e){switch(e){case"home":this.navCtrl.navigateForward("/dashboard/viio");break;case"next":this.swiper.swiperRef.slideNext(500);break;case"back":this.swiper.swiperRef.slidePrev(500)}}handleFileInput(e){var t=new FileReader;const n=e.target.files[0].type,a=e.target.files[0].name;t.addEventListener("load",e=>{this.serializeFile(e,a,n)}),t.readAsDataURL(e.target.files[0]),this.checkBankFile=1}serializeFile(e,t,n){console.log("files",e.target.result),this.fileToUpload={data:e.target.result,name:t,type:n}}uploadTransaction(){return(0,s.mG)(this,void 0,void 0,function*(){const e=yield this.transactionServ.getTransactionTypes(),t=yield this.transactionServ.getTransactionStatus();console.log(this.selectedExchangeRate);const n={transaction_time:(new Date).toISOString,id_user:this.currentUser.id_user,id_transaction_type:e.filter(e=>e.type.toLowerCase().includes("deposit"))[0].id_transaction_type,id_transaction_status:t.filter(e=>e.status.toLowerCase().includes("en validaci\xf3n"))[0].id_transaction_status,id_currency:this.selectedExchangeRate.id_quote_currency,total:this.amountTransaccion,id_exchange_rate:this.selectedExchangeRate.id_exchange_rate,commission:0,metadata:{file:this.fileToUpload,selectedExchangeRate:this.selectedExchangeRate,reference:this.reference}};this.transactionServ.insertTransaction(n,e=>(0,s.mG)(this,void 0,void 0,function*(){e?(this.chargeStatus="success",yield this.presentSuccessInfoModal(),this.emailManagerServ.sendDepositConfirmationEmail({payload:n,email:this.currentUser.email},e=>{console.log("response",e),this.navCtrl.navigateForward("/dashboard/activity")})):(this.chargeStatus="failure",this.changeSlide("next"))}))})}}return e.\u0275fac=function(t){return new(t||e)(p.Y36(c.SH),p.Y36(c.IN),p.Y36(h.V),p.Y36(g.U),p.Y36(m.L),p.Y36(f.p),p.Y36(x.H),p.Y36(v.q),p.Y36(_))},e.\u0275cmp=p.Xpm({type:e,selectors:[["app-charge"]],viewQuery:function(e,t){if(1&e&&p.Gf(S,5),2&e){let e;p.iGM(e=p.CRH())&&(t.swiper=e.first)}},decls:9,vars:6,consts:[[3,"config","virtual"],["chargeSwiper",""],["swiperSlide",""],[4,"ngIf"],[1,"swiper-slide__container"],[3,"title","arrows","backEvent","nextEvent"],[3,"info","withdrawPayload"],[1,"charge__btn"],[3,"disable","label","click"],[3,"mode","icon","label","outline","click"],["ngNoForm","","action","https://checkout.wompi.co/p/","method","GET"],["type","hidden","name","public-key","value","pub_test_PBvM677vv2yCSy4uSa4caBvJACnHUGi0"],["type","hidden","name","currency","value","COP"],["type","hidden","name","amount-in-cents",3,"value"],["type","hidden","name","reference",3,"value"],["type","hidden","name","redirect-url",3,"value"],["type","submit","id","wompiButton","hidden",""],[3,"label","routerLink"],["bankForm","ngForm"],["for","bank_q1"],["id","select-menu","ng-model","one","required","","name","actionSelection",1,"bx--text-input",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[3,"label","click"],[3,"value"],[1,"info-text"],[1,"charge__comparative"],[3,"text"],[3,"title","text","subText"],[1,"center"],["checkBankForm","ngForm"],[1,"form__file"],["for","checkBank__file",1,"form__file-label"],["name","document-outline"],[1,"p"],["type","file","id","checkBank__file","accept",".pdf,.jpg,.png",3,"change"],[1,"msg_alert"],[1,"alert"],[3,"title","text"],[1,"charge__transaction"],["name","checkmark-circle-outline",4,"ngIf"],["name","close-circle-outline","class","denied",4,"ngIf"],[3,"text","type"],["class","p center",4,"ngIf"],["class","charge__comparative",4,"ngIf"],["class","charge__btn2",4,"ngIf"],["name","checkmark-circle-outline"],["name","close-circle-outline",1,"denied"],[1,"p","center"],[1,"charge__btn2"],[3,"label"]],template:function(e,t){1&e&&(p.TgZ(0,"ion-content"),p.TgZ(1,"swiper",0,1),p.YNc(3,J,5,6,"ng-template",2),p.YNc(4,E,4,11,"ng-template",2),p.YNc(5,q,1,0,void 0,3),p.YNc(6,M,1,0,void 0,3),p.YNc(7,I,1,0,void 0,3),p.YNc(8,z,1,0,void 0,3),p.qZA(),p.qZA()),2&e&&(p.xp6(1),p.Q6J("config",t.config)("virtual",!0),p.xp6(4),p.Q6J("ngIf","wompi"==t.paymentMethod),p.xp6(1),p.Q6J("ngIf","transferencia"==t.paymentMethod),p.xp6(1),p.Q6J("ngIf",!0),p.xp6(1),p.Q6J("ngIf",!0))},directives:[c.W2,r.nF,r.YC,a.O5,Z.r,b.r,y.r,C.j,c.YI,o.rH,i._Y,i.JL,i.F,i.EJ,i.Q7,i.JJ,i.On,a.sg,i.YN,i.Kr,T.H,w.s,c.gu],styles:[".charge__info[_ngcontent-%COMP%]{display:flex;flex-flow:row nowrap;justify-content:space-between}.charge__info-text[_ngcontent-%COMP%]{font-family:var(--font-work);line-height:.8}.charge__info-p[_ngcontent-%COMP%], .charge__info-text[_ngcontent-%COMP%]{font-weight:300;font-size:.8rem;color:var(--color-dark);opacity:.7}.charge__help[_ngcontent-%COMP%]{display:flex;justify-content:center}.charge__btn[_ngcontent-%COMP%]{margin-bottom:var(--margin-btn)}.charge__btn2[_ngcontent-%COMP%]{margin-bottom:10px}.charge__comparative[_ngcontent-%COMP%]{margin-top:20px}.charge__transaction[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap;justify-content:center}.charge__transaction[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:140px;align-self:center;color:var(--color-accent)}.charge__transaction[_ngcontent-%COMP%]   ion-icon.denied[_ngcontent-%COMP%]{color:var(--color-alert)}"]}),e})()}];let V=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p.oAB({type:e}),e.\u0275inj=p.cJS({imports:[[o.Bz.forChild(j)],o.Bz]}),e})();var K=n(5642);let W=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p.oAB({type:e}),e.\u0275inj=p.cJS({imports:[[a.ez,i.u5,r.kz,c.Pc,K.K,V]]}),e})()}}]);