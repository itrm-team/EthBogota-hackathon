import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../storage/storage.service';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router, public toastController: ToastController, private storage: StorageService) {

  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return from(this.storage.get(this.storage.getMemo().TOKEN_KEY)).pipe(
        mergeMap((token)=>{
          if (token) { request = request.clone({ 
              setHeaders: {
                'Authorization': "Bearer "+token
              }
            });
          }
        
          if (!request.headers.has('Content-Type')) {
            request = request.clone({
              setHeaders: {
                'content-type': 'application/json'
              }
            });
          }
        
          request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
          });
          
          return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
              }
              return event;
            }),
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                if (error.error.success === false) {
                  this.presentToast('Login failed');
                } else {
                  this.router.navigate(['login']);
                  
                }
              }
              return throwError(error);
            }));
        })
      );
    }

    async presentToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
}