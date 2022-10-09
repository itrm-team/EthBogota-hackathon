import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { InfoModalPage } from 'src/app/pages/modals/info-modal/info-modal.page';
import { Coin, PriceFinderService } from 'src/app/services/price-finder/price-finder.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-web3-pair-input',
  templateUrl: './web3-pair-input.component.html',
  styleUrls: ['./web3-pair-input.component.scss'],
})
export class Web3PairInputComponent implements OnInit {

  @Input() info: number;

  @Output() withdrawPayload = new EventEmitter<any>();
  
  userBalance: any;
  currentUser: Promise<any>;

  exchangeRates: any;
  sendQuantity: any;
  reciveQuantity: any;
  selectedSenderCurrency: any = 'USDC';
  selectedRecipientCurrency: any = 'ETH';
  selectedExchangeRate: any = {};
  comisionValue = 0.00;

  maxLimitExchange: any;
  minLimitExchange: any;

  numberSendQuantity: number;
  ethPrice: number = 0;
  priceLock = true;

  constructor(
    private priceFinder: PriceFinderService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private storage: StorageService,
  ) { }

  ngOnInit() {}

  async senderQuantityChanged(event: string) {
    this.ethPrice = await this.priceFinder.getPrice(Coin.USDC);
    this.sendQuantity = event;
    this.selectedExchangeRate.buy_rate = 1;
    this.selectedExchangeRate.sell_rate = this.ethPrice;
    this.reciveQuantity = this.format_number(this.getTotalSending(), 18, true);
    this.sendQuantity = this.format_number(this.sendQuantity, 2, true);
  }

  getTotalSending() {
    if (this.info == 0)
      return (this.sendQuantity * this.selectedExchangeRate?.sell_rate);
    else if (this.info == 1)
      return (this.sendQuantity * this.selectedExchangeRate?.buy_rate);
  }

  format_number(number, num_decimals, include_comma){
    console.log("formatting number", number, num_decimals, include_comma, number.toLocaleString('en-US', {useGrouping: include_comma, minimumFractionDigits: num_decimals, maximumFractionDigits: num_decimals}));
    return number.toLocaleString('en-US', {useGrouping: include_comma, minimumFractionDigits: num_decimals, maximumFractionDigits: num_decimals});
  }

  async recipientQuantityChanged(event: string) {
    this.ethPrice = await this.priceFinder.getPrice(Coin.USDC);
    this.reciveQuantity = event;
    this.selectedExchangeRate.buy_rate = 1;
    this.selectedExchangeRate.sell_rate = this.ethPrice;
    this.sendQuantity=this.format_number(this.getTotalRecipient(), 2, true);
    this.reciveQuantity = this.format_number(this.reciveQuantity, 18, true);
  }

  getTotalRecipient(){
    if (this.info == 0)
      return (this.reciveQuantity / this.selectedExchangeRate?.sell_rate);
    else if (this.info == 1)
      return (this.reciveQuantity / this.selectedExchangeRate?.buy_rate);
  }

  comision(){
    if (this.info==0){
      return (this.selectedExchangeRate?.sell_rate);
    }else if (this.info==1){
      return (this.selectedExchangeRate?.buy_rate);
    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Saving_dollars.svg',
        title: 'Info',
        content: 'Se realizará una compra usando tus fondos de tu billetera web3, '
          + 'recuerda que la transacción no podrá ser reversada, ¿deseas continuar?',
        btnCallback: async ()=>{
          await this.performTransaction();
          this.navCtrl.navigateForward('/dashboard/activity');
        },
        btnLabelA: 'Confirmar',
        btnLabel: 'Cancelar',
      }
    });
    return await modal.present();
  }
  
  async performTransaction() {
    console.log("> bought");
  }

}
