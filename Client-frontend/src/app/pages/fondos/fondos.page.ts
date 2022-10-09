import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage';

const USER = 'current_user';

@Component({
  selector: 'app-fondos',
  templateUrl: './fondos.page.html',
  styleUrls: ['./fondos.page.scss'],
})
export class FondosPage implements OnInit {

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

  ngOnInit() {
  }

  logout(){
    this.user.logout();
    this.navCtrl.navigateRoot('login');
  }

  dashboard() {
    this.navCtrl.navigateRoot('dashboard');
  }

}
