import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { TerminosCondicionesComponent } from 'src/app/components/terminos-condiciones/terminos-condiciones.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  account: { username: string, email: string, idaccount: string, password: string } = {
    email: '',
    username:'',
    idaccount: '',
    password: ''
  };

  public errorMessages = {
		email: { type: 'required', message: 'email is required.' },
		password: { type: 'required', message: 'password is required.' },
	};
  

  public registerForm: FormGroup;
	submitted = false;
	loading = false;
	returnUrl: string;
	error = '';
	githubURL: string;
	terms = false;

	viewState = 'login';

  changeViewState(state: string){
    if(state == 'login') this.terms = false;
    this.viewState = state;
  }
  
	private passwordReg = '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';
	private emailReg = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

  private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: UserService,
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) { 
  }

  ngOnInit() {
    this.loadBackground();
  }

  loadBackground() {
    const bgContainer = document.querySelector('.login__bg') as HTMLElement;
		bgContainer.style.backgroundImage =
			'url("../../../pokkash/assets/img/login/backgrounds/bg_0' +
			Math.floor(Math.random() * 5) +
			'.png")';
  }


  doLogin() {
    let self = this;
    this.user.login(this.account).subscribe((resp) => {
      self.getUserPromise(resp);
      
    }, (err) => {
      this.presentErrorToast();
    });
  }

  async getUserPromise(resp){
    let user: any = await this.user.getUserPromise(resp);
    this.navCtrl.navigateForward('dashboard');
    /*if(user.first_login) 
    else {
      this.presentAlertWithString("For security reasons you must update your password");
      this.navCtrl.navigateForward('settings');  
    }  */
  }

  async presentErrorToastWithString(str: string){
    let toast = await this.toastCtrl.create({
      message: str,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  async presentErrorToast(){
    let toast = await this.toastCtrl.create({
      message: this.loginErrorString,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  presentAlertWithString(title:string, msg: string){
    let alert = this.alertController.create({
      message: msg,
      header: title,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  signup() {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfCQWdermVyGPB4vxT5OZg52Vc0KLWlqz7h-kpjllEYGY3B6g/viewform', 'blank')
    //this.navCtrl.navigateForward('registro');
  }

  async showTerms(){
    const modal = await this.modalCtrl.create({
      component: TerminosCondicionesComponent,
      cssClass: "terms-conditions",
      componentProps: {}
    });
    await modal.present();
  }

}
