import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Swiper, Virtual } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { InfoModalPage } from '../../pages/modals/info-modal/info-modal.page';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { ReferenceService } from 'src/app/services/references/references.service';

SwiperCore.use([Virtual]);

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {
  @ViewChild('userDataSwiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 400,
    allowTouchMove: false
  };

  newEmail;
  newCelphone;
  timerUpdate: number = 0;
  newTimerUpdate = new Date;
  disableButton: boolean = false;
  user: any;

  currentUser = {"email":'',"phone":'', timerUpdate: new Date()}
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private storage: StorageService,
    private userService: UserService,
    private referenceServ: ReferenceService,
  ) { }

  async ngOnInit() {
    this.user = await this.storage.get(
      this.storage.getMemo().CURRENT_USER
    );
    this.currentUser.email = this.user.email;
    this.currentUser.phone = this.user.phone;
    this.currentUser.timerUpdate = this.user.timerUpdate;
  }

  setReference() {
    return new Promise((res, rej) => {
      this.referenceServ
        .createReference(this.user)
        .subscribe(
          result => {
            res(result)
          },
          error => {
            this.presentKycModal()
          },
        );
    });
  }

  async calculateTime(){
    await this.setReference();
    this.user = await this.storage.get(
      this.storage.getMemo().CURRENT_USER
    );
    const now = new Date();
    const limit = new Date(this.user.timerUpdate)
    this.timerUpdate = now.getTime() - limit.getTime();
    console.log("Time now ", now)
    console.log("Time limit", limit)
    console.log("User", this.user)
    if (this.timerUpdate >= 0){
      this.newTimerUpdate = new Date(now.setDate(new Date().getDate() + 183));
      console.log("Tiempo sumado", this.newTimerUpdate)
      this.presentModal()
    }else
      this.presentModalBlock()
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Email_already.svg',
        title: 'Info',
        content: 'Se podrán actualizar los datos cada 6 meses, ¿Desea continuar?',
        btnCallback: ()=>{
          this.userService.setTimerUpdate({
            email: this.currentUser.email,
            newValues:{ metadata: {timerUpdate: this.newTimerUpdate}}
          }).subscribe((response) => {
            console.log("> response:", response);
          }) ;
        },
        btnLabelA: 'Si',
        btnLabel: 'No',
      }
    });
    return await modal.present();
  }

  async presentModalBlock() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Email_already.svg',
        title: 'Info',
        content: 'Podra actualizar sus datos en ' + Math.ceil((this.timerUpdate*-1)*(1.1574*10**-8)) + ' dias',
        btnCallback: ()=>{ 
          this.navCtrl.navigateForward('/dashboard/configuration')
        },
        btnLabelA: 'Entendido',
      }
    });
    return await modal.present();
  }

  async presentKycModal() {
    let self = this;
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Wrong_1.svg',
        title: 'No se pudo verificar kyc del usuario',
        content: `Por favor registrarse en <a href='https://portal.sekuritance.com/launches/9b6d3e1e-2af9-4fdb-ab13-1a01eb3ad087'>kyc</a>. En caso de ya haberse registrado esperar un día`,
        btnLabelA: 'Entendido',
        btnCallback: () => {
          self.disableButton = true;
          setTimeout(()=>{
            self.disableButton = false;
          }, 2000);
        }
      },
    });
    return await modal.present();
  }

  changeSlide(next: string) {
    const page = this.swiper.swiperRef.activeIndex;
    switch (next) {
      case 'home':
        this.navCtrl.navigateForward('/dashboard/configuration');
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

  displayControl (object: any) { return object.invalid && (object.dirty || object.touched) }
}
