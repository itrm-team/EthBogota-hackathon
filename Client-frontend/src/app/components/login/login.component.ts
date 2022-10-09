import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { TerminosCondicionesComponent } from 'src/app/components/terminos-condiciones/terminos-condiciones.component';
import { UserService } from 'src/app/services/user/user.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { InfoModalPage } from '../../pages/modals/info-modal/info-modal.page';
import gsap from 'gsap';
import { StorageService } from 'src/app/services/storage/storage.service';
import { dataLayer, sendInfoToData } from 'src/configuration';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  // The `ion-modal` element reference.
  modal: HTMLElement;
  currentRoute: string;

  //* GSAP TIMELINES
  introTl = gsap.timeline({ paused: true });
  loginInTl = gsap.timeline({ paused: true });
  loginOutTl = gsap.timeline({ paused: true });
  public showPassword: boolean;
  account: { username: string; email: string; idaccount: string; password: string } = {
    email: '',
    username: '',
    idaccount: '',
    password: ''
  };

  public errorMessages = {
    email: { type: 'required', message: 'email is required.' },
    password: { type: 'required', message: 'password is required.' },
  };

  public registerForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  error = '';
  githubURL: string;
  terms = false;

  mode = 'login';
  modeBefore = '';
  showLogin = true;
  showBalance = false;
  showMenu = false;
  private passwordReg = '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';
  private emailReg = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

  private loginErrorString: string;
  
  constructor(
    public navCtrl: NavController,
    public user: UserService,
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private router: Router,
    private storage: StorageService,
    private zone: NgZone,
  ) {
    this.currentRoute = '';
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        this.currentRoute = event.url;
        switch (event.url) {
          case '/':
            this.changeMode('login', event.url);
            break;
          case '/tutorial':
            this.changeMode('hide', event.url);
            break;
          case '/dashboard/viio':
            this.changeMode('viio', event.url);
            break;
          default:
            this.changeMode('close', event.url);
            break;
        }
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar

        // Present error to user
        console.log(event.error);
      }
    });
  }

  async ngOnInit() {
    //check token for loading page if so go to dashboard.
    let user = await this.storage.get(this.storage.getMemo().CURRENT_USER)

  }

  ngAfterViewInit() {
    let vh = window.innerHeight * 0.01;
    const elem = document.querySelector('.login') as HTMLElement;
    elem.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
      vh = window.innerHeight * 0.01;
      elem.style.setProperty('--vh', `${vh}px`);
    });
    this.initAnims();
  }

  initAnims() {
    document.querySelector('.login__logo').classList.add('float');

    //* LOGIN IN ANIMATION
    this.loginInTl.to('.login__home', {
      autoAlpha: 1,
      duration: 0
    });
    this.loginInTl.to('.login__logo', {
      paddingTop: '75px',
      top: 0,
      transform: 'translateY(0%)',
      duration: 1,
      delay: 1,
      // eslint-disable-next-line object-shorthand
      onComplete: function() {
        // eslint-disable-next-line no-underscore-dangle
        this._targets[0].classList.remove('float');
      }
    });
    this.loginInTl.fromTo('.login__elem', {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      duration: 1,
      stagger: 0.3
    }, '<1.5');

    //* LOGIN OUT ANIMATION
    this.loginOutTl.to('.login__home', {
      autoAlpha: 0,
      duration: 0.5
    });

    //* INTRO ANIMATION
    this.introTl.fromTo('.login__logo-symbol', {
      autoAlpha: 0,
      y: '30px'
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      delay: 1
    });
    this.introTl.fromTo('.login__logo-text', {
      autoAlpha: 0,
      y: '30px'
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      onComplete: () => {
        if (this.account.username !== '') {
          this.zone.run(() => { this.router.navigate (['/dashboard/viio']); });
          this.loginOutTl.play();
        } else {
          this.loginInTl.play();
        }
      }
    });
    this.introTl.play();
  }

  doLogin() {
    const self = this;
    //intercom
    sendInfoToData(this.account.email)
    this.user.login(this.account).subscribe((resp) => {
      self.getUserPromise(resp);
    }, (err) => {
      this.presentModal(err);
      }
    );
    
  }

  async presentModal(error:any) {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/'+error.icon+'.svg',
        title: error.title,
        content: error.msg,
        btnLabel: 'Entendido'
      }
    });
    return await modal.present();
  }

  changeMode(mode: string, url: string) {
    const host = document.querySelector('app-login') as HTMLElement;
    if (mode === 'hide') {
      host.style.pointerEvents = 'none';
    } else {
      host.style.pointerEvents = 'inherit';
    }
    /* This option for menu in header
    if (mode === 'menu' && this.mode !== 'menu') {
      this.modeBefore = this.mode;
    } */
    const currentMode = this.mode;
    this.mode = mode !== ''? mode: this.modeBefore;
    if (currentMode === this.mode) {
      return;
    }
    switch (currentMode) {
      case 'login':
        if (url !== '/tutorial') {
          this.loginOutTl.play().then(() => {
            this.showLogin = false;
          });
        }
        break;
      case 'hide':
        this.showLogin = false;
        break;
      case 'viio':
        this.showBalance = false;
        break;
      case 'menu':
        this.showMenu = false;
        break;
      default:
        break;
    }
    setTimeout(() => {
      switch (this.mode) {
        case 'login':
          this.showLogin = true;
          this.loginInTl.play();
          break;
        case 'viio':
          this.showBalance = true;
          break;
        case 'menu':
          this.showMenu = true;
          break;
        default:
          break;
      }
    }, 600);
  }

  async getUserPromise(resp) {
    const user: any = await this.user.getUserPromise(resp);
    if(user.statusTutorial==true)
      this.navCtrl.navigateForward('tutorial');
    else
      this.navCtrl.navigateForward('dashboard/viio');
  }

  async presentErrorToastWithString(str: string) {
    const toast = await this.toastCtrl.create({
      message: str,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  presentAlertWithString(title: string, msg: string) {
    const alert = this.alertController.create({
      message: msg,
      header: title,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  signup() {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfCQWdermVyGPB4vxT5OZg52Vc0KLWlqz7h-kpjllEYGY3B6g/viewform', 'blank');
  }

  changeSlide(next: string) {
    switch (next) {
      case 'home':
        this.navCtrl.navigateForward('/login');
        break;
      case 'next':
        //this.swiper.swiperRef.slideNext(500);
        break;
      case 'back':
        //this.swiper.swiperRef.slidePrev(500);
        break;
      default:
        break;
    }
  }


}