import { Component, ElementRef, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { StorageService } from 'src/app/services/storage/storage.service';
import { BalanceService } from 'src/app/services/user/balance.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, AfterViewInit {
  @Input() data = 0;
  @ViewChild('el') container: ElementRef;
  private dom: HTMLElement;
  dataInt = 0;
  dataDec = '00';
  constructor(private balanceServ: BalanceService, private storage: StorageService) { 
  }

  async ngOnInit() {
    const b = await this.getPromisedBalance();
    this.data = (b.length> 0)? b[0].balance: 0;
    if (this.data) {
      this.dataInt = Math.floor(this.data);
      this.dataDec = (this.data % 1).toString().substring(2, 4) == '' ? '00': (this.data % 1).toString().substring(2, 4);
    }
  }


  async getPromisedBalance(){
    return new Promise<any>(async (resolve, reject)=>{
      const user = await this.storage.get(this.storage.getMemo().CURRENT_USER)
      this.balanceServ.getBalance(user, (balance)=>{
        if(balance) resolve(balance)
        else resolve([]);
      })
    })
    
  }

  ngAfterViewInit(): void {
    this.dom = this.container.nativeElement;
    gsap.fromTo(this.dom, {
      opacity: 0,
      y: '-5%'
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5
    });

  }
}
