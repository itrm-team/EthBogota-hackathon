import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import SwiperCore, { SwiperOptions, Swiper, Virtual } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { SwiperComponent } from 'swiper/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { InfoModalPage } from '../modals/info-modal/info-modal.page';

SwiperCore.use([Virtual]);
@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {
  passwordValidated: boolean = true;
  passwordsAreEquals: boolean = true;
  newPassword: any;
  retypepassword: any;
  isVisible: boolean = false;
  userData: any;
  token: any;
  public showPassword: boolean;
  showPassword2: boolean = false;
  contadorLocal: number = 1;
  selectedOption = 0;
  actions = [
    { idquestion: 0, name: 'Select Question' },
    {
      idquestion: 1,
      name: '1. Cuál era el nombre de tu mascota de la infancia?',
    },
    { idquestion: 2, name: '2. Dónde estudiaste la primaria?' },
    { idquestion: 3, name: '3. Cuál es su banda o artista favorito?' },
    {
      idquestion: 4,
      name: '4. Nombre de la empresa donde trabajo por primera vez?',
    },
  ];

  selectedOption2 = 0;
  actions2 = [
    { idquestion2: 0, name2: 'Select Question' },
    {
      idquestion2: 1,
      name2: '1. Cuál era el nombre de tu mascota de la infancia?',
    },
    { idquestion2: 2, name2: '2. Dónde estudiaste la primaria?' },
    { idquestion2: 3, name2: '3. Cuál es su banda o artista favorito?' },
    {
      idquestion2: 4,
      name2: '4. Nombre de la empresa donde trabajo por primera vez?',
    },
  ];
  @ViewChild('recoverPasswordSwiper', { static: false })
  swiper?: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 400,
    allowTouchMove: false,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController,
    private authService: AuthService,
    public navCtrl: NavController,
    private storage: StorageService,
    private userService: UserService,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((_p) => {
      if (_p.token) {
        this.token = _p.token;
        try {
          this.authService.validateExternalToken(_p.token);
          this.userData = this.authService.resolveToken(_p);
          this.isVisible = true;
          this.selectedOption = this.userData.numberQ1;
          this.selectedOption2 = this.userData.numberQ2;
        } catch (err) {
          this.presentErrorToastString('INVALID ACCESS TOKEN');
        }
      } else {
        this.presentErrorToastString('UNAUTHORIZED');
      }
    });
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  account: { token: string; questionR1: string; questionR2: string } = {
    token: '',
    questionR1: '',
    questionR2: '',
  };

  changeSlide(next: string) {
    const page = this.swiper.swiperRef.activeIndex;
    switch (next) {
      case 'home':
        this.navCtrl.navigateForward('');
        break;
      case 'next':
        this.swiper.swiperRef.slideNext(500);
        break;
      case 'back':
        this.swiper.swiperRef.slideNext(500);
        break;
      default:
        break;
    }
  }

  async presentErrorToastString(text: any) {
    let toast = await this.toastCtrl.create({
      message: text,
      position: 'top',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('');
          },
        },
      ],
    });
    toast.present();
  }

  async sendAlertToast(text: string) {
    let toast = await this.toastCtrl.create({
      message: text,
      position: 'top',
      buttons: [{ text: 'OK', handler: () => {} }],
    });
    toast.present();
  }
  checkPassword(str: string) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&\.*])[a-zA-Z0-9!@#\.$%^&*]{8,}$/.test(str);
  }
  questions() {
    if (
      this.account.questionR1 == this.userData.questionR1 &&
      this.account.questionR2 == this.userData.questionR2
    ) {
      this.changeSlide('next');
    } else {
      if (this.contadorLocal < 3) {
        this.presentModal(this.contadorLocal);
        this.contadorLocal += 1;
      } else {
        this.presentModalBlock();
        this.userService.questions({
          email: this.userData.email,
          contador: this.contadorLocal,
        });
        this.navCtrl.navigateForward('');
      }
    }
  }
  async presentModal(contador: number) {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Wrong_password.svg',
        title: 'Al menos una de las respuestas es incorrecta',
        content: 'Te quedan ' + (3 - contador) + ' intentos',
        btnLabel: 'Entendido',
      },
    });
    return await modal.present();
  }
  async presentModalBlock() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Account_bloqued.svg',
        title: 'Tu cuenta ha sido bloqueda',
        content:
          'Para recuperar acceso a tu cuenta escríbenos a soporte@viio.me desde tu correo registrado. Te pediremos algunos datos para verificar titularidad de la cuenta',
        btnLabel: 'Entendido',
      },
    });
    return await modal.present();
  }
  async presentModalSuccess() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Confirmation_code.svg',
        title: 'Contraseña creada',
        content: 'Has recuperado el acceso a tu cuenta. Ingresa usando tu nueva contraseña.',
        btnLabel: 'Continuar',
      },
    });
    return await modal.present();
  }
  async presentErrorToast() {
    const toast = await this.toastCtrl.create({
      message: 'Respuestas incorrectas',
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

  async recoverPassword(token: any) {
    token = this.storage.getMemo().TOKEN_KEY;
    this.passwordValidated = this.checkPassword(this.newPassword);
    this.passwordsAreEquals = this.newPassword == this.retypepassword;
    if (this.passwordValidated && this.passwordsAreEquals) {
      const self = this;
      this.userService
        .recover({
          email: this.userData.email,
          password: this.newPassword,
          retypepassword: this.retypepassword,
        })
        .subscribe(
          (resp) => {},
          (err) => {}
        );
        this.presentModalSuccess()
    } else {
      this.sendAlertToast('Las contraseñas deben ser iguales');
    }
    this.navCtrl.navigateForward('');
  }
  async getUserPromise(resp) {
    const user: any = await this.userService.getUserPromise(resp);
  }

  displayControl (object: any) { return object.invalid && (object.dirty || object.touched) }
}
