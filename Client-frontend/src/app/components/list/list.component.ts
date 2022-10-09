import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivityPage } from 'src/app/pages/activity/activity.page';
import { InfoModalPage } from 'src/app/pages/modals/info-modal/info-modal.page';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  
  @Input() list: any[];
  @Input() date: string;
 
  active:boolean;
  constructor(
    public modalCtrl: ModalController,
  ) { 
    
  }

  ngOnInit() { }

  getIcon(type){
    this.active = true;
    const dict = {
      'Transferencia': 'B',
      'Retiro':'D',
      'Recompensa': 'A',
      'Deposito': 'E',
      'Compra':'C',
      'Venta':'L'
    }
    return dict[type];
  }

async presentModal(date:any,type:any, info:any, status:any) {
  const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
          icon: 'assets/images/pup_land/Frame.svg',
          title: 'Detalle de transacción',
          content: `<p>Tipo de transacción: ${type}</p>
                    <p>Fecha de la transacción: ${date}</p>
                    <p>Estado de la transacción: ${status}</p>
                    <p>Cantidad de la transacción: ${info}</p>`,
                    
          btnLabel: 'Entendido'
      }
  });
  return await modal.present();
}
}

