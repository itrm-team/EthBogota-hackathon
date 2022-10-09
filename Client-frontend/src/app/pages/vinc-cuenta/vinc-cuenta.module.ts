import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VincCuentaPageRoutingModule } from './vinc-cuenta-routing.module';

import { VincCuentaPage } from './vinc-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VincCuentaPageRoutingModule
  ],
  declarations: [VincCuentaPage]
})
export class VincCuentaPageModule {}
