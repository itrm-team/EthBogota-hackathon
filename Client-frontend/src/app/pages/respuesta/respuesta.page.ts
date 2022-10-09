import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Swiper, Virtual } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { InfoModalPage } from '../modals/info-modal/info-modal.page';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from '../../../environments/environment';
import { ReferenceService } from 'src/app/services/references/references.service';
import { ActivatedRoute } from '@angular/router';
import { EmailManagerService } from 'src/app/services/emailManager/email-manager.service';

SwiperCore.use([Virtual]);

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.page.html',
  styleUrls: ['./respuesta.page.scss'],
})
export class RespuestaPage implements OnInit {
  @ViewChild('chargeSwiper', { static: false }) swiper?: SwiperComponent; //tf is this
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 400,
    allowTouchMove: false,
  };

  currentUser: any;
  chargeStatus: string;
  response: any;
  reference: string;
  referenceIsValid: number = 0;

  constructor(
    private route: ActivatedRoute,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private storage: StorageService,
    private referenceServ: ReferenceService,
    private emailManagerServ: EmailManagerService,
  ) {}

  /*
    first: validate the user is logged in (token has not expired)
    second: send the reference to the back end for verifyng
  */

  //verificar inmediatamente el estado de la transaccion
  async ngOnInit() {
    this.currentUser = await this.storage.get(
      this.storage.getMemo().CURRENT_USER
    );
    this.route.queryParams.subscribe((_p) => {
      if (_p.reference) {
        this.reference = _p.reference;
        try {
          this.verifyReference();
        } catch (err) {
          // this.presentErrorToastString('INVALID ACCESS TOKEN');
        }
      } else {
        //this.presentErrorToastString('UNAUTHORIZED');
      }
    });
  }
  
  verifyReference() {
    this.referenceServ.verifyReference({reference:this.reference, id_user:this.currentUser.id_user}).subscribe((data) => {
      this.response = JSON.parse(data);
      let payload =  (this.response.amount_in_cents / 100) * (1/4000)
      try {
        if (this.response.result == 'APPROVED') {
          // this.emailManagerServ.sendDepositConfirmationEmail(
          //   { payload, email: this.currentUser.email },
          //   (response) => {
          //   });
          //this.presentSuccessInfoModal();
          this.referenceIsValid = 1;
        } else {
          this.referenceIsValid = 2;
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  // async presentSuccessInfoModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: InfoModalPage,
  //     cssClass: 'info-modal',
  //     componentProps: {
  //       title: 'Transacción registrada',
  //       content: `Enhorabuena! Tu transacción fue registrada exitosamente, revisa tu correo electrónico por el comprobante de la transacción`,
  //       btnLabel: 'Entendido',
  //     },
  //   });

  //   return await modal.present();
  // }

  changeSlide(next: string) {
    switch (next) {
      case 'home':
        this.navCtrl.navigateForward('/dashboard/viio');
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
}
