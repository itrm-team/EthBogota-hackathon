import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { InfoModalPage } from 'src/app/pages/modals/info-modal/info-modal.page';
import { StorageService } from 'src/app/services/storage/storage.service';
import { sendInfoToDataExit } from 'src/configuration';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {
  @Output() logOutEvent = new EventEmitter();
  constructor(
    private storage: StorageService,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Log_out.svg',
        title: 'Cerrarás sesión en este dispositivo',
        content: '¿Seguro que quiere cerrar sesión?',
        btnCallback: () => {
          sendInfoToDataExit()
          this.logOutEvent.emit();
          this.storage.removeAll();
          this.navCtrl.navigateForward('');
        },
        btnLabelA: 'Continuar',
        btnLabel: 'Cancelar',
      },
    });
    return await modal.present();
  }

  // async logOut() {
  //   //intercom
  //   await sendInfoToDataExit()
  //   await this.logOutEvent.emit();
  //   await this.storage.removeAll();
  //   await this.navCtrl.navigateForward('');
  //   // setTimeout(() => {
  //   //   let intercome: any = document.getElementsByClassName(
  //   //     'intercom-lightweight-app'
  //   //   )['0'];
  //   //   intercome.style.setProperty('display', 'none', 'important');
  //   // }, 300);
  // }

}
