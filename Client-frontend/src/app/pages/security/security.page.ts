import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Swiper, Virtual } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { InfoModalPage } from '../modals/info-modal/info-modal.page';

SwiperCore.use([Virtual]);

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {
  @ViewChild('securitySwiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 400,
    allowTouchMove: false
  };
  confirmPassword: any;
  newPassword: any;
  oldPassword: any;
  public showPassword: boolean;
  showPassword2: boolean = false;
  showPassword3: boolean = false;
  passwordsAreEquals: boolean = true
  constructor(
    public navCtrl: NavController,
    private storage: StorageService,
    private userService: UserService,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }
  
  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  changeSlide(next: string) {
    const page = this.swiper.swiperRef.activeIndex;
    switch (next) {
      case 'home':
        this.navCtrl.navigateForward('/dashboard');
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

  async updatePassword(){
    this.passwordsAreEquals = this.newPassword == this.confirmPassword
    if(this.newPassword === this.confirmPassword){
      let user = await this.storage.get(this.storage.getMemo().CURRENT_USER);
      user.newPassword = this.newPassword;
      user.newPasswordRepeat = this.confirmPassword;
      user.oldPassword = this.oldPassword;
      this.userService.updatePassword(user, (res)=>{
        if(res) {
          this.presentModal()
        }
      })
    }
    
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Created_password.svg',
        title: 'Success',
        content: 'Su contraseña se actualizó con éxito',
        btnLabel: 'Entendido'
      }
    });
    return await modal.present();
  }

  displayControl (object: any) { return object.invalid && (object.dirty || object.touched) }
}
