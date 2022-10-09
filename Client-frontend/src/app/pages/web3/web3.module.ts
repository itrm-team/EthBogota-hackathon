import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Web3PageRoutingModule } from './web3-routing.module';
import { Web3Page } from './web3.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Web3PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Web3Page]
})
export class Web3PageModule {}
