import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoModalPageRoutingModule } from './info-modal-routing.module';

import { InfoModalPage } from './info-modal.page';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    InfoModalPageRoutingModule
  ],
  declarations: [InfoModalPage]
})
export class InfoModalPageModule {}
