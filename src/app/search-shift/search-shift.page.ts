import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import {UserService} from "../service/user.service";
import {ShiftService} from "../service/shift.service";
import { repeat } from 'rxjs/operators';

@Component({
  selector: 'app-search-shift',
  templateUrl: './search-shift.page.html',
  styleUrls: ['./search-shift.page.scss'],
  providers: [DatePipe]
})
export class SearchShiftPage implements OnInit {
  
  //工具欄，初始顯示"個人班表"
  public ShiftDisplay = "person";
  /** 個人班表 */
  //查詢月份
  public myMonth = new Date("YYYY/MM");
  //查詢月份班表
  public myMonthShift:Array<any>;

  /**週次 */
  //查詢月份
  public seMonth = new Date;
  //查詢週次
  public Day:Array<any> = ['週一','週二','週三','週四','週五','週六','週日',];
  public myDay;
  //星期班表
  public myDayShift;
  //此月星期己的所有地點
  public daySite:Array<any>;

  /** 日期 */
  //查詢日期斑表
  public myDate;
  //查詢日期-星期幾
  public displayDay;
  //日期班表
  public myDateShift:Array<any>;
  //此日期的所有地點
  public Site:Array<any>;

  constructor(
    public shiftService:ShiftService,
    public userService:UserService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(){
    //this.shiftService.resetShift();
  }

  improtshift(){
    this.shiftService.ShiftTextProcess();
  }

/* requests */

  //"個人班表"選擇月份
  onSelectMonth(){
    this.myMonthShift = [];
    console.log(this.userService.user.name);
    //處理日期格式
    let newMonth = new Date(this.myMonth);
    let myMonthString = this.datePipe.transform(newMonth,"yyyyMM");
    console.log(myMonthString);

    /*this.shiftService.getShiftByMonth(this.myMonth.toString().replace('-','')).subscribe(response=>{
      this.myMonthShift = response;
      console.log(this,this.myMonthShift);
    });*/

    this.shiftService.getMonthlyShiftByUser(this.userService.user.name, myMonthString).subscribe(response=>{
      this.myMonthShift = response;
      this.myMonthShift.sort( (a , b) => (a.date > b.date)?1 : (b.date >a.date)?-1 : 0 );
      console.log(this.myMonthShift);
    });
      
  }

  onSelectDay(){
    if(this.seMonth != undefined && this.myDay != undefined){
      this.shiftService.getMonthlyShiftByDay(this.seMonth, this.myDay).subscribe(response=>{
        response.sort( (a , b) => (a.date > b.date)?1 : (b.date >a.date)?-1 : 0 )
        console.log(response);
        //整理資料
        let result = {};
        let curSite = "";
        for(let _shift of response){
          //地點
          if(!result.hasOwnProperty(_shift.site)){
            result[_shift.site] = {};
          }
          //時間
          if(!result[_shift.site].hasOwnProperty(_shift.date)){
            //_shift.date = this.datePipe.transform(_shift.date, "yyyy年MM月dd日");
            result[_shift.site][_shift.date] = {};
          }
          //時段
          if(!result[_shift.site][_shift.date].hasOwnProperty(_shift.shift_title)){
            result[_shift.site][_shift.date][_shift.shift_title]
              = _shift.members;
          }
        }

       /* for(let site in result){
          for(let date in result[site]){
            let temp = {
              "早上":result[site][date]["早上"],
              "中午":result[site][date]["中午"],
              "下午":result[site][date]["下午"],
            };

            result[site][date] = temp;
          }
        }*/

        console.log(result);
        this.myDayShift = result;
        console.log(this.myDayShift);
      })

    }
   
  }


  onSelectDate(){
    //處理星期幾
    this.displayDay = '星期'+'日一二三四五六'.charAt(new Date(this.myDate).getDay());
    console.log(this.displayDay);
    

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
