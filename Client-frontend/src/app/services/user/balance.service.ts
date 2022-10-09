import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(public connection: AuthService) { }

  getBalance(user, callback) {
    this.request(`/api/getSelfBalance?id_user=${user.id_user}`, user).subscribe(response => {
      callback(response)
    }, (err) => {
      console.log(err);
      callback(err);
    });
  }

  request(url, data) {
    return this.connection.requestGet(url, data, (err, res) => {});
  }
}
