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
  //此日期的所有地點
  public Site:Array<any>;

  constructor(
    public shiftService:ShiftService,
    public userService:UserService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    //this.shiftService.getShiftByMonth("201909");
    this.shiftService.changeShiftDate();
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
      this.sortDateShift(this.myDateShift);
    })
  }

  
  sortDateShift(_shifts){
    let result = [];

    this.Site = [];
    //抓取不同地點
    for(let data of _shifts){
      if(!this.Site.includes(data.site)){     
        this.Site.push(data.site);
      }
    }

    let dataArray = [];
    dataArray = Object.values(_shifts);

    //抓取不同地點班表
    for(let _site of this.Site){
      let thisSite = {
        "早上" : dataArray.find(x => x.shift_title == "早上" && x.site == _site),
        "中午" : dataArray.find(x => x.shift_title == "中午" && x.site == _site),
        "下午" : dataArray.find(x => x.shift_title == "下午" && x.site == _site)
      }
      result.push(Object.values(thisSite));
    }
    this.myDateShift = result;
    console.log(this.myDateShift);

  }

}
