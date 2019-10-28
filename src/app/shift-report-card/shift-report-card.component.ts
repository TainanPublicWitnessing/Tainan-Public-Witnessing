import { Component, OnInit } from '@angular/core';

import { ShiftService } from "../service/shift.service";
import { StatisticsService } from "../service/statistics.service";

import {sha256} from "js-sha256/src/sha256.js";

@Component({
  selector: 'app-shift-report-card',
  templateUrl: './shift-report-card.component.html',
  styleUrls: ['./shift-report-card.component.scss'],
})
export class ShiftReportCardComponent implements OnInit {

  today = new Date();
  todayShift = {};

  constructor(
    public shiftService:ShiftService,
    public statisticsService:StatisticsService,
  ) { }

  ngOnInit() {
    //取得今日班表
    this.shiftService.getShiftByDate(this.today).subscribe(response=>{
      //this.todayShift = response;

      for(let shift of response){
        const id = sha256(shift.date + shift.shift_title + shift.site);
        this.statisticsService.getReportById(shift.date, id).subscribe(response=>{
          if(response == undefined){
            shift.is_report_exist = false;
            shift.report = response;
          }else{
            shift.is_report_exist = true;
            shift.report = response;
          }

          if(!this.todayShift.hasOwnProperty(shift.site)){
            this.todayShift[shift.site] = {};
          }

          //時間
          if(!this.todayShift[shift.site].hasOwnProperty(shift.date)){
            this.todayShift[shift.site][shift.date] = shift;
          }
           
        });
      }

      console.log(this.todayShift);
    });
  }

}
