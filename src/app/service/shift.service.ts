import { Injectable } from '@angular/core';
import {Observable, pipe, of} from "rxjs";
import {map} from "rxjs/operators"; 

import {AngularFirestore} from "@angular/fire/firestore";
import { stringify } from '@angular/compiler/src/util';
import { templateJitUrl } from '@angular/compiler';
import { DatePipe } from '@angular/common';

import {sha256} from "js-sha256/src/sha256.js";

@Injectable({
  providedIn: 'root'
})

export class ShiftService{

  constructor(
    private firestore: AngularFirestore,
    private datepipe: DatePipe
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
          let info = [];
          info.push(data.docs[i].data());
          info.push(data.docs[i].id);   
          result.push(info);
        }
        return result;
      })
    );
  }

  //獲取使用者此月班表
  getMonthlyShiftByUser(user, month){
    let dbMonth = this.datepipe.transform(month, "yyyyMM")
    //獲取此月班表
    return this.firestore
      .collection("User")
      .doc(sha256(user))
      .collection("MonthlyData")
      .doc(dbMonth)
      .get().pipe(
        map(data=>{
          console.log(data);
          return data.get("personal_shift");
        })
      );
  }

  //獲取星期幾班表
  getMonthlyShiftByDay(month, day){
    
    //處理月份格式
    let sMonth = this.datepipe.transform(month, "yyyyMM");
    console.log(sMonth,day);
    //獲取此月此星期班表
    return this.firestore.collection("MonthlyData").doc(sMonth)
    .collection("shift",query =>{
      return query.where("day","==",day)
    }).get().pipe(
      map(data=>{
        let result = [];
        let length = data.docs.length;
        for(let i=0;i<length;i++){          
          result.push(data.docs[i].data());
        }
        return result;
      })
    )
  }

  //獲取此日班表
  getShiftByDate(date){
    let month = this.datepipe.transform(date, "yyyyMM");
    let _date = this.datepipe.transform(date, "yyyy-MM-dd");
    console.log(month, _date);
    //獲取此月班表
    return this.firestore.collection("MonthlyData")
      .doc(month)
      .collection("shift",query=>{
        return query.where("date","==",_date);
      }).get().pipe(
        map(data=>{
          let result = [];
          let length = data.docs.length;
          for(let i=0;i<length;i++){          
            result.push(data.docs[i].data());
          }
          return result;
        })
      );
  }

  setShiftByDate(date,shift_title,site,members){
    let month = this.datepipe.transform(date, "yyyyMM");
    this.firestore.collection("MonthlyData")
      .doc(month)
      .collection("shift")
      .doc(sha256(date + shift_title + site))
      .update({members:members});
  }
  
  getSingleShift(date,shift_title,site){
    //let date_temp = date.split("-");
    let month = this.datepipe.transform(new Date(date), "yyyyMM");
    return this.firestore
      .collection("MonthlyData").doc(month)//date_temp[0] + date_temp[1]
      .collection("shift").doc(sha256(date + shift_title + site))
      .get().pipe(
        map(data=>{
          return data.data();
        })
      );
  }

  /* 匯入班表 */
  middleSHift:Array<any>;
  SmallSHift:Array<any>;
  //SHiftArray:Array<any>;
  bigShiftString:string;

  
  ShiftTextProcess(){
    class shift{
      date:string;
      day:string;
      member:Array<string>;    
      shift_title:string;
      site:string;
    }    


    this.bigShiftString = "";

    let SHiftArray = [];
  
    this.middleSHift = this.bigShiftString.split("|");
    for(let _shift of this.middleSHift){
      
      this.SmallSHift = _shift.split(",");    

      let tempShift ={
        date:this.SmallSHift[0].replace(new RegExp('/', 'g'),"-"),//this.datepipe.transform(new Date(this.SmallSHift[0]), "yyyy-MM-dd"),
        day:this.SmallSHift[3],
        shift_title:this.SmallSHift[2],
        site:this.SmallSHift[1],
        members:[
          this.SmallSHift[4],
          this.SmallSHift[5],
          this.SmallSHift[6],
          this.SmallSHift[7]
        ]
      }      
      console.log(tempShift);
      SHiftArray.push(tempShift);
    }
    console.log(SHiftArray);
    

    //add to firestore
    
    for(let shift of SHiftArray){
     this.firestore.collection("MonthlyData")
      .doc("201911")
      .collection("shift")
      .doc(sha256(shift.date + shift.shift_title + shift.site)).set(shift);
    }

  }

  //轉換月班表到個人班表
  resetShift(){
    let month = "201911";
    
    this.firestore.collection("MonthlyData").doc(month).collection("shift").get().pipe(
      map(data=>{
        let result = [];
        let length = data.docs.length;
        for(let i=0;i<length;i++){          
          result.push(data.docs[i].data());
        }
        return result;
      })
    ).subscribe(response=>{
      let result = {};
      
      let db = this.firestore.collection("User");
      
      let length = response.length;
      for(let i=0;i<length;i++){
        for(let j=0;j<4;j++){
          if(response[i].members[j] != ""){
            if( !result[ response[i].members[j] ] ) result[ response[i].members[j] ] = [];
            result[ response[i].members[j] ].push({
              date:response[i].date,
              day:response[i].day,
              site:response[i].site,
              shift_title:response[i].shift_title
            });
          }
        }
      }
      
      let name;
      for(name in result){
        result[name].sort(function(a,b){
          return a.date.localeCompare(b.date);
        });
        console.log(name,result[name]);
        
        db.doc(sha256(name)).collection("MonthlyData").doc(month).set({personal_shift:result[name]});
      }
    });
  }
}
