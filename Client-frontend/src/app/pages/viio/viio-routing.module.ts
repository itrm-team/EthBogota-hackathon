import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViioPage } from './viio.page';

const routes: Routes = [
  {
    path: '',
    component: ViioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViioPageRoutingModule {}
