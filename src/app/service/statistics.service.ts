import { Injectable } from '@angular/core';
import {map} from "rxjs/operators"; 

import {AngularFirestore} from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

import {sha256} from "js-sha256/src/sha256.js";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private firestore: AngularFirestore,
    private datepipe: DatePipe,
  ) { }

  //寫入分發登記資料
  setReport(_report){
    //設定提交時間
    _report.create_on = new Date();
    const dbMonth = this.datepipe.transform(_report.create_on,"yyyyMM");
    _report.date = this.datepipe.transform(_report.date, "yyyy-MM-dd");
    const docId = sha256(_report.date + _report.shift_title + _report.site);
    //寫入發分登記資料
    this.firestore.collection("Statistics").doc("ShiftReport").collection(dbMonth)
      .doc(docId).set(_report);
  }

  /**
   * 獲取分發登記資料
   * @param _reportDate 日期
   * @param _reportId   id
   */
  getReportById(_reportDate, _reportId){
    const _date = new Date(_reportDate);
    const dbMonth = this.datepipe.transform(_date, "yyyyMM");

    return this.firestore.collection("Statistics").doc("ShiftReport").collection(dbMonth)
      .doc(_reportId).get().pipe(
        map(data=>{
          return data.data();
        })
      );
  }


  getReportByDate(_date){
    //設定月份格式
    const dbMonth = this.datepipe.transform(_date,"yyyyMM")
    const dbDate = this.datepipe.transform(_date, "yyyy-MM-dd");

    return this.firestore.collection("Statistics").doc("ShiftReport").collection(dbMonth,query=>{
      return query.where("date","==",dbDate);
    }).get().pipe(
        map(data=>{
          let result = [];
          let length = data.docs.length;
          for(let i=0;i<length;i++){
            let info = data.docs[i].data();
            info.id = data.docs[i].id;      
            result.push(info);
          }
          return result;
        })
      );
  }
}
