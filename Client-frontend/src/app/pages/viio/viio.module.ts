import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViioPageRoutingModule } from './viio-routing.module';

import { ViioPage } from './viio.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViioPageRoutingModule
  ],
  declarations: [ViioPage]
})
export class ViioPageModule {}
