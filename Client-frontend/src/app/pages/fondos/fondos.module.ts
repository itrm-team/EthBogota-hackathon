import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FondosPageRoutingModule } from './fondos-routing.module';

import { FondosPage } from './fondos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FondosPageRoutingModule
  ],
  declarations: [FondosPage]
})
export class FondosPageModule {}
