import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'viio',
        children: [
          {
            path: '',
            loadChildren: () => import('../viio/viio.module').then(m => m.ViioPageModule)
          }
        ]
      },
      {
        path: 'activity',
        children: [
          {
            path: '',
            loadChildren: () => import('../activity/activity.module').then(m => m.ActivityPageModule)
          }
        ]
      },
      {
        path: 'card',
        children: [
          {
            path: '',
            loadChildren: () => import('../card/card.module').then(m => m.CardPageModule)
          }
        ]
      },
      {
        path: 'configuration',
        children: [
          {
            path: '',
            loadChildren: () => import('../configuration/configuration.module').then(m => m.ConfigurationPageModule)
          }
        ]
      },
      {
        path: 'web3',
        children: [
          {
            path: '',
            loadChildren: () => import('../web3/web3.module').then(m => m.Web3PageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
