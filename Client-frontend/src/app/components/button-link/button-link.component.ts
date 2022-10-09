import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss'],
})
export class ButtonLinkComponent implements OnInit {
  @Input() mode = 'link';
  @Input() link: string;
  @Input() label = 'Soy un label';
  @Input() subLabel = 'Soy un subLabel';
  @Input() status: string = 'estado';
  @Input() info: number;
  @Input() src: string;
  @Input() icon = 'J';
  @Input() outline = 'none';
  abs = window.Math.abs;
  formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    // currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  constructor() { }

  ngOnInit() {}

}
