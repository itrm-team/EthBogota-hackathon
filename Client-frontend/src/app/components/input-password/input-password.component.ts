import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent implements OnInit {

  @Input() mode = 'link';
  @Input() placeholder = 'Digite su contraseña';
  @Output() password = new EventEmitter<any>();


  passwordText;
  public showPassword: boolean;
  constructor() { }

  ngOnInit() {}

}
