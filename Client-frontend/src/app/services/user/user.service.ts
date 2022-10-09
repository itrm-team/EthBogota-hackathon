import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../storage/storage.service';

const USER = 'current_user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _user: any;
  

  constructor(private auth: AuthService, private storage: StorageService) { }
  
  login(accountInfo: any) {
    return this.auth.login(accountInfo, (err, res)=>{
      if (err) this.generateError(err, 'login');
      else if (res.status == 'success') this._loggedIn(res);
    });
  }

  setTutorial(credentials: any) {
    return this.auth.changeMetadata(credentials, (err, res)=>{
        if (err) this.generateError(err, 'setTutorial');
    });
  }

  setTimerUpdate(credentials: any) {
    return this.auth.changeMetadata(credentials, (err, res)=>{
      if (err)
        this.generateError(err, 'setTimerUpdate');
    });
  }

  recover(accountInfo:any){
    return this.auth.recover(accountInfo, (err, res)=>{
      if (err) this.generateError(err, 'recuperar-contraseña');
      else if (res.status == 'success') this.validateData(res);
    });
  }
  questions(accountInfo: any) {
    return this.auth.updateCont(accountInfo, (err, res)=>{
      if (err) this.generateError(err, 'preguntas');
      else if (res.status == 'success') this.validateData(res);
    });
  }
  signup(accountInfo: any) {
    return this.auth.register(accountInfo, (err, res)=>{
        if (err) this.generateError(err, 'signup');
    });
  }

  logout() {
    this.auth.logout();
  }

  async _loggedIn(resp) {
    this._user = resp.user;
    
    await this.storage.set(this.storage.getMemo().CURRENT_USER, this._user);
  }
  async validateData(resp) {
    this._user = resp.user;
    await this.storage.set(this.storage.getMemo().CURRENT_USER, this._user);
  }
  generateError(err, src){
  }

  getUser(callback){
    this.storage.get(this.storage.getMemo().CURRENT_USER).then( user => {
        if (user) callback(null, user);
        else callback ("No user", null);
    });
  }

  getUserPromise(resp){
    return new Promise((resolve, reject)=>{
      let data = this.auth.resolveToken(resp);
      if(data) resolve(data);
      else reject(null);
    });
  }

  getUserByKey(account, callback){
    this.requestPost(`/api/getUserData`, account).subscribe((response) => {
      callback(response['result']);
    }, (err) => {
      throw new Error(err);
    });
  }

  getUsersByEnterprise(enterprise, callback){
    this.requestPost(`/api/getUsersByEnterprise`, {id_enterprise: enterprise.id_enterprise}).subscribe((response) => {
      callback(response['result']);
    }, (err) => {
      throw new Error(err);
    });
  }

  requestPost(url:any, data:any) {
    return this.auth.requestPost(url, data, (err, res) => {});
  }


  validationPasswordWithdraw(user, callback){
    this.requestPost('/api/validationPasswordWithdraw', user).subscribe((response)=>{
      callback(response, null);
    }, (err) => {
      callback(null, err);
    })
  }

  updatePassword(user, callback){
    this.requestPost('/api/updatePassword', user).subscribe((response)=>{
      callback(response);
    }, (err) => {
      callback(null);
      throw new Error(err);
    })
  }

  getConfirmationCode(user, callback){
    this.requestPost('/api/getConfirmationCode', user).subscribe((response)=>{
      callback(response);
    }, (err)=>{
      callback(null);
      throw new Error(err);
    })
  }

  setConfirmationCode(user, callback){
    this.requestPost('/api/setConfirmationCode', user).subscribe((response)=>{
      callback(response);
    }, (err)=>{
      callback(null);
      throw new Error(err);
    })
  }

  checkEmail(email:any){
    return this.auth.checkEmail(email)
  }


}
