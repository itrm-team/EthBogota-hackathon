import { Injectable } from '@angular/core'
import { Platform, AlertController } from '@ionic/angular'
import { HttpClient } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt'
import { StorageService } from '../storage/storage.service'
import { environment } from 'src/environments/environment'
import { tap, catchError } from 'rxjs/operators'
import { BehaviorSubject, throwError } from 'rxjs'

const TOKEN_KEY = 'access_token'
const USER = 'current_user'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    url: any
    user = null
    authenticationState = new BehaviorSubject(false)

    constructor(
        private http: HttpClient,
        private helper: JwtHelperService,
        private storage: StorageService,
        private plt: Platform,
        private alertController: AlertController
    ) {
        this.url = environment.externalUrl
        this.plt.ready().then(() => {
            this.checkToken()
        })
    }

    checkToken() {
        return new Promise<boolean>((resolve) => {
            this.storage.get(TOKEN_KEY).then((token) => {
                if (token) {
                    if (this.hasExpired(token)) {
                        this.logout()
                        resolve(false)
                    } else {
                        this.authenticationState.next(true)
                        resolve(true)
                    }
                } else {
                    this.authenticationState.next(false)
                    resolve(false)
                }
            })
        })
    }

    hasExpired(token) {
        if (token) return this.helper.isTokenExpired(token)
        else return true
    }

    changeMetadata(credentials, callback) {
        return this.http.post(`${this.url}/api/updateUser`, credentials).pipe(
            tap((res) => {
            }),
            catchError((e) => {
                this.showAlert('ERROR', e.error.msg)
                throw new Error(e)
            })
        )
    }

    register(credentials, callback) {
        return this.http.post(`${this.url}/api/register`, credentials).pipe(
            tap((res) => {
            }),
            catchError((e) => {
                throw new Error(e)
            })
        )
    }

    validatePassword() {
        tap((res) => {
        }),
        catchError((e) => {
            throw new Error(e)
        })
    }

    generateObjectMessage(obj) {
        let m = ''
        for (var key in obj)
            if (obj.hasOwnProperty(key) && this.isKeyAllowed(key))
                m += '<b>' + key + '</b> : ' + obj[key] + '<br />'

        return m
    }

    isKeyAllowed(key) {
        return key != 'password' && key != 'id_rol' && key != 'key'
    }

    validationPasswordWithdraw(credentials, callback) {
        return this.http.post(`${this.url}/api/validationPasswordWithdraw`, credentials).pipe(
            tap((res) => {
                this.storage.set(TOKEN_KEY, res['token'])
                this.storage.set(USER, this.helper.decodeToken(res['token']))
                this.authenticationState.next(true)
                callback(null, {
                    status: 'success',
                    user: this.helper.decodeToken(res['token']),
                })
            }),
            catchError((e) => {
                console.log('error found in auth service', e)
                this.showAlert('ERROR', e.error.msg)
                callback(e, { status: false, user: null })
                return throwError({ status: false, user: null})
            })
        )
    }
    
    login(credentials, callback) {
        return this.http.post(`${this.url}/api/login`, credentials).pipe(
            tap((res) => {
                this.storage.set(TOKEN_KEY, res['token'])
                this.storage.set(USER, this.helper.decodeToken(res['token']))
                this.authenticationState.next(true)
                callback(null, {
                    status: 'success',
                    user: this.helper.decodeToken(res['token']),
                })
            }),
            catchError((e) => {
                console.log('error found in auth service', e)
                callback(e, { status: false, user: null, icon:e.error.icon, title:e.error.title, msg: e.error.msg})
                //throw new Error(e)
                return throwError({ status: false, user: null, icon:e.error.icon, title: e.error.title ,msg: e.error.msg})
            })
        )
    }
    updateCont(userInfo,callback){
        return this.http.post(`${this.url}/api/update`,userInfo).subscribe(
          (response) => {
            callback(response);
          },
          (error) => {
            return throwError({ status: false, user: null, title: error.error.title ,msg: error.error.msg})
          }
        );
    }

    recover(data, callback){
        return this.http.post(`${this.url}/api/recover`, data).pipe(
            tap((res) => {
                this.storage.set(TOKEN_KEY, res['token'])
                this.storage.set(USER, this.helper.decodeToken(res['token']))
                this.authenticationState.next(true)
                callback(null, {
                    status: 'success',
                    user: this.helper.decodeToken(res['token']),
                })
            }),
            catchError((e) => {
                console.log('error found in auth service', e)
                this.showAlert('ERROR', e.error.msg)
                callback(e, { status: false, user: null })
                throw new Error(e)
            })
        )
    }
    logout() {
        this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false)
        })
        this.storage.remove(USER)
        this.storage.remove('_settings')
    }

    logoutpromise() {
        this.storage.remove(USER)
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false)
        })
    }

    isAuthenticated() {
        return this.authenticationState.value
    }

    showAlert(head, msg) {
        let alert = this.alertController.create({
            message: msg,
            header: head,
            buttons: ['OK'],
        })
        alert.then((alert) => alert.present())
    }

    resolveToken(token) {
        return this.helper.decodeToken(token.token)
    }

    requestGet(request, data, callback) {
        return this.http.get(`${this.url}${request}`, data).pipe(
            tap((res) => {
                callback(null, res)
            }),
            catchError((e) => {
                console.log(e)
                this.showAlert('ERROR', JSON.stringify(e))
                callback(e, { result: e })
                throw new Error(e)
            })
        )
    }

    requestPost(request, data, callback) {
        return this.http.post(`${this.url}${request}`, data)
    }

    requestPut(request, data, callback) {
        return this.http.put(`${this.url}${request}`, data)
    }

    requestFilePost(request, data, callback) {
        return this.http
            .post(`${this.url}${request}`, data, { responseType: 'blob' })
            .pipe(
                tap((res) => {
                    callback(null, res)
                }),
                catchError((e) => {
                    console.log(e)
                    this.showAlert('ERROR', JSON.stringify(e))
                    callback(e, { result: e })
                    throw new Error(e)
                })
            )
    }

    validateExternalToken(token: any) {
        let expired = this.hasExpired(token)
        let valid = this.helper.getTokenExpirationDate(token)
        console.log(expired, valid)
    }


    validationPassword(userData, callback) {
        console.log('calling', `${this.url}/api/updateUserPassword`)
        return this.http
            .post(`${this.url}/api/updateUserPassword`, userData)
            .pipe(
                tap((res) => {
                    console.log('went trough')
                    this.showAlert('SUCCESS', 'Your password was updated')
                    //callback(true);
                }),
                catchError((e) => {
                    this.showAlert('ERROR', e.error.msg)
                    //callback(false);
                    throw new Error(e)
                })
            )
    }

    updatePassword(userData, callback) {
        console.log('calling', `${this.url}/api/updateUserPassword`)
        return this.http
            .post(`${this.url}/api/updateUserPassword`, userData)
            .pipe(
                tap((res) => {
                    console.log('went trough')
                    this.showAlert('SUCCESS', 'Your password was updated')
                    //callback(true);
                }),
                catchError((e) => {
                    this.showAlert('ERROR', e.error.msg)
                    //callback(false);
                    throw new Error(e)
                })
            )
    }

    checkEmail(email: any) {
        console.log("Checking email")
        return this.http.post(`${this.url}/api/checkEmail`, email,{responseType: 'text'}).pipe(
            catchError((e) => {
                return throwError({ status: false, user: null, icon:e.error.icon, title: e.error.title ,msg: e.error.msg})
            })
        )

    }
    loginn(credentials, callback) {
        return this.http.post(`${this.url}/api/login`, credentials).pipe(
            tap((res) => {
                this.storage.set(TOKEN_KEY, res['token'])
                this.storage.set(USER, this.helper.decodeToken(res['token']))
                this.authenticationState.next(true)
                callback(null, {
                    status: 'success',
                    user: this.helper.decodeToken(res['token']),
                })
            }),
            catchError((e) => {
                callback(e, { status: false, user: null, icon:e.error.icon, title:e.error.title, msg: e.error.msg})
                //throw new Error(e)
                return throwError({ status: false, user: null, icon:e.error.icon, title: e.error.title ,msg: e.error.msg})
            })
        )
    }
}
