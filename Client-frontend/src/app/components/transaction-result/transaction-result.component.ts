import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-result',
  templateUrl: './transaction-result.component.html',
  styleUrls: ['./transaction-result.component.scss'],
})
export class TransactionResultComponent implements OnInit {
  @Input() src: string;
  @Input() icon: string;
  @Input() title:string;
  @Input() subtitle:string;
  @Input() type:string;

  constructor() { }

  ngOnInit() {}

}
