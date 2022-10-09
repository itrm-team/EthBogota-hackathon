import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchangeRate/exchange-rate.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { BalanceService } from 'src/app/services/user/balance.service';

@Component({
  selector: 'app-pair-input',
  templateUrl: './pair-input.component.html',
  styleUrls: ['./pair-input.component.scss'],
})
export class PairInputComponent implements OnInit {

  //Charge Info=0
  //Withdraw Info=1
  @Input() info: number;

  @Output() withdrawPayload = new EventEmitter<any>();
  
  userBalance: any;
  currentUser: Promise<any>;

  exchangeRates: any;
  sendQuantity: any;
  reciveQuantity: any;
  selectedSenderCurrency: any = 'USDC';
  selectedRecipientCurrency: any = 'COP';
  selectedExchangeRate: any;
  comisionValue = 0.00;

  maxLimitExchange: any;
  minLimitExchange: any;

  numberSendQuantity: number;

  constructor(
    private exchangeRateServ: ExchangeRateService,
    private balanceServ: BalanceService,
    private storage: StorageService
    ) { }

  ngOnInit() {
    this.loadBalanceOfUser();
    this.loadExchangeRates();
    this.loadExchangeLimits();
  }

  comision(){
    if (this.info==0){
      return (this.selectedExchangeRate?.sell_rate);
    }else if (this.info==1){
      return (this.selectedExchangeRate?.buy_rate);
    }
  }

  async loadBalanceOfUser(){
    this.currentUser = await this.storage.get(this.storage.getMemo().CURRENT_USER);
    this.balanceServ.getBalance(this.currentUser, (response)=>{
      this.userBalance = response[0].balance;
    })
  }

  loadExchangeRates(){
    this.exchangeRateServ.getCompleteExchangeRates((rates)=>{
      this.exchangeRates = rates
    })
  }

  loadExchangeLimits() {
    this.exchangeRateServ.getExchangetLimits((limits) => {
      this.maxLimitExchange = limits[0].max_limit;
      this.minLimitExchange = limits[0].min_limit;
    })
  }

  getFormattedTodaysDate() {
    let dateObj = this.formatISODateToViewDate(new Date().toISOString());
    return dateObj.day + '.' + dateObj.month + '.' + dateObj.year;
  }

  formatISODateToViewDate(date: string) {
    let y = date.substring(0, 4);
    let m = date.substring(5, 7);
    let day = date.substring(8, 10);
    let aditionalday = 0;
    if (this.info==0)
      aditionalday += 1;
    else if (this.info==1)
      aditionalday += 2; 
    return { day: this.getFormattedDay(parseInt(day)+aditionalday), month: this.getFormattedMonth(parseInt(m)), year: y };
  }

  getFormattedDay(day) {
    return (day > 9) ? day : '0' + day;
  }

  getFormattedMonth(month) {
    return (month > 9) ? month : '0' + month;
  }

  createSenderPayload(){
    console.log("senderpayload", {
      sendingQuantity: this.getTotalRecipient(),
      recievingQuantity: this.reciveQuantity,
      selectedExchangeRate: this.selectedExchangeRate,
      selectedSenderCurrency: this.selectedSenderCurrency,
      selectedRecipientCurrency: this.selectedRecipientCurrency,
      comisionValue: this.comisionValue,
    });
    this.withdrawPayload.emit({
      sendingQuantity: this.getTotalRecipient(),
      recievingQuantity: this.reciveQuantity,
      selectedExchangeRate: this.selectedExchangeRate,
      selectedSenderCurrency: this.selectedSenderCurrency,
      selectedRecipientCurrency: this.selectedRecipientCurrency,
      comisionValue: this.comisionValue,
    });
  }

  createPayload(){
    this.withdrawPayload.emit({
      sendingQuantity: this.sendQuantity,
      recievingQuantity: this.getTotalSending(),
      selectedExchangeRate: this.selectedExchangeRate,
      selectedSenderCurrency: this.selectedSenderCurrency,
      selectedRecipientCurrency: this.selectedRecipientCurrency,
      comisionValue: this.comisionValue,
    });
  }

