import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Web3Page } from './web3.page';

const routes: Routes = [
  {
    path: '',
    component: Web3Page
  },
  {
    path: 'purchase-eth',
    loadChildren: () => import('./purchase-eth/purchase-eth.module').then( m => m.PurchaseEthPageModule)
  },
  {
    path: 'configure-guardians',
    loadChildren: () => import('./configure-guardians/configure-guardians.module').then( m => m.ConfigureGuardiansPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Web3PageRoutingModule {}
