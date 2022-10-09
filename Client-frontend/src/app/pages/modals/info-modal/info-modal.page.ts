import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.page.html',
  styleUrls: ['./info-modal.page.scss'],
})
export class InfoModalPage implements OnInit {
  @Input() icon: string;
  @Input() title = 'titulo';
  @Input() content = 'content';
  @Input() btnLabel = null;
  @Input() btnCallback: any = null;
  @Input() btnLabelA = null;
  
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  callbtnCallback(){
    this.btnCallback();
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
