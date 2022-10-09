import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseEthPage } from './purchase-eth.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseEthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseEthPageRoutingModule {}
