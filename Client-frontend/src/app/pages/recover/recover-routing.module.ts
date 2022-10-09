import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Recover } from './recover.page';

const routes: Routes = [
  {
    path: '',
    component: Recover
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverRoutingModule {}
