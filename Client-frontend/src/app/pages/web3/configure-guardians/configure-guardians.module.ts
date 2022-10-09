import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { IonicModule } from '@ionic/angular';

import { ConfigureGuardiansPageRoutingModule } from './configure-guardians-routing.module';

import { ConfigureGuardiansPage } from './configure-guardians.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    ComponentsModule,
    ConfigureGuardiansPageRoutingModule
  ],
  declarations: [ConfigureGuardiansPage]
})
export class ConfigureGuardiansPageModule {}
