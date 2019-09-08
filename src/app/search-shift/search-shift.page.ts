import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import {UserService} from "../service/user.service";
import {ShiftService} from "../service/shift.service";

@Component({
  selector: 'app-search-shift',
  templateUrl: './search-shift.page.html',
  styleUrls: ['./search-shift.page.scss'],
  providers: [DatePipe]
})
export class SearchShiftPage implements OnInit {
  
  //工具欄，初始顯示"個人班表"
  public ShiftDisplay = "person";
  //"個人班表查詢日期"
  public myMonth = new Date("YYYY/MM");
  //查詢月份班表
  public myMonthShift:Array<any>;
  //查詢日期斑表
  public myDate;
  //日期班表
  public myDateShift:Array<any>;

  constructor(
    public shiftService:ShiftService,
    public userService:UserService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    //this.shiftService.getShiftByMonth("201909");

    
  }

/* requests */

  //"個人班表"選擇月份
  onSelectMonth(){
    console.log(this.userService.user.name);
    console.log(this.myMonth.toString().replace('-',''));
    /*this.shiftService.getShiftByMonth(this.myMonth.toString().replace('-','')).subscribe(response=>{
      this.myMonthShift = response;
      console.log(this,this.myMonthShift);
    });*/

    this.shiftService.getMonthlyShiftByUser(this.userService.user.name, this.myMonth.toString().replace('-','')).subscribe(response=>{
      this.myMonthShift = response;
      console.log(this.myMonthShift);
    });
      
  }

  onSelectDate(){    
    this.shiftService.getShiftByDate(this.myDate).subscribe(response=>{
      this.myDateShift = response;
      console.log(this.myDateShift);
    })
  }

}
