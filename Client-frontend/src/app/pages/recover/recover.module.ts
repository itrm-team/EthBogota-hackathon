import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { IonicModule } from '@ionic/angular';

import { RecoverRoutingModule } from './recover-routing.module';

import { Recover } from './recover.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ComponentsModule,
    IonicModule,
    RecoverRoutingModule
  ],
  declarations: [Recover]
})
export class RecoverPageModule {}
