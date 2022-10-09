import { Component, OnInit, ViewChild } from '@angular/core'
import { AlertController, ModalController, NavController } from '@ionic/angular'
import { SwiperComponent } from 'swiper/angular'
import SwiperCore, { SwiperOptions, Swiper, Virtual } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import { InfoModalPage } from '../modals/info-modal/info-modal.page'
import { UserService } from 'src/app/services/user/user.service'
import { EmailManagerService } from 'src/app/services/emailManager/email-manager.service'


SwiperCore.use([Virtual])

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
    sign_up_password: any
    sign_up_password_confirmation: any
    sign_up_q2: any
    sign_up_q1: any
    email: string = '';
    sign_up_terms: boolean = false;
    cellphone: any

    emailSent: boolean = false

    @ViewChild('signUpSwiper', { static: false }) swiper?: SwiperComponent
    config: SwiperOptions = {
        slidesPerView: 1,
        spaceBetween: 400,
        allowTouchMove: false,
    }
    passwordValidated: boolean = true
    passwordsAreEquals: boolean = true
    validationCode: any = '000000';
    c_number1: number;
    c_number2: number;
    c_number3: number;
    c_number4: number;
    c_number5: number;
    c_number6: number;
    confirmation_number: any;
    username: string = '';
    disableButton: boolean = true

    selectedOption = 0;
    actions = [{ id: 0, name: 'Seleccciona una pregunta' },
    { id: 1, name: '¿Cual era el nombre de tu mascota de la infancia?' },
    { id: 2, name: '¿Dónde estudiaste la primaria?' },
    { id: 3, name: '¿Cual es tu banda o artista favorito?' },
    { id: 4, name: '¿Nombre de la empresa donde trabajo por primera vez?' }]

    selectedOption2 = 0;
    actions2 = [{ id2: 0, name2: 'Seleccciona una pregunta' },
    { id2: 1, name2: '¿Cual era el nombre de tu mascota de la infancia?' },
    { id2: 2, name2: '¿Dónde estudiaste la primaria?' },
    { id2: 3, name2: '¿Cual es su banda o artista favorito?' },
    { id2: 4, name2: '¿Nombre de la empresa donde trabajo por primera vez?' }]


    showPassword: boolean = false;
    showPassword2: boolean = false;

    
    failCodeVerification=0;

    constructor(
        public navCtrl: NavController,
        private modalCtrl: ModalController,
        private userService: UserService,
        private emailManager: EmailManagerService,
        private alertController: AlertController
    ) {}

    ngOnInit() {}

    showHidePassword() {
        this.showPassword = !this.showPassword;
    }

    showHidePassword2() {
        this.showPassword2 = !this.showPassword2;
    }


    changeSlide(next: string) {
        const page = this.swiper.swiperRef.activeIndex
        switch (next) {
            case 'home':
                this.navCtrl.navigateForward('')
                break
            case 'next':
                this.swiper.swiperRef.slideNext(500)
                break
            case 'back':
                this.swiper.swiperRef.slidePrev(500)
                break
            default:
                break
        }
    }


    async sendCode() {
        this.changeSlide('next')
        await this.presentModal()
        await this.sendConfirmationEmail()
    }

    async presentModal() {
        const modal = await this.modalCtrl.create({
          component: InfoModalPage,
          cssClass: 'info-modal',
          componentProps: {
            icon: 'assets/images/pup_land/Email_1.svg',
            title: 'Código de confirmación',
            content: 'Enviaremos un código a tu correo electrónico para verificar que tienes acceso',
            btnLabel: 'Entendido'
          }
        });
        return await modal.present();
    }
    async presentModalProblem() {
        const modal = await this.modalCtrl.create({
          component: InfoModalPage,
          cssClass: 'info-modal',
          componentProps: {
            icon: 'assets/images/pup_land/Confirmation_code.svg',
            title: 'Problema con el código de verificación',
            content: 'Por favor, intente más tarde',
            btnLabel: 'Entendido'
          }
        });
        return await modal.present();
    }

    async resendConfirmationEmail() {
        this.failCodeVerification=0;
        await this.presentModalEmail()
        await this.sendConfirmationEmail()
    }

    async presentModalEmail() {
        const modal = await this.modalCtrl.create({
          component: InfoModalPage,
          cssClass: 'info-modal',
          componentProps: {
            icon: 'assets/images/pup_land/Email_1.svg',
            title: 'Importante!',
            content: 'Un nuevo código de confirmación ha sido enviado, revise su correo.',
            btnLabel: 'Entendido'
          }
        });
        return await modal.present();
    }


    async presentAlert(config) {
        const alert = await this.alertController.create(config)
        await alert.present()
    }

    async validateConfirmationCode() {
        this.confirmation_number = this.c_number1.toString() + this.c_number2.toString() + this.c_number3.toString() + this.c_number4.toString() + this.c_number5.toString() + this.c_number6.toString(); 
        if (this.failCodeVerification==3){
            this.presentModalErrorfirst()
        }else{
            if (
                this.confirmation_number != undefined &&
                this.confirmation_number == this.validationCode
            ) {
                this.registerUser();
            } else {
                this.failCodeVerification=this.failCodeVerification+1;
                this.presentModalError()
            }
        }
    }

    async presentModalErrorfirst() {
        const modal = await this.modalCtrl.create({
          component: InfoModalPage,
          cssClass: 'info-modal',
          componentProps: {
            icon: 'assets/images/pup_land/Cancel_1.svg',
            title: 'Registro cancelado',
            content: 'Has excedido el número  máximo de intentos para validar código de verificación',
            btnLabel: 'Entendido'
          }
        });
        return await modal.present();
    }

    async presentModalError() {
        const modal = await this.modalCtrl.create({
          component: InfoModalPage,
          cssClass: 'info-modal',
          componentProps: {
            icon: 'assets/images/pup_land/Wrong_1.svg',
            title: 'Error!',
            content: 'Su código de verificación está errado. Tiene ' + (4 - this.failCodeVerification) +
            ' intentos restantes.',
            btnLabel: 'Entendido'
          }
        });
        return await modal.present();
    }

    sendConfirmationEmail() {
        return new Promise<any>((res, rej) => {
            this.emailManager.sendSignUpConfirmationEmail(
                { email: this.email },
                (response) => {
                    if (response.code) {
                        this.validationCode = '' + response.code
                        res(true)
                    } else res(null)
                }
            )
        })
    }

    async presentModalErrorEmail() {
        const modal = await this.modalCtrl.create({
          component: InfoModalPage,
          cssClass: 'info-modal',
          componentProps: {
            icon: 'assets/images/pup_land/Email_1.svg',
            title: 'Este correo ya se encuentra en uso',
            content: 'Ya existe una cuenta asociada a este correo electrónico. Intenta ingresar con tu contraseña o recupera el acceso.',
            btnLabel: 'Entendido'
          }
        });
        return await modal.present();
      }

    registerUser() {
        try{
            this.userService
                .signup({
                    email: this.email,
                    phone: this.cellphone,
                    username: this.username,
                    password: this.sign_up_password,
                    numberQ1: this.selectedOption,
                    questionR1: this.sign_up_q1,
                    numberQ2: this.selectedOption2,
                    questionR2: this.sign_up_q2
                })
                .subscribe((response) => {
                    this.navCtrl.navigateForward('')
                    this.swiper.swiperRef.slideTo( 0, 400, false);
                    this.presentModalWelcome()
                })
            }catch(err){
                this.presentModalErrorRegister(err)
            }
    }

    async presentModalWelcome() {
        const modal = await this.modalCtrl.create({
          component: InfoModalPage,
          cssClass: 'info-modal',
          componentProps: {
            icon: 'assets/images/pup_land/Welcome.svg',
            title: 'Bienvenido!',
            content: 'Ahora eres parte de la comunidad VIIO. Ingresa con tus credenciales.',
            btnLabel: 'Entendido'
          }
        });
        return await modal.present();
    }

    async presentModalErrorRegister(err) {
        const modal = await this.modalCtrl.create({
          component: InfoModalPage,
          cssClass: 'info-modal',
          componentProps: {
            icon: 'assets/images/pup_land/Invalid_access.svg',
            title: 'Error',
            content: err.error.msg,
            btnLabel: 'Entendido'
          }
        });
        return await modal.present();
    }

    validateEmail() {
            this.userService.checkEmail({ email: this.email }).subscribe(
                (response) => {
                    this.changeSlide('next')
                },
                (err) => {
                    this.presentModalErrorEmail();
                    throw new Error(err),
                    this.navCtrl.navigateForward('')
                }
            )
        // #Change slide if the response is status 200
        // #Present alert if the response is status 400
    }
    
    displayControl (object: any) { return object.invalid && (object.dirty || object.touched) }
}
