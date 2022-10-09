import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  @Input() title = 'Titulo';
  @Input() arrows = [true, true];
  @Input() style = '';
  @Output() backEvent = new EventEmitter();
  @Output() nextEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  backClicked() {
    this.backEvent.emit();
  }

  nextClicked() {
    this.nextEvent.emit();
  }

}