  getTotalSending(){
    if (this.info==0){
      return (this.sendQuantity * this.selectedExchangeRate?.sell_rate);
    }else if (this.info==1){
      return (this.sendQuantity * this.selectedExchangeRate?.buy_rate);
    }
  }
  getTotalRecipient(){
    if(this.info==0){
      return (this.reciveQuantity * this.selectedExchangeRate?.sell_rate);
    }else if (this.info==1){
      return (this.reciveQuantity * this.selectedExchangeRate?.buy_rate);
    }
  }

  senderQuantityChanged(ev: string){
    this.sendQuantity = ev;
    if (this.sendQuantity==0)
      this.sendQuantity = "";
    this.getExchangeRateForRecipientSelectedCurrency();
  }

  recipientQuantityChanged(ev: string){
    this.reciveQuantity = ev;
    if (this.reciveQuantity==0)
      this.reciveQuantity = "";
    this.getExchangeRateForSenderSelectedCurrency();
  }

  recipientCurrencyChanged(ev: string){
    this.selectedRecipientCurrency = ev;
    this.getExchangeRateForRecipientSelectedCurrency();
  }

  getExchangeRateForSenderSelectedCurrency(){
    this.selectedExchangeRate = {};
    if(this.selectedSenderCurrency == this.selectedRecipientCurrency || 
      this.selectedRecipientCurrency=='USDT' || this.selectedRecipientCurrency=='USDC'){
      this.selectedExchangeRate = {};
      this.selectedExchangeRate.buy_rate = 1;
      this.selectedExchangeRate.sell_rate = 105/100;
    }else{
      for(let i= 0; i < this.exchangeRates.length; i++ ){
        if(this.exchangeRates[i].quoteCurrency.ticker == this.selectedSenderCurrency && this.exchangeRates[i].baseCurrency.ticker == this.selectedRecipientCurrency){
          this.selectedExchangeRate = JSON.parse(JSON.stringify(this.exchangeRates[i]));
        }
      }
    }
    this.createSenderPayload()
    this.numberSendQuantity = this.getTotalRecipient();
    this.sendQuantity=this.format_number(this.getTotalRecipient(), 2, true)
    this.reciveQuantity = this.format_number(this.reciveQuantity, 2, true)
  }

  getExchangeRateForRecipientSelectedCurrency(){
    this.selectedExchangeRate = {};
    if (!this.exchangeRates)
      this.loadExchangeRates();
    if (this.exchangeRates)
      for(let i= 0; i < this.exchangeRates.length; i++ ){
        if(this.exchangeRates[i].quoteCurrency.ticker == this.selectedRecipientCurrency && this.exchangeRates[i].baseCurrency.ticker == this.selectedSenderCurrency)
          this.selectedExchangeRate = JSON.parse(JSON.stringify(this.exchangeRates[i]));
      }
    if(this.selectedSenderCurrency == this.selectedRecipientCurrency){
      this.selectedExchangeRate.buy_rate = 1;
      this.selectedExchangeRate.sell_rate = 100/105;
    }
    console.log("selected exchange rate", this.selectedExchangeRate);
    this.createPayload();
    this.numberSendQuantity=this.sendQuantity;
    this.reciveQuantity=this.format_number(this.getTotalSending(), 2, true)
    this.sendQuantity = this.format_number(this.sendQuantity, 2, true)
  }

  format_number(number, num_decimals, include_comma){
    console.log("formatting number", number, num_decimals, include_comma, number.toLocaleString('en-US', {useGrouping: include_comma, minimumFractionDigits: num_decimals, maximumFractionDigits: num_decimals}));
    return number.toLocaleString('en-US', {useGrouping: include_comma, minimumFractionDigits: num_decimals, maximumFractionDigits: num_decimals});
  }
}
