import { Component, ContentChild, Input } from '@angular/core';
import { IonInput } from '@ionic/angular';
@Component({
  selector: 'app-show-hide-password',
  templateUrl: './show-hide-password.component.html',
  styleUrls: ['./show-hide-password.component.scss']
})

export class ShowHidePasswordComponent {

  @ContentChild(IonInput) input: IonInput;
  
  showPassword: boolean = false;
  
  constructor() {}

  ngOnInit() { }
  
  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }
}