import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() isIcon = false;
  @Input() icon = 'ellipse-outline';
  @Input() label = '¡soy un boton!';
  @Input() disable = false;
  @Input() light = false;

  
  constructor() { }

  ngOnInit() { }

}
