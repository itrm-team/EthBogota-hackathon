import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  

  constructor(private connection: AuthService) { }

  getExchangeRates(callback) {
    this.request(`/api/getUpdatedExchangeRates`, {}).subscribe(response => {
      callback(response);
    }, (err) => {
      throw new Error(err);
    });
  }

  getCompleteExchangeRates(callback){
    this.request(`/api/getExchangeRates`, {}).subscribe(response => {
      callback(response);
    }, (err) => {
      throw new Error(err);
    });
  }

  getExchangetLimits(callback){
    this.request(`/api/getExchangeLimits`, {}).subscribe(response => {
      callback(response);
    }, (err) => {
      throw new Error(err);
    });
  }

  request(url, data) {
    return this.connection.requestGet(url, data, (err, res) => {});
  }
}
