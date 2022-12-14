import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuModalPageRoutingModule } from './menu-modal-routing.module';

import { MenuModalPage } from './menu-modal.page';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MenuModalPageRoutingModule
  ],
  declarations: [MenuModalPage]
})
export class MenuModalPageModule {}
