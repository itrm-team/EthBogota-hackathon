import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VincCuentaPage } from './vinc-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: VincCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VincCuentaPageRoutingModule {}
