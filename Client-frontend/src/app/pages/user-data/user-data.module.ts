import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { IonicModule } from '@ionic/angular';

import { UserDataPageRoutingModule } from './user-data-routing.module';

import { UserDataPage } from './user-data.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    ComponentsModule,
    UserDataPageRoutingModule
  ],
  declarations: [UserDataPage]
})
export class UserDataPageModule {}
