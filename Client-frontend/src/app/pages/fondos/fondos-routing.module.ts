import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FondosPage } from './fondos.page';

const routes: Routes = [
  {
    path: '',
    component: FondosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FondosPageRoutingModule {}
