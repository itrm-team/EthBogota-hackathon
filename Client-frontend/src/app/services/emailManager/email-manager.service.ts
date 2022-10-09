import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmailManagerService {
  

  constructor(private auth: AuthService) { 

  }
  sendConfirmationEmailForRecover(payload: { email: any; }, callback) {
    this.requestPost('/api/sendConfirmationEmailForRecover', payload).subscribe((response)=>{
      callback(response);
    }, (err) => {
      console.log("error",err);
      throw new Error(err);
    })
  }

  sendSignUpConfirmationEmail(payload: { email: any; }, callback) {
    this.requestPost('/api/sendSignUpConfirmationEmail', payload).subscribe((response)=>{
      callback(response);
    }, (err) => {
      throw new Error(err);
    })
  }

  sendWelcomeVIIOEmail(payload: { email: any; }, callback) {
    this.requestPost('/api/sendWelcomeVIIOEmail', payload).subscribe((response)=>{
      callback(response);
    }, (err) => {
      throw new Error(err);
    })
  }

  sendDepositConfirmationEmail(payload: { email: any; payload: any }, callback) {
    this.requestPost('/api/sendDepositConfirmationEmail', payload).subscribe((response)=>{
      callback(response);
    }, (err) => {
      throw new Error(err);
    })
  }

  sendWithdrawalConfirmationEmail(payload: { email: any; payload: any; }, callback) {
    this.requestPost('/api/sendWithdrawalConfirmationEmail', payload).subscribe((response)=>{
      callback(response);
    }, (err) => {
      throw new Error(err);
    })
  }

  requestPost(url, data) {
    return this.auth.requestPost(url, data, (err, res) => {});
  }
}
