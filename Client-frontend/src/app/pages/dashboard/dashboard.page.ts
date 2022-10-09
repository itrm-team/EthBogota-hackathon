import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage-angular';
import { BalanceService } from 'src/app/services/user/balance.service';

import { ModalController } from '@ionic/angular';
import { MenuModalPage } from '../modals/menu-modal/menu-modal.page';

const USER = 'current_user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  // The `ion-modal` element reference.
  modal: HTMLElement;

  email = '';
  balance = 0;

  constructor(
    public navCtrl: NavController,
    public user: UserService,
    protected storage: Storage,
    protected balanceService: BalanceService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.storage.get(USER).then(user => {
      if (user === undefined)
        {this.logout();}
      this.email = user.email;
      this.balanceService.getBalance(user, response => {
        this.balance = response[0].balance;
      });
      
    });
  }
  logout() {
    this.user.logout();
    this.navCtrl.navigateRoot('login');
  }

  buy() {
    this.navCtrl.navigateRoot('fondos');
  }

  transfer() {
    this.navCtrl.navigateRoot('transferencia');
  }

}
