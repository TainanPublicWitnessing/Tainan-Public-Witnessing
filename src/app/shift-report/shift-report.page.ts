import { Component, OnInit } from '@angular/core';
import {ShiftService} from "../service/shift.service";
import {UserService} from "../service/user.service";
import { User } from '../structures/User';

@Component({
  selector: 'app-shift-report',
  templateUrl: './shift-report.page.html',
  styleUrls: ['./shift-report.page.scss'],
})
export class ShiftReportPage implements OnInit {

  /** 
   * Variable 
   * */
  public user:User;

  //shift report data
  public name:string; //登入時設定
    //搜尋此使用者的今天的班次
  public date:Date;
  public shift_title:string;
  public site:string;
    //使用者報告
  public report:Array<any>;
    //登記時間
  time = new Date();

  //interface
  public displayDay:string;
  public shift_titleData = ['早上','中午','下午'];

  constructor(
    public shiftService:ShiftService,
    public userService:UserService
  ) { }

  ngOnInit() {
    //測試
    this.time = new Date("2019-10-07");
    this.time.setHours(12,3,5);
    //抓取使用者
    this.userService.mess.subscribe(response=>{
      this.user = response;
      this.name = response.name.toString();
      this.getUserTodayShift(this.user.name);
    })

    //處理報告資料
  }

  /**
   *  functions
   */

  //獲取使用者當月班表
  getUserTodayShift(_username){
    let userShift = [];
    this.shiftService.getMonthlyShiftByUser(_username, this.time).subscribe(response=>{
      userShift = response;
      console.log(userShift);

      //尋找當天班次
      for(const _shift of userShift){
        const shiftDate = new Date(_shift.date);//format"2019-10-12" =>type Date 
        if(shiftDate.getDate() == this.time.getDate()){
          //設定defualt選項
          this.date = shiftDate;
          this.shift_title = _shift.shift_title;
          this.site = _shift.site;
          console.log(this.date +","+ this.shift_title +","+ this.site);

          //處理格式
          this.onSelectDate();
        }
      }
    });
  }

  //當選擇日期，顯示此日期的星期
  onSelectDate(){
    //處理星期幾
    this.displayDay = '星期'+'日一二三四五六'.charAt(new Date(this.date).getDay());

  }
}
