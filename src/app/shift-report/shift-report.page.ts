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

  /** Variable */
  public user:User;

  //shift report data
  public name = "";
  public date = "";
  public shift_title = "";
  public site= "";
  public report:Array<any>;
  time = new Date();

  constructor(
    public shiftService:ShiftService,
    public userService:UserService
  ) { }

  ngOnInit() {
    //抓取使用者

    this.userService.mess.subscribe(response=>{
      this.user = response;
      this.getUserTodayShift(this.user.name);
    })

    //處理報告資料
  }


  getUserTodayShift(_username){
    let userShift = [];
    console.log(_username);
    console.log(this.time);
    this.shiftService.getMonthlyShiftByUser(_username, this.time).subscribe(response=>{
      userShift = response;
      console.log(userShift);
    });
  }

}
