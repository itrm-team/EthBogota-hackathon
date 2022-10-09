import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchangeRate/exchange-rate.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-viio',
  templateUrl: './viio.page.html',
  styleUrls: ['./viio.page.scss'],
})
export class ViioPage implements OnInit {
  constructor(
    private exchangeRateServ: ExchangeRateService,
    private storage: StorageService
  ) {}
  exchangeRates: any = [];
  exchangerate: any = [];
  mainCurrency: any = { currency: 'USDC' };
  async ngOnInit() {
    this.exchangeRateServ.getExchangeRates((rates: any) => {
      this.exchangerate = rates
      this.exchangeRates = rates.reverse().filter((data) => {
        // console.log('>>data', data);
        // console.log(">>data ticker 1",data["quoteCurrency.ticker"])
        // console.log(">>data ticker 2",data.baseCurrency.ticker)
        if (!(data.id_exchange_rate === 1)) {
          this.exchangeRates
          let result = false;
          if (data.baseCurrency.ticker === this.mainCurrency.currency) {
            result = true;
          }
          return result;
        }
      });
    });
  }

  twoDecimals(number) {
    number = Number(number).toFixed(2);
    return number;
  }
  
  fourDecimals(number) {
    number = Number(number).toFixed(4);
    return number;
  }

  camelize(str) {
    const strpivote = (str.toLowerCase()).split(" ")
    for(let i = 0; i < strpivote.length; i++) {
      const word = strpivote[i] 
      strpivote[i] = word[0].toUpperCase() + word.substring(1).toLowerCase()
    }
    return strpivote.join(" ")
  }
}
