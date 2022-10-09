import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

interface iLinkedWallet {
  id_user: string,
  walletAddress: string;
  trustContractAddress: string;
}

@Injectable({
  providedIn: 'root'
})
export class Web3walletVerifierService {

  linkWallet(dbWallet: { walletAddress: string; trustContractAddress: string; }) {
    return new Promise<any>((res, rej)=>{
      res(true);
    })
  }
  obtainUserWallet() {
    return {walletAddress: null, trustContractAddress: 'lol,lmaoeven' }
  }

  constructor(
    private auth: AuthService
  ) { }

  getLinkedWallet(userId: string) {
    return new Promise((resolve, reject) => {
      this.auth.requestPost("/api/getLinkedWallet", {
        id_user: userId
      }, () => {}).subscribe((response: iLinkedWallet[]) => {
        resolve(response.length > 0 ? response[0] : undefined);
      }, (err) => {
        reject(err);
      });
    });
  }

  getLinkedWallets() {
    return new Promise((resolve, reject) => {
      this.auth.requestGet("/api/getLinkedWallets", {}, () => {}).subscribe(response => {
        resolve(response);
      }, (err) => {
        reject(err);
      });
    });
  }

  setLinkedWallet(link: { id_user: string, walletAddress: string, trustContractAddress: string }) {
    return new Promise((resolve, reject) => {
      this.auth.requestPost("/api/setLinkedWallet", link, () => {}).subscribe(response => {
        resolve(response);
      }, (err) => {
        reject(err);
      });
    });
  }

  updateLinkedWallet(link: { id_user: string, walletAddress: string, trustContractAddress: string }) {
    return new Promise((resolve, reject) => {
      this.auth.requestPut("/api/updateLinkedWallet", link, () => {}).subscribe(response => {
        resolve(response);
      }, (err) => {
        reject(err);
      });
    });
  }
  
}
