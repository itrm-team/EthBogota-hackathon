import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';

import { PurchaseEthPageRoutingModule } from './purchase-eth-routing.module';

import { PurchaseEthPage } from './purchase-eth.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    IonicModule,
    ComponentsModule,
    PurchaseEthPageRoutingModule
  ],
  declarations: [PurchaseEthPage]
})
export class PurchaseEthPageModule {}
