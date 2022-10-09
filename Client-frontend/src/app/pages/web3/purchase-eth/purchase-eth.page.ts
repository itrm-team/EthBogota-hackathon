import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Swiper, Virtual } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

SwiperCore.use([Virtual]);

@Component({
  selector: 'app-purchase-eth',
  templateUrl: './purchase-eth.page.html',
  styleUrls: ['./purchase-eth.page.scss'],
})
export class PurchaseEthPage implements OnInit {
  @ViewChild('chargeSwiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 400,
    allowTouchMove: false,
  };

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  changeSlide(next: string) {
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

  processInitialPayload(event) {
    console.log("> processInitialPayload:", event);
    /*this.withdrawalPayload = JSON.parse(JSON.stringify(ev));
    this.selectedExchangeRate = this.withdrawalPayload.selectedExchangeRate;
    this.amountTransaccion = this.withdrawalPayload.sendingQuantity;
    this.amountRecipient = this.withdrawalPayload.recievingQuantity;
    this.recipientCurrency = this.withdrawalPayload.selectedRecipientCurrency;
    this.sendingCurrency = this.withdrawalPayload.selectedSenderCurrency;
    this.comisionValue = this.withdrawalPayload.comisionValue;*/
  }

}
