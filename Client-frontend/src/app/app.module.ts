import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS,  HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './components/login/login.component';

export const jwtOptionsFactory = (storage) => {
  const dirs = window.location.toString().split(':');
  return {
    tokenGetter: () =>storage.get('access_token'),
    whitelistedDomains: [dirs[0] + ':' + dirs[1] + ':4040']
  };
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider:{
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
