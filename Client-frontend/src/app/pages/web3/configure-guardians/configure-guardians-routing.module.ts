import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigureGuardiansPage } from './configure-guardians.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigureGuardiansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigureGuardiansPageRoutingModule {}
