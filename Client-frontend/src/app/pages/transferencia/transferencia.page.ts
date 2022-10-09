import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage';

const USER = 'current_user';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.page.html',
  styleUrls: ['./transferencia.page.scss'],
})
export class TransferenciaPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public user: UserService,
    protected storage: Storage,
  ) {
    this.storage.get(USER).then(user =>{
      if (user == undefined)
        this.logout();
    });
  }

  logout(){
    this.user.logout();
    this.navCtrl.navigateRoot('login');
  }

  ngOnInit() {
  }

  dashboard() {
    this.navCtrl.navigateRoot('dashboard');
  }

}
