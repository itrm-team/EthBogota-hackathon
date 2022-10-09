import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { InfoModalPage } from '../../modals/info-modal/info-modal.page';
import { Router } from '@angular/router';
import { Web3serviceService } from 'src/app/services/web3service/web3service.service';

@Component({
  selector: 'app-configure-guardians',
  templateUrl: './configure-guardians.page.html',
  styleUrls: ['./configure-guardians.page.scss'],
})
export class ConfigureGuardiansPage implements OnInit {
  @ViewChild('userDataSwiper', { static: false }) swiper?: SwiperComponent;
  @ViewChild('chartInput') chatInput: any

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 400,
    allowTouchMove: false
  };

  guardians: any = [
    { address: '0xsadjklrejlkdsfjlksdajlkasksw' },
    { address: '0xsadjklrejlkdsfjlksdajlkasksw' },
    { address: '9xsadjklrejlkdsfjlksdajlkasksw' },
    { address: '2xsadjklrejlkdsfjlksdajlkasksw' }
  ];
  currentUser = { email: '' };

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private storage: StorageService,
    private alertCtrl: AlertController,
    private router: Router,
    private web3Service: Web3serviceService
  ) { }

  currentGuardian: any;
  walletData: any = null;

  async ngOnInit() {
    this.walletData = await this.storage.get(this.storage.getMemo().WALLET)
    console.log("wallet data",this.walletData);
    if(this.walletData) {this.guardians = await this.web3Service.obtainGuardiansOfVault(this.walletData); console.log("gg", this.guardians)}
    else this.navCtrl.navigateForward('/dashboard/web3');
  }

  changeSlide(next: string) {
    const page = this.swiper.swiperRef.activeIndex;
    switch (next) {
      case 'home':
        this.navCtrl.navigateForward('/dashboard/web3');
        break;
      case 'next':
        this.swiper.swiperRef.slideNext(500);
        break;
      case 'back':
        this.swiper.swiperRef.slidePrev(500);
        break;
      default:
        break;
    }
  }

  async presentModal() {
    /* const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Saving_dollars.svg',
        title: 'Info',
        content: 'Los guardianes de tus datos de recuperación serán actualizados, ¿Desea continuar?',
        btnCallback: () => {
          this.router.navigate(['/dashboard/', 'viio']);
        },
        btnLabelA: 'Si',
        btnLabel: 'No',
      }
    });
    return await modal.present(); */
    const alert =await this.alertCtrl.create({
      header: "Atención",
      message: "Los guardianes de tus datos de recuperación serán actualizados, ¿Desea continuar?",
      buttons:[
        {
          text: "Ok",
          handler: async ()=>{
            await this.web3Service.saveGuardianOfVault({address: this.currentGuardian}, this.walletData);
            this.guardians = await this.web3Service.obtainGuardiansOfVault(this.walletData);
            this.currentGuardian = '';
          }
        },
        {
          text: "Cancelar",
          handler: ()=>{

          }
        },
      ]
    })
    return await alert.present();
  }

  deleteGuardian(index: number) {
    this.guardians.splice(index, 1);
  }

  async addGuardian() {
    if(this.currentGuardian != '' && this.currentGuardian != undefined && this.currentGuardian != null) {
      /* this.guardians.unshift({address: ''+this.currentGuardian}) */
      await this.presentModal();
    } else {
      const alert =await this.alertCtrl.create({
        header: "Dirección inválida",
        message: "Por favor verifique la dirección de su guardían",
        buttons:[
          {text: "Ok"}
        ]
      })
      await alert.present();
    }
  }
}
