import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit {
  @Input() title = 'TITULO:';
  @Input() text:any;
  @Input() subText: string;
  @Input() little = false;
  @Input() style = '';


  constructor() { }

  ngOnInit() { }

}
