import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Scripts {
  name: string;
  src: string;
}


export const ScriptStore: Scripts[] = [
  { name: 'register', src: 'https://formfacade.com/include/103473011035661233284/form/1FAIpQLSfCQWdermVyGPB4vxT5OZg52Vc0KLWlqz7h-kpjllEYGY3B6g/classic.js?div=ff-compose' }
];

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  private scripts: any = {};

  constructor(
    public navCtrl: NavController
  ) { 
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  ngOnInit() {
    if (!this.scripts['register'].loaded) {
      //load script
      let script: any = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.scripts['register'].src;
      if (script.readyState) {  //IE
          script.onreadystatechange = () => {
              if (script.readyState === "loaded" || script.readyState === "complete") {
                  script.onreadystatechange = null;
                  this.scripts['register'].loaded = true;
              }
          };
      } else {  //Others
          script.onload = () => {
              this.scripts['register'].loaded = true;
          };
      }
      script.onerror = (error: any) => {
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    } else {
    }
  }



  login() {
    this.navCtrl.navigateForward('login');
  }

}
