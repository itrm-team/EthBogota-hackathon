import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Swiper, Virtual } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { InfoModalPage } from '../../pages/modals/info-modal/info-modal.page';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from '../../../environments/environment';
import { ExchangeRateService } from 'src/app/services/exchangeRate/exchange-rate.service';
import { FinancialEntitiesService } from 'src/app/services/financial-entities/financial-entities.service';
import { TransactionService } from 'src/app/services/user/transaction-service.service';
import { EmailManagerService } from 'src/app/services/emailManager/email-manager.service';
import { ReferenceService } from 'src/app/services/references/references.service';
import { ConversorService } from 'src/app/services/conversor/conversor.service';

SwiperCore.use([Virtual]);

@Component({
  selector: 'app-charge',
  templateUrl: './charge.page.html',
  styleUrls: ['./charge.page.scss'],
})
export class ChargePage implements OnInit {
  @ViewChild('chargeSwiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 400,
    allowTouchMove: false,
  };
  disableButton: boolean = false;

  chargeQ1: any;
  exchangeRates: any = null;
  selectedQuoteCurrency: any = 'USD';
  selectedExchangeRate: any = {};
  sendingCurrency: any = 'USDC';
  selectedBaseCurrency: any = 'COP';
  banks: any = [];
  fileToUpload: any;
  currentUser: any;
  chargeStatus: string = '0';
  reference: any;
  maxLimitExchange: any;
  minLimitExchange: any;
  nameFile: any;
  selectedBank = 0;
  actionsBank = [
    { id: 0, name: 'Bancolombia' },
    { id: 1, name: 'Davivienda' },
  ];

