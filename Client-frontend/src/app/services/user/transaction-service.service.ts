import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  

  constructor(public connection: AuthService) { }

  insertTransaction(payload: any, callback) {
    this.requestPost(`/api/createTransaction`, payload).subscribe(response => {
      callback(response);
    }, (err) => {
      throw new Error(err);
    });
  }

  getUserTransactions(user, callback) {
    this.requestGet(`/api/getTransactionsOfUser?id_user=${user.id_user}`, user).subscribe(response => {
      callback(response);
    }, (err) => {
      throw new Error(err);
    });
  }

  getTransactionTypes(){
    return new Promise<any>((res, rej)=>{
      this.requestGet(`/api/getTransactionTypes`, {}).subscribe(response => {
        res(response);
      }, (err) => {
        res([]);
        throw new Error(err);
      });
    })
  }

  getTransactionStatus(){
    return new Promise<any>((res, rej)=>{
      this.requestGet(`/api/getTransactionStatuses`, {}).subscribe(response => {
        res(response);
      }, (err) => {
        res([]);
        throw new Error(err);
      });
    })
  }

  requestGet(url, data) {
    return this.connection.requestGet(url, data, (err, res) => {});
  }

  requestPost(url, data) {
    return this.connection.requestPost(url, data, (err, res) => {});
  }
}
