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

export class ShiftService {

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
          result.push(data.docs[i].data());   
        }
        return result;
      })
    );
  }

  //獲取使用者此月班表
  getMonthlyShiftByUser(user, month){
    //獲取此月班表
    return this.firestore
      .collection("User")
      .doc(sha256(user))
      .collection("MonthlyData")
      .doc(month)
      .get().pipe(
        map(data=>{
          console.log(data);
          return data.get("personal_shift");
        })
      );
    /*
    return this.firestore.collection("MonthlyData")
    .doc(month)
    .collection("shift",query=>{
      return query.orderBy("date").where("members","array-contains",user);
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
    */
  }

  //獲取使用者此月班表
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
      shift_title:string
      site:string;
    }    

    this.bigShiftString = 
    "2019/10/1,週二,早上,蔡元勳,蔡儀雯,劉青芳,黃佩儀|"+
    "2019/10/1,週二,中午,楊季羚,劉淑珍,康珍妮,高久婷|"+
    "2019/10/1,週二,下午,任宥澤,王揖翔,任亦彤,張智惠|"+
    "2019/10/8,週二,早上,鄭炳文,鄭瑋珠,謝秀鸞,陳亭妤|"+
    "2019/10/8,週二,中午,謝玫秀,康珍妮,葉美月,林麗芳|"+
    "2019/10/8,週二,下午,蔡登山,黃薰萱,陳秀玲(東區東區),王雅苓|"+
    "2019/10/15,週二,早上,鄭炳文,鄭瑋珠,陳佳瑋,呂嘉蓉|"+
    "2019/10/15,週二,中午,劉淑惠,林麗芳,張惠美(安南區安南),邱雅萍|"+
    "2019/10/15,週二,下午,王揖翔,蔡喬双,王雅苓,李淑慧|"+
    "2019/10/22,週二,早上,蔡元勳,蔡儀雯,王秀珍,許麗玉|"+
    "2019/10/22,週二,中午,謝玫秀,蘇玲玲,盧培吾,葉美月|"+
    "2019/10/22,週二,下午,佐野尚文,佐野芙由,蔡麗珍,吳麗華|"+
    "2019/10/29,週二,早上,鄭炳文,鄭瑋珠,張惠美(永康區東部),李蕎羚|"+
    "2019/10/29,週二,中午,蘇玲玲,劉淑珍,邱雅萍,楊季羚|"+
    "2019/10/29,週二,下午,郭朝彬,黃薰萱,劉淑惠,李淑慧|";
    
    let SHiftArray = new Array<Object>();
  
    this.middleSHift = this.bigShiftString.split("|");
    for(let _shift of this.middleSHift){
      
      this.SmallSHift = _shift.split(",");    
      
      let tempShift ={
        date:this.SmallSHift[0],
        day:this.SmallSHift[1],
        shift_title:this.SmallSHift[2],
        site:"成大醫院",
        member:[
          this.SmallSHift[3],
          this.SmallSHift[4],
          this.SmallSHift[5],
          this.SmallSHift[6]
        ]
      }      
      console.log(tempShift);
      SHiftArray.push(tempShift);
    }
    console.log(SHiftArray);


    //add to firestore
    /*for(let _shift of SHiftArray){
      this.firestore.collection("MonthlyData")
      .doc("201910")
      .collection("shift")
      .add(_shift);
    }*/
  }

  //轉換月班表到個人班表
  resetShift(){
    
    this.firestore.collection("MonthlyData").doc("201909").collection("shift").get().pipe(
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
        console.log(result[name]);
        
        db.doc(sha256(name)).collection("MonthlyData").doc("201909").set({personal_shift:result[name]});
      }
    });
  }
}
