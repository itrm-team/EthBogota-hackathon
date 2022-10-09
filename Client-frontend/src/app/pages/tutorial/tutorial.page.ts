import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Swiper, Virtual } from 'swiper';
import { UserService } from 'src/app/services/user/user.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { EmailManagerService } from 'src/app/services/emailManager/email-manager.service'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

SwiperCore.use([Virtual]);

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})

export class TutorialPage implements OnInit {
  @ViewChild('tutorialSwiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 400,
    allowTouchMove: false
  };

  constructor(
    public navCtrl: NavController,
    private storage: StorageService,
    private userService: UserService,
    private emailManager: EmailManagerService,
  ) { }

  async ngOnInit() {
    
  }

  async changeSlide(next: string) {
    const page = this.swiper.swiperRef.activeIndex;
    switch (next) {
      case 'home':
        const user = await this.storage.get(this.storage.getMemo().CURRENT_USER)
          this.userService
              .setTutorial({
                  email: user.email,
                  newValues:{ metadata: {statusTutorial: "false"}}

              })
              .subscribe((response) => {
                this.emailManager.sendWelcomeVIIOEmail(
                  { email: user.email },
                  (response) => {
                      console.log('confirmation send', response)
                  }
              )
                  this.navCtrl.navigateForward('/dashboard/viio');
              })        
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
