import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'

import { IonInfiniteScroll } from '@ionic/angular';

import { StatisticsService } from "../service/statistics.service";
import { database } from 'firebase';

@Component({
  selector: 'app-shift-report-list',
  templateUrl: './shift-report-list.page.html',
  styleUrls: ['./shift-report-list.page.scss'],
})
export class ShiftReportListPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  //報告資料
  public reportData = [];

  //報告資料中最晚的日期
  latestDate:Date;

  constructor(
    public statisticsService:StatisticsService,
  ) { }

  ngOnInit() {
    //取得現在時間
    const curDate = new Date(Date.now());
    curDate.setDate(curDate.getDate() + 1);
    this.latestDate = curDate;

    //console.log(this.latestDate);

    //取得前七天的資料
    for(var i=0; i<7; i++){
      this.latestDate.setDate(this.latestDate.getDate() - 1);
      //console.log(this.latestDate);

      this.statisticsService.getReportByDate(this.latestDate).subscribe(response=>{
        this.reportData[ this.reportData.length ] = response;
      });
    }

    console.log(this.reportData);
  }


  loadData(event) {
    //取得前七天的資料
    for(var i=0; i<7; i++){
      this.latestDate.setDate(this.latestDate.getDate() - 1);
      console.log(this.latestDate);
      this.statisticsService.getReportByDate(this.latestDate).subscribe(response=>{
        this.reportData[ this.reportData.length ] = response;
      })
    }

    setTimeout(() => {
      event.target.complete();
      event.target.disabled = true;
    }, 1000);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
