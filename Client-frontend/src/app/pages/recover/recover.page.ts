import { Component, OnInit, ViewChild } from '@angular/core'
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular'
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
    selector: 'app-recover',
    templateUrl: './recover.page.html',
    styleUrls: ['./recover.page.scss'],
})
export class Recover implements OnInit {
    account: { username: string, email: string, idaccount: string, password: string } = {
        email: '',
        username: '',
        idaccount: '',
        password: ''
    };
    @ViewChild('recoverSwiper', { static: false }) swiper?: SwiperComponent
    config: SwiperOptions = {
        slidesPerView: 1,
        spaceBetween: 400,
        allowTouchMove: false,
    }
    private loginErrorString: string;
    email: any
    constructor(
        public navCtrl: NavController,
        public user: UserService,
        public toastCtrl: ToastController,
        public modalCtrl: ModalController,
        private emailManager: EmailManagerService,
    ) { }

    ngOnInit() { }

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
    async presentErrorToast() {
        const toast = await this.toastCtrl.create({
            message: this.loginErrorString,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }
    async getUserPromise(resp: any) {
        const user: any = await this.user.getUserPromise(resp);
    }
    recover() {
        
        return new Promise<any>((res) => {
            
            this.emailManager.sendConfirmationEmailForRecover(
                { email: this.account.email },
                (response) => {
                    this.presentModal(response);
                    res(true)
                    this.navCtrl.navigateForward('')
                }
            )
        })

    }
    
    async presentModal(response) {
        const modal = await this.modalCtrl.create({
            component: InfoModalPage,
            cssClass: 'info-modal',
            componentProps: {
                icon: 'assets/images/pup_land/'+response.icon+'.svg',
                title: response.title,
                content: response.content,
                btnLabel: 'Aceptar'
            }
        });
        return await modal.present();
    }

    displayControl (object: any) { return object.invalid && (object.dirty || object.touched) }
}
