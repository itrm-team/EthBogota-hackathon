import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FinancialEntitiesService {

  constructor(private connection: AuthService) { }

  getFinancialEntities(callback) {
    this.request(`/api/getFinancialEntities`, {}).subscribe(response => {
      callback(response);
    }, (err) => {
      throw new Error(err);
    });
  }

  request(url, data) {
    return this.connection.requestGet(url, data, (err, res) => {});
  }
}
