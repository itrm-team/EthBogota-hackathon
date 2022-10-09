import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private navCtrl: NavController, public toastCtrl: ToastController) { }
  canActivate(): Observable<boolean| UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree { 
    return new Promise((resolve, reject) => {
      this.auth.checkToken().then(res => {
        console.log("checked token", res);
        if(res) resolve(res);
        else {
          this.navCtrl.navigateRoot('login');
          this.presentErrorToast("");
          reject(false);
        }
      }).catch(err => {
        console.log("error checking token", err);
        this.navCtrl.navigateRoot('login');
        this.presentErrorToast(err);
        reject(false);
      });
    });
  }

  async presentErrorToast(err){
    let toast = await this.toastCtrl.create({
      message: 'UNAUTHORIZED '+err,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }


}
