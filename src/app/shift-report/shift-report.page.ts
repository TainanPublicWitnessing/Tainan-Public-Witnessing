import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ShiftService } from "../service/shift.service";
import { UserService } from "../service/user.service";
import { SettingsService } from "../service/settings.service";
import { StatisticsService } from "../service/statistics.service";

import { AlertController } from '@ionic/angular';

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
  //修改或是新的提交
  public pageMode = "";
  //display mode
  shiftId = "";

  //edit mdoe
  public user:User;

    //shift report data
  public name:string; //登入時設定
      //搜尋此使用者的今天的班次
  public date:Date;
  public shift_title:string;
  public site:string;
      //使用者報告
  public report = {
    "tracts":0,
    "videos":0,
    "scriptures":0,
    "return_visits":0,
    "agree_visit":0,
    "attendance":0,
    "experience":""
  };
      //登記時間
  time = new Date();

  //interface
  public displayDay:string;
  public shift_titleData = ['早上','中午','下午'];
  public siteData = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public shiftService:ShiftService,
    public userService:UserService,
    public settingsService:SettingsService,
    public statisticsService:StatisticsService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    //設定頁面state{displey, edit}
    this.shiftId = this.activatedRoute.snapshot.paramMap.get('shiftId');
    
    //抓取擺攤地點
    this.settingsService.getSites().subscribe(response=>{
      this.siteData = response;
      console.log(this.siteData);
    })
    //抓取使用者
    this.userService.mess.subscribe(response=>{
      this.user = response;
      this.name = response.name.toString();
      this.getUserTodayShift(this.user.name);
    })

    if(this.shiftId == null){
      this.pageMode = "edit";

      //測試
      //this.time = new Date("2019-10-07");
      //this.time.setHours(12,3,5);
      
      
    }else{
      this.pageMode = "display";
      //取得日期和id
      const data = this.shiftId.split('&');
      const _date = data[0];
      const _id = data[1]; 

      this.statisticsService.getReportById(_date, _id).subscribe(response=>{
        this.name = response.name;
        this.date = response.date;
        this.shift_title = response.shift_title;
        this.site = response.site;
        this.report = response.report;
        console.log(response);
      });
    }
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

  getShiftReport(){
    
  }

  //當選擇日期，顯示此日期的星期
  onSelectDate(){
    //處理星期幾
    this.displayDay = '星期'+'日一二三四五六'.charAt(new Date(this.date).getDay());

  }

  //提交表單
  onSubmit(){
    //檢查提交資料
    const result = {
      "name":           this.name,
      "date":           this.date,
      "shift_title":    this.shift_title,
      "site":           this.site,
      "create_on":      "",
      "report":{
        "tracts":       this.report.tracts,
        "videos":       this.report.videos,
        "scriptures":   this.report.scriptures,
        "return_visits":this.report.return_visits,
        "agree_visit":  this.report.agree_visit,
        "attendance":   this.report.attendance,
        "experience":   this.report.experience
      }
    };
    console.log(result);
    this.statisticsService.setReport(result);
  }

  //提交時，檢查提交資料是否有誤
  checkResport(){
    //檢查班次
    if(this.date == undefined || this.shift_title == undefined || this.site == undefined){
      this.shiftDataConfirm();
    }else if(this.report.attendance <= 0){
      this.attendanceConfirm();
    }else{
      this.reportConfirm();
    }
  }

  //提醒需填寫班次資料
  async shiftDataConfirm(){
    const alert = await this.alertController.create({
      header: '提醒',
      message: '請填寫班次的資料喔!',
      buttons: [
        {
          text: '好的!'
        }
      ]
    });

    await alert.present();
  }

  //提醒需填寫餐與人次
  async attendanceConfirm(){
    const alert = await this.alertController.create({
      header: '提醒',
      message: '請填寫參與人次喔!',
      buttons: [
        {
          text: '好的!'
        }
      ]
    });

    await alert.present();
  }


  //確認提交 alert
  async reportConfirm() {
    const alert = await this.alertController.create({
      header: '提交',
      message: '確認要提交分發登記?',
      buttons: [
        {
          text: '修改',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: '確認',
          handler: () => {
            this.onSubmit();
          }
        }
      ]
    });

    await alert.present();
  }
}
