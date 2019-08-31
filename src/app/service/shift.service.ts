import { Injectable } from '@angular/core';
import {Observable, pipe, of} from "rxjs";
import {map} from "rxjs/operators"; 

import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})

export class ShiftService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  /* variables */
  monthly_shift:Array<any>;

  /* requests */
  //獲取此月份班表
  getShiftByMonth(month){
    return this.firestore.collection("MonthlyData")
    .doc(month)
    .collection("shift",query=>{
      return query.orderBy("date")
    }).get().pipe(
      map(data=>{
        let result = [];
        let length = data.docs.length;
        for(let i=0;i<length;i++){          
          result.push(data.docs[i].data());   
        }
        return result;
      })
    ).subscribe(response=>{
      this.monthly_shift = response;
      console.log(response);
    });
  }

  /* function */
  //獲取使用者此月班表
  getMonthlyShiftByUser(user, month){
    //獲取此月班表
    let monthlyShift = {};
    monthlyShift = this.monthly_shift;
    //回傳資料
    let result = {};

    for(let _shift in monthlyShift){
      
    }

  }

}
