import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  {
    path: 'activity',
    loadChildren: () => import('./pages/activity/activity.module').then( m => m.ActivityPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'fondos',
    loadChildren: () => import('./pages/fondos/fondos.module').then( m => m.FondosPageModule)
  },
  {
    path: 'vinc-cuenta',
    loadChildren: () => import('./pages/vinc-cuenta/vinc-cuenta.module').then( m => m.VincCuentaPageModule)
  },
  {
    path: 'transacciones',
    loadChildren: () => import('./pages/transacciones/transacciones.module').then( m => m.TransaccionesPageModule)
  },

  {
    path: 'transferencia',
    loadChildren: () => import('./pages/transferencia/transferencia.module').then( m => m.TransferenciaPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./pages/recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'viio',
    loadChildren: () => import('./pages/viio/viio.module').then( m => m.ViioPageModule)
  },
 
  {
    path: 'card',
    loadChildren: () => import('./pages/card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'configuration',
    loadChildren: () => import('./pages/configuration/configuration.module').then( m => m.ConfigurationPageModule)
  },
  {
    path: 'menu-modal',
    loadChildren: () => import('./pages/modals/menu-modal/menu-modal.module').then( m => m.MenuModalPageModule)
  },
  {
    path: 'charge',
    loadChildren: () => import('./pages/charge/charge.module').then( m => m.ChargePageModule)
  },
  {
    path: 'user-data',
    loadChildren: () => import('./pages/user-data/user-data.module').then( m => m.UserDataPageModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./pages/security/security.module').then( m => m.SecurityPageModule)
  },
  {
    path: 'withdraw',
    loadChildren: () => import('./pages/withdraw/withdraw.module').then( m => m.WithdrawPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'info-modal',
    loadChildren: () => import('./pages/modals/info-modal/info-modal.module').then( m => m.InfoModalPageModule)
  },
  {
    path: 'recover',
    loadChildren: () => import('./pages/recover/recover.module').then( m => m.RecoverPageModule)
  },
  {
    path: 'response',
    loadChildren: () => import('./pages/respuesta/respuesta.module').then( m => m.RespuestaPageModule)
  },
  {
    path: 'web3',
    loadChildren: () => import('./pages/web3/web3.module').then( m => m.Web3PageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }