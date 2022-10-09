import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { IonicModule } from '@ionic/angular';

import { RespuestaPageRoutingModule } from './respuesta-routing.module';

import { RespuestaPage } from './respuesta.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    IonicModule,
    ComponentsModule,
    RespuestaPageRoutingModule,
  ],
  declarations: [RespuestaPage],
})
export class RespuestaPageModule {}
