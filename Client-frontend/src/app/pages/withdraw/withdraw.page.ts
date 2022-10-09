import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Swiper, Virtual } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { StorageService } from 'src/app/services/storage/storage.service';
import { InfoModalPage } from '../modals/info-modal/info-modal.page';
import { environment } from 'src/environments/environment';
import { ExchangeRateService } from 'src/app/services/exchangeRate/exchange-rate.service';
import { FinancialEntitiesService } from 'src/app/services/financial-entities/financial-entities.service';
import { TransactionService } from 'src/app/services/user/transaction-service.service';
import { EmailManagerService } from 'src/app/services/emailManager/email-manager.service';
import { UserService } from 'src/app/services/user/user.service';
import { BalanceService } from 'src/app/services/user/balance.service';
import { KycService } from 'src/app/services/kyc/kyc.service';
import { ThisReceiver } from '@angular/compiler';
import { ReferenceService } from 'src/app/services/references/references.service';

const USER = 'current_user';

SwiperCore.use([Virtual]);

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {
  @ViewChild('withdrawSwiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 400,
    allowTouchMove: false
  };
  balance = 0;
  currentUser: any;
  banks: any;
  types: any;
  exchangeRates: any;
  withdrawalPayload: any;
  recipientEmail: any;
  recipientName: any;
  transactionresult: number = 0;
  //Moneda AUD
  bsbCode = "";

  //Moneda EUR
  iban = "";

  //Moneda GBP
  ukSortCode = "";

  //Moneda MXN
  clabe = "";
  curp = "";

  //Moneda USD
  achRoutingNum = "";
  
  //Moneda USD, AUD
  country ="";
  city="";
  address="";
  state="";
  zip="";

  //Moneda AUD, USD, CAD, GBP, COP
  numAccount = "";

  //Moneda CAD
  numInsti = "";
  numTransito = "";

  //Moneda USDC
  phoneWithdraw= "";

  //Moneda CRYPTO
  networkCrypto="";
  addressWallet="";
  memo="";

  //Moneda COP
  numDocument="";
  selectedBank="";

  chargeStatus: string;
  validation_password;
  counter = 4;
  amountTransaccion = 0;
  showPassword: boolean = false;
  recipientCurrency: any;
  sendingCurrency: any = 'USDC';
  selectedExchangeRate: any = {};
  
  maxLimitExchange: any;
  minLimitExchange: any;
  data1;
  data2;
  data3;
  data4;
  data5;
  data6;
  data7;
  data8;


  //Moneda USD, CAD, COP
  selectedAccountType = 0;
    actionsAccount = [{ id: 0, name: 'Seleccciona el tipo de cuenta' },
    { id: 1, name: 'Cuenta De Ahorros' },
    { id: 2, name: 'Cuenta Corriente' },
    { id: 3, name: 'Cuenta De Nomina' }]

  //Moneda COP
  selectedDocumentType = 0;
    actionsDocument = [{ id: 0, name: 'Seleccciona el tipo de documento' },
    { id: 1, name: 'CC: Cedula de Ciudadania' },
    { id: 2, name: 'CE: Cedula de Extranjeria' },
    { id: 2, name: 'NIP: Numero De Identificacion Personal' },
    { id: 3, name: 'NIT: Numero De Identificacion Tributaria' },
    { id: 4, name: 'PAP: Pasaporte' },
  ]

  comisionValue: any;
  disableButton: boolean = false;

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private storage: StorageService,
    private user: UserService,
    private exchangeRateServ: ExchangeRateService,
    private financialEntServ: FinancialEntitiesService,
    private transactionServ: TransactionService,
    private emailManagerServ: EmailManagerService,
    protected balanceService: BalanceService,
    protected kycService: KycService,
    private referenceServ: ReferenceService,
  ) { }


  async ngOnInit() {
    this.currentUser = await this.storage.get(this.storage.getMemo().CURRENT_USER);
    await this.balanceService.getBalance(this.currentUser, (res)=>{
      this.balance = res[0].balance
    })
    this.recipientEmail = this.currentUser.email
    this.getName();
    this.loadExchangeRates();
    this.loadExchangeLimits();
    this.loadFinancialEntities();
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
     
  formatNumber(number){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  }

  loadFinancialEntities() {
    this.financialEntServ.getFinancialEntities((fEnt) => {
      this.banks = fEnt;
    })
  }

  loadExchangeRates() {
    this.exchangeRateServ.getExchangeRates((rates) => {
      this.exchangeRates = rates
    })
  }

  loadExchangeLimits() {
    this.exchangeRateServ.getExchangetLimits((limits) => {
      this.maxLimitExchange = limits[0].max_limit;
      this.minLimitExchange = limits[0].min_limit;
    })
  }

  getName() {
    this.recipientName = this.kycService.getName(this.currentUser.email, (name)=>{
      this.recipientName = name.name + ' ' + name.lastName;
    })
  }

  setReference() {
    return new Promise((res, rej) => {
      this.referenceServ
        .createReference(this.currentUser)
        .subscribe(
          result => {
            res(result)
            this.changeSlide('next')
          },
          error => {
            this.presentKycModal()
          },
        );
    });
  }
  
  completeWithdraw(){
    this.navCtrl.navigateForward('/dashboard/activity')
    this.swiper.swiperRef.slideTo( 0, 400, false);
  }

  changeSlide(next: string) {
    switch (next) {
      case 'home':
        this.navCtrl.navigateForward('/dashboard/viio');
        
        break;
      case 'next':
        this.swiper.swiperRef.slideNext(500);
        break;
      case 'back':
        this.swiper.swiperRef.slidePrev(500);
        break;
      default:
        break;
    }
  }
  
  processInitialPayload(ev) {
    this.withdrawalPayload = JSON.parse(JSON.stringify(ev));
    this.selectedExchangeRate = this.withdrawalPayload.selectedExchangeRate;
    this.amountTransaccion = this.withdrawalPayload.sendingQuantity;
    this.recipientCurrency = this.withdrawalPayload.selectedRecipientCurrency;
    this.sendingCurrency = this.withdrawalPayload.selectedSenderCurrency;
    this.comisionValue = this.withdrawalPayload.comisionValue;
  }

  getParcialTotal() {
    return this.amountTransaccion * this.selectedExchangeRate?.sell_rate;
  }

  getFinishTotal() {
    return this.getParcialTotal() + (this.getParcialTotal() * this.comisionValue);
  }

  getActualExchangeRate() {
    return this.withdrawalPayload.selectedExchangeRate.quoteCurrency.ticker + ' | ' + this.withdrawalPayload.selectedExchangeRate.baseCurrency.ticker + ' : ' + this.withdrawalPayload.selectedExchangeRate.buy_rate;
  }


  async presentSuccessInfoModal() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        title: 'Transacción registrada',
        content: `Enhorabuena! Tu transacción fue registrada exitosamente, revisa tu correo electrónico por el comprobante de la transacción`,
        btnLabel: 'Entendido'
      }
    });

    return await modal.present();
  }

  async presentFailureInfoModal() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        title: 'Transacción NO registrada',
        content: `Oops! Tu transacción no pudo ser registrada exitosamente, intenta nuevamente en unos minutos`,
        btnLabel: 'Entendido'
      }
    });

    return await modal.present();
  }

  async presentModal(err:any) {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/'+err.error.icon+'.svg',
        title: err.error.title,
        content: err.error.msg,
        btnLabel: 'Entendido'
      }
    });
    return await modal.present();
  }

  async presentKycModal() {
    let self = this;
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Wrong_1.svg',
        title: 'No se pudo verificar kyc del usuario',
        content: `Por favor registrarse en <a href='https://portal.sekuritance.com/launches/9b6d3e1e-2af9-4fdb-ab13-1a01eb3ad087'>kyc</a>. En caso de ya haberse registrado esperar un día`,
        btnLabelA: 'Entendido',
        btnCallback: () => {
          self.disableButton = true;
          setTimeout(()=>{
            self.disableButton = false;
          }, 2000);
        }
      },
    });
    return await modal.present();
  }

  async currencyData(){
    if(this.recipientCurrency=='USDC'){
      this.data1 = "Phone: "+this.phoneWithdraw;
    }else if(this.recipientCurrency=='AUD'){
      this.data1 = "BSBCode: "+this.bsbCode;
      this.data2 = "N° Account: "+this.numAccount;
      this.data3 = "País: "+this.country;
      this.data4 = "Ciudad: "+this.city;
      this.data5 = "Dirección: "+this.address;
      this.data6 = "Estado: "+this.state;
      this.data7 = "Código Postal: "+this.zip;
    }else if(this.recipientCurrency=='EUR'){
      this.data1 = "IBAN: "+this.iban;
    }else if(this.recipientCurrency=='GBP'){
      this.data1 = "UK Sort Code: "+this.ukSortCode;
      this.data2 = "N° Account: "+this.numAccount;
    }else if(this.recipientCurrency=='MXN'){
      this.data1 = "CLABE: "+this.clabe;
      this.data2 = "CURP: "+this.curp;
    }else if(this.recipientCurrency=='USD'){
      this.data1 = "ACH Routing N°: "+this.achRoutingNum;
      this.data2 = "Account Type: "+ this.actionsAccount[this.selectedAccountType].name ;
      this.data3 = "N° Account: "+this.numAccount;
      this.data4 = "País: "+this.country;
      this.data5 = "Ciudad: "+this.city;
      this.data6 = "Dirección: "+this.address;
      this.data7 = "Estado: "+this.state;
      this.data8 = "Código Postal: "+this.zip;
    }else if(this.recipientCurrency=='CAD'){
      this.data1 = "Account Type: "+ this.actionsAccount[this.selectedAccountType].name ;
      this.data2 = "N° Account: "+this.numAccount;
      this.data3 = "N° Instituto: "+this.numInsti;
      this.data4 = "N° Transito: "+this.numTransito;
    }else if(this.recipientCurrency=='CRYPTO'){
      this.data1 = "Network: "+this.networkCrypto;
      this.data2 = "Address: "+this.addressWallet;
      this.data3 = "MEMO: "+this.memo;
    }else {
      this.data1 = "Document Type: "+ this.actionsDocument[this.selectedDocumentType].name ;
      this.data2 = "N° Document: "+this.numDocument;
      this.data3 = "Bank: "+ this.selectedBank;
      this.data4 = "Account Type: "+ this.actionsAccount[this.selectedAccountType].name;
      this.data5 = "N° Account: "+this.numAccount;
    }
  }
  async uploadTransaction() {
    const transactionsTypes: any[] = await this.transactionServ.getTransactionTypes();
    const transactionStatus: any[] = await this.transactionServ.getTransactionStatus();
    await this.currencyData();
    const payload = {
      transaction_time: new Date().toISOString,
      id_user: this.currentUser.id_user,
      id_transaction_type: transactionsTypes.filter((element) => { return element.type.toLowerCase().includes('retiro') })[0].id_transaction_type,
      id_transaction_status: transactionStatus.filter((element) => { return element.status.toLowerCase().includes('recibida') })[0].id_transaction_status,
      id_currency: this.withdrawalPayload.selectedExchangeRate.id_quote_currency,
      total: -(this.withdrawalPayload.sendingQuantity),
      commission: 0,
      id_exchange_rate:this.withdrawalPayload.selectedExchangeRate.id_exchange_rate,
      metadata: {
        currencyData: {
          selectedExchangeRate: this.withdrawalPayload.selectedExchangeRate,
          data1: this.data1,
          data2: this.data2,
          data3: this.data3,
          data4: this.data4,
          data5: this.data5,
          data6: this.data6,
          data7: this.data7,
          data8: this.data8,
        },
        userData: {
          recipientEmail: this.recipientEmail,
          recipientName: this.recipientName,
        }
      },
    };
    this.transactionServ.insertTransaction(payload, async (response) => {
      if (response) {
        this.chargeStatus = 'success';
        this.emailManagerServ.sendWithdrawalConfirmationEmail({ payload, email: this.currentUser.email }, (response) => {
          this.changeSlide('next');
          setTimeout(() => {
            this.navCtrl.navigateForward('/dashboard/activity');
          }, 2500);
        })
      }
      else {
        this.chargeStatus = 'failure';
        await this.presentFailureInfoModal();
        this.navCtrl.navigateForward('/dashboard/viio');
      }
    });
  }

  async confirmationPassword() {
    let currentUser = await this.storage.get(this.storage.getMemo().CURRENT_USER);
    currentUser.oldPassword = this.validation_password;
    this.user.validationPasswordWithdraw(currentUser, (res, err) => {
      if (res) {
        this.changeSlide('next');
        this.uploadTransaction()
      } else if (err) {
        this.presentModal(err);
        this.transactionresult == 1
      }
    })
  }

  displayControl (object: any) { 
    return object.invalid && (object.dirty || object.touched) 
  }
   
  errorDictionary = {
    'AUD': {short: '^[0-9]{0,4}$', long: '^!([0-9]{0,9}))$'},
    'CAD': {short: '^[0-9]{0,7}$', long: '^!([0-9]{0,12})$'},
    'GBP': {error: '^[0-9]{8}$'},
    'USD': {short: '^[0-9]{0,4}$', long: '^!([0-9]{0,17})$'},
    'COP': {short: '^[0-9]{0,4}$', long: '^!([0-9]{0,20})$'},
  }

  errorDisplay(){
    // se necesita el currency
    // se necesita la validación del regex
    const errorObj = this.errorDictionary[this.recipientCurrency];
    let flag = undefined;
    if(errorObj) {
      for (const key in errorObj) {
        if (Object.prototype.hasOwnProperty.call(errorObj, key)) {
          flag = this.numAccount.toString().match(errorObj[key])
          if(flag) return true;
        }
      }
      return false
    }
  }
}
