import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { element } from 'protractor';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TransactionService } from 'src/app/services/user/transaction-service.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  @ViewChild('search') searchContainer: ElementRef;

  maximumDate = this.formatISODateToViewDate(new Date().toISOString());
  startingFilterDate: any = '2018-01-01';
  endingFilterDate: any = this.maximumDate.year +'-'+this.maximumDate.month+'-'+this.maximumDate.day;
  activityList: any[] = [];
  usernameFilter: any = '';
  typeFilter: any = '';
  transactionTypes: any = [];
  activityListView: any = [];
  transactionStatus: any= [];

  constructor(private transactionServ: TransactionService, private storage: StorageService) { 
    //this.ngOnInit();
  }


  async ionViewWillEnter(){
    this.transactionTypes = await this.transactionServ.getTransactionTypes();
    const user = await this.storage.get(this.storage.getMemo().CURRENT_USER);
    this.transactionServ.getUserTransactions(user, (transactions)=>{
      this.activityList = this.formatTransactionsForListing(transactions);
      this.activityListView = JSON.parse(JSON.stringify(this.activityList));
    })
  }

  ngOnInit(){
      
  }

  areDatesEqual(d1, d2){
    return d1.day == d2.day && d1.month == d2.month && d1.year == d2.year;
  }

  isDateBetweenDates(d: Date, start: Date, end:Date){
    return d >= start && d <= end;
  }

  formatTransactionsForListing(transactions){
    let listT = [];
    let currentDate = '';
    for (let i = 0; i < transactions.length; i++) {
      const element = transactions[i];
      element.date = this.formatISODateToViewDate(element.transaction_time);
      if(!this.areDatesEqual(element.date,currentDate) || currentDate == ''){
        listT.push({
          date: element.date.day +'.' + element.date.month + '.' + element.date.year,
          list:[
            {
              type: element.TransactionType.type,
              status: element.TransactionStatus.status,
              user: element.User.email,
              info: element.total.toFixed(2),
            }
          ]
        })
        currentDate = element.date;
      } else {
        listT[listT.length - 1].list.push({
          type: element.TransactionType.type,
          status: element.TransactionStatus.status,
          user: element.User.email,
          info: element.total.toFixed(2),
        });
      }      
    }
    return listT
  }

  getFormattedDay(day){
    return (day> 9)? day : '0' + day;
  }

  getFormattedMonth(month){
    return (month> 9)? month : '0'+month;
  }

  formatISODateToViewDate(date: string){
    let y = date.substring(0,4);
    let m = date.substring(5,7);
    let day = date.substring(8,10);
    return {day: this.getFormattedDay(parseInt(day)), month: this.getFormattedMonth(parseInt(m)), year: y}; 
  }

  toggleSearch() {
    this.searchContainer.nativeElement.classList.toggle('close');
  }

  revertFormatOfDateString(date: string){
    let d = parseInt(date.substring(0,2));
    let m = parseInt(date.substring(3,5));
    let y = date.substring(6,10);
    return new Date(m+'-'+d+'-'+y);
  }

  checkIfDateIsInRange(element){
    const start = this.startingFilterDate.split('-');
    const end = this.endingFilterDate.split('-')
    const startD =start[1]+'-'+start[2]+'-'+start[0];
    const endD = end[1]+'-'+end[2]+'-'+end[0]; 
    return this.isDateBetweenDates(this.revertFormatOfDateString(element.date), new Date(startD), new Date(endD))
  }

  getUsernameAndTypeFilteredList(elementList){
    let pList = []
    for (let i = 0; i < elementList.length; i++) {
      if(elementList[i].user.includes(this.usernameFilter) && elementList[i].type.includes(this.typeFilter)){
        pList.push(elementList[i])
      }
    }
    return pList;
  }

  filterTransactions(){
    this.activityListView = this.getActivityListView();
  }

  getActivityListView(){
    let actList = JSON.parse(JSON.stringify(this.activityList)).filter((element)=>{
      let dateRange = this.checkIfDateIsInRange(element);
      return dateRange;
    })

    for (let i = 0; i < actList.length; i++) {
      actList[i].list = this.getUsernameAndTypeFilteredList(actList[i].list);
    }
    return actList;
  }

}
