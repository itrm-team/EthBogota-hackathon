import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { IonicModule } from '@ionic/angular';

import { ChargePageRoutingModule } from './charge-routing.module';

import { ChargePage } from './charge.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    IonicModule,
    ComponentsModule,
    ChargePageRoutingModule
  ],
  declarations: [ChargePage]
})
export class ChargePageModule {}
