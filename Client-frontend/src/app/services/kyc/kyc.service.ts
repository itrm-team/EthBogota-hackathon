import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class KycService {

  constructor(private connection: AuthService) { }

  getName(email: string, callback){
    console.log("email", email)
    this.request(`/api/kyc/getName?email=${email}`, {}).subscribe(response => {
      callback(response);
    }, (err) => {
      throw new Error(err);
    });
  }

  request(url, data) {
    return this.connection.requestGet(url, data, (err, res) => {});
  }
  
}