  slideWompi: boolean;
  paymentMethod: string;
  internalUrl: string = environment.internalUrl;
  checkBankFile = 0;
  withdrawalPayload: any;
  recipientCurrency: any;
  amountTransaccion = 0;
  amountRecipient = 0;
  resultado: void;
  formData = new FormData();
  comisionValue: any;
  deunaCheckout: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private storage: StorageService,
    private exchangeRateServ: ExchangeRateService,
    private financialEntServ: FinancialEntitiesService,
    private transactionServ: TransactionService,
    private emailManagerServ: EmailManagerService,
    private referenceServ: ReferenceService,
    private conversor: ConversorService
  ) {}

  async ngOnInit() {
    this.currentUser = await this.storage.get(
      this.storage.getMemo().CURRENT_USER
    );
    this.loadExchangeRates();
    this.loadExchangeLimits();
    this.loadFinancialEntities();
    (await this.referenceServ.test()).subscribe((data) => {});

    this.deunaCheckout = (window as any).DunaCheckout();
  }

  shouldOpen() {
    const config = {
      apiKey:
        'c28f0d2050959dad5b13c35720a0c7c068b63e190cb53748eb076a0d61fb2240a7784afab190403272e1847a93da6ee897a64727e9caef033e8ff585318c',
      env: 'staggin',
      orderToken: 'c5c5abc9-67a7-4a44-aa83-ee7e81d7052c',
    };
    this.deunaCheckout.configure(config);
    this.deunaCheckout.shouldOpenCheckout().then((data) => {
      if (data) {
        this.deunaCheckout.show();
      }
    });
  }

  setReference() {
    return new Promise((res, rej) => {
      // this.presentKycModal();
      this.referenceServ
        .createReference(this.currentUser)
        .subscribe(
          result => {
            res(result)
          },
          error => {
            this.presentKycModal()
          },
        );
        // .subscribe((reference) => {
        //   res(reference);
        // });
    });
  }

  getReference() {
    return this.reference;
  }

  getPrice() {
    return this.amountRecipient;
  }

  autoClick() {
    document.getElementById('wompiButton').click();
  }

  async createTransaction() {
    return new Promise(async (res, rej) => {
      const transactionsTypes: any[] =
        await this.transactionServ.getTransactionTypes();
      const transactionStatus: any[] =
        await this.transactionServ.getTransactionStatus();
      const payload = {
        transaction_time: new Date().toISOString,
        id_user: this.currentUser.id_user,
        id_transaction_type: transactionsTypes.filter((element) => {
          return element.type.toLowerCase().includes('deposit');
        })[0].id_transaction_type,
        id_transaction_status: transactionStatus.filter((element) => {
          return element.status.toLowerCase().includes('recibida');
        })[0].id_transaction_status,
        id_currency: this.selectedExchangeRate.id_quote_currency,
        total: this.amountTransaccion,
        id_exchange_rate: this.selectedExchangeRate.id_exchange_rate,
        commission: 0,
        metadata: {
          selectedExchangeRate: this.selectedExchangeRate,
          reference: this.reference,
        },
      };
      this.transactionServ.insertTransaction(payload, async (response) => {
        if (response) {
          res(true);
        } else {
          res(false);
        }
      });
    });
  }

  async createTransfer(method: string) {
    return new Promise(async (res, rej) => {
      this.paymentMethod = method;
      this.reference = await this.setReference();
      if (method === 'transferencia')
        this.presentInfoModal();
      else if (method == 'wompi')
        await this.createTransaction();
      else
        console.log("> there isn't a modal called: '" + method + "'");
      if (this.reference) {
        res(method);
      }
    }).then(() => {
      this.changeSlide('next');
      if (method == 'wompi') {
        this.autoClick();
      }
    });
  }

  

  loadFinancialEntities() {
    this.financialEntServ.getFinancialEntities((fEnt) => {
      this.banks = fEnt;
    });
  }

  loadExchangeRates() {
    this.exchangeRateServ.getExchangeRates((rates) => {
      this.exchangeRates = rates;
    });
  }

  loadExchangeLimits() {
    this.exchangeRateServ.getExchangetLimits((limits) => {
      this.maxLimitExchange = limits[0].max_limit;
      this.minLimitExchange = limits[0].min_limit;
    });
  }

  quoteCurrencyChanged(ev: any) {
    this.selectedQuoteCurrency = ev.target.value;
    this.getExchangeRateForSelectedCurrency();
  }

  baseCurrencyChanged(ev: any) {
    this.selectedBaseCurrency = ev.target.value;
    this.getExchangeRateForSelectedCurrency();
  }
  getExchangeRateForSelectedCurrency() {
    for (let i = 0; i < this.exchangeRates.length; i++) {
      if (
        this.exchangeRates[i].quoteCurrency.ticker ==
          this.selectedQuoteCurrency &&
        this.exchangeRates[i].baseCurrency.ticker == this.selectedBaseCurrency
      ) {
        this.selectedExchangeRate = JSON.parse(
          JSON.stringify(this.exchangeRates[i])
        );
      }
    }
    if (this.selectedQuoteCurrency == this.selectedBaseCurrency) {
      this.selectedExchangeRate.buy_rate = 1;
    }
  }

  chargeQ1Changed(ev: any) {
    this.chargeQ1 = ev.target.value;
    this.getExchangeRateForSelectedCurrency();
  }

  formatNumber(number) {
    return !isNaN(number)
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(number)
      : '$0';
  }

  processInitialPayload(ev) {
    this.withdrawalPayload = JSON.parse(JSON.stringify(ev));
    this.selectedExchangeRate = this.withdrawalPayload.selectedExchangeRate;
    this.amountTransaccion = this.withdrawalPayload.sendingQuantity;
    this.amountRecipient = this.withdrawalPayload.recievingQuantity;
    this.recipientCurrency = this.withdrawalPayload.selectedRecipientCurrency;
    this.sendingCurrency = this.withdrawalPayload.selectedSenderCurrency;
    this.comisionValue = this.withdrawalPayload.comisionValue;
  }

  async presentInfoModal() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Saving_dollars.svg',
        title: 'Compra con transferencia bancaria',
        content: `Recuerda que se cargan tus USDC una vez se verifique la recepción de fondos. 
        Puede tardar hasta 24 horas.
        <p>* La transferencia debe realizarse desde una cuenta de la que seas titular.</p>`,
        btnLabel: 'Entendido',

      }
    });
    return await modal.present();
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

  handleFileInput(ev: any) {
    var reader = new FileReader();
    const type = ev.target.files[0].type;
    this.nameFile = ev.target.files[0].name;
    if (ev.target.files[0].size > 15000000) {
      this.presentInfoFile();
    } else {
      reader.addEventListener('load', (ev: any) => {
        this.serializeFile(ev, this.nameFile, type);
      });
      reader.readAsDataURL(ev.target.files[0]);
      this.checkBankFile = 1;
    }
  }
  async presentInfoFile() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Cancel_1.svg',
        title: 'Archivo inválido',
        content: 'Su documento no debe exceder un tamaño de 15MB',
        btnLabel: 'Entendido',
      },
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

  serializeFile(ev: any, name: any, type: any) {
    this.fileToUpload = { data: ev.target.result, name: name, type: type };
  }

  async uploadTransaction() {
    const transactionsTypes: any[] =
      await this.transactionServ.getTransactionTypes();
    const transactionStatus: any[] =
      await this.transactionServ.getTransactionStatus();
    const payload = {
      transaction_time: new Date().toISOString,
      id_user: this.currentUser.id_user,
      id_transaction_type: transactionsTypes.filter((element) => {
        return element.type.toLowerCase().includes('deposit');
      })[0].id_transaction_type,
      id_transaction_status: transactionStatus.filter((element) => {
        return element.status.toLowerCase().includes('en validación');
      })[0].id_transaction_status,
      id_currency: this.selectedExchangeRate.id_quote_currency,
      total: this.amountTransaccion,
      id_exchange_rate: this.selectedExchangeRate.id_exchange_rate,
      commission: 0,
      metadata: {
        file: this.fileToUpload,
        selectedExchangeRate: this.selectedExchangeRate,
        reference: this.reference,
      },
    };
    this.transactionServ.insertTransaction(payload, async (response) => {
      if (response) {
        this.chargeStatus = 'success';
        this.changeSlide('next')
        this.emailManagerServ.sendDepositConfirmationEmail(
          { payload, email: this.currentUser.email },
          (response) => {
            this.navCtrl.navigateForward('/dashboard/activity');
          }
        );
      } else {
        this.chargeStatus = 'failure';
        this.changeSlide('next');
      }
    });
  }
}
