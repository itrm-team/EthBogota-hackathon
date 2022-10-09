import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarContrasenaPageRoutingModule } from './recuperar-contrasena-routing.module';

import { RecuperarContrasenaPage } from './recuperar-contrasena.page';
import { TitleComponent } from 'src/app/components/title/title.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarContrasenaPageRoutingModule,
    ComponentsModule,
    SwiperModule,
  ],
  declarations: [RecuperarContrasenaPage]
})
export class RecuperarContrasenaPageModule {}
