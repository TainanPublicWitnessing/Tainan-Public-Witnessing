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
    console.log("getMonthlySHiftByUser:",user,month);
    let dbMonth = this.datepipe.transform(month, "yyyyMM")
    console.log(dbMonth);
    //獲取此月班表
    return this.firestore
      .collection("User")
      .doc(sha256(user))
      .collection("MonthlyData")
      .doc(dbMonth)
      .get().pipe(
        map(data=>{
          console.log(data);
          console.log(data.data());
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


    this.bigShiftString = "2020/01/01,安平樹屋停車場,中午,週三,劉曜瑄,柯麗郁,黃淑華,|2020/01/01,安平樹屋停車場,下午,週三,楊紀遜,劉淑惠,蔡儀雯,|2020/01/01,安平西門國小,早上,週三,許獻升,許小慧,洪欣漪,|2020/01/01,安平西門國小,中午,週三,楊琪成,楊淑芳,李俊,|2020/01/01,安平西門國小,下午,週三,林玉婷,嚴佳佳,陳淑珍(東區東區),|2020/01/01,孔廟園區,早上,週三,林麗芳,王春桃,胡瓊瑢,|2020/01/01,孔廟園區,中午,週三,吳素碧,王雪玲,黃富貴,|2020/01/01,孔廟園區,下午,週三,蔡玉民,薛采娥,,|2020/01/02,成大園區,早上,週四,胡家銘,胡瓊瑢,劉美英,陳麗雯|2020/01/02,成大園區,中午,週四,金仁基,金銀英,薛采娥,張惠真|2020/01/02,成大園區,下午,週四,郭朝彬,張鳳華,梁毓涵,李淑慧|2020/01/03,後火車站,下午,週五,郭朝彬,林玉婷,李淑慧,李俋蓉|2020/01/03,成大園區,早上,週五,劉明仁,張淑真,洪欣漪,嚴佳佳|2020/01/03,成大園區,中午,週五,林延清,黃淑華,吳素碧,林麗芳|2020/01/03,成大園區,下午,週五,呂育勝,林懷睦,劉美英,陳淑珍(東區東區)|2020/01/04,安平樹屋停車場,中午,週六,呂育勝,呂嘉蓉,謝亞美,黃梅花|2020/01/04,安平樹屋停車場,下午,週六,李淑慧,王雅苓,賴恩純,嚴佳佳|2020/01/04,安平西門國小,早上,週六,林延清,李信寬,魏彩晨,張文月|2020/01/04,安平西門國小,中午,週六,田頭隼人,田頭思潔,柯麗郁,薛郁莓|2020/01/04,安平西門國小,下午,週六,甘力行,賴恩惠,薛芳宜,李俋蓉|2020/01/04,孔廟園區,早上,週六,李鈞函,蔡惠祺,吳怜瑩,|2020/01/04,孔廟園區,中午,週六,劉曜瑄,洪欣漪,陳美華,黃柔溦|2020/01/04,孔廟園區,下午,週六,林建成,張惠美(安南區安南),陳亭妤,黃富貴|2020/01/05,安平樹屋停車場,中午,週日,胡家銘,陳珮瑜,謝玫秀,謝亞美|2020/01/05,安平樹屋停車場,下午,週日,周政霖,吳素碧,賴恩純,薛郁莓|2020/01/05,安平西門國小,早上,週日,李信寬,李婉雪,劉美英,|2020/01/05,安平西門國小,中午,週日,張佑維,黃梅花,柯麗郁,張惠真|2020/01/05,安平西門國小,下午,週日,陳文志,蔡玉民,劉麗琴,楊孟樺|2020/01/05,孔廟園區,早上,週日,,黃時,李淑慧,|2020/01/05,孔廟園區,中午,週日,劉曜瑄,陳美瑩,陳佩均,楊季羚|2020/01/05,孔廟園區,下午,週日,林建成,譚金桂,羅林美英,|2020/01/06,成大園區,早上,週一,姬正宇,陳凱惠,黃時,張智惠|2020/01/06,成大園區,中午,週一,李達飛,黃稻珍,劉益君,黃淑華|2020/01/06,成大園區,下午,週一,蘇玲玲,嚴佳佳,蔡喬双,陳亭妤|2020/01/07,成大園區,早上,週二,鄭炳文,鄭瑋珠,李蕎羚,許麗玉|2020/01/07,成大園區,中午,週二,張智惠,林麗芳,邱雅萍,葉美月|2020/01/07,成大園區,下午,週二,蔡元勳,蔡元勳,蔡喬双,王雅苓|2020/01/08,成大園區,早上,週三,許獻升,許小慧,林麗芳,洪欣漪|2020/01/08,成大園區,中午,週三,楊琪成,楊淑芳,黃麗雲,邱雅萍|2020/01/08,成大園區,下午,週三,林懷睦,蔡喬双,黃佩儀,林玉婷|2020/01/09,成大園區,早上,週四,李志明,李玉如,黃薰萱,陳麗雯|2020/01/09,成大園區,中午,週四,呂嘉蓉,黃琇琪,蔡麗珍,邱雅萍|2020/01/09,成大園區,下午,週四,郭朝彬,葉憶秋,林乃玉,黃麗雲|2020/01/10,後火車站,下午,週五,蔡元勳,蔡儀雯,林懷睦,李淑慧|2020/01/10,成大園區,早上,週五,洪姿蓉,洪欣漪,邱雅萍,嚴佳佳|2020/01/10,成大園區,中午,週五,林延清,黃淑華,吳素碧,林麗芳|2020/01/10,成大園區,下午,週五,呂育勝,林玉婷,蔡麗珍,劉美英|2020/01/11,安平樹屋停車場,中午,週六,劉曜瑄,柯麗郁,劉美英,黃梅花|2020/01/11,安平樹屋停車場,下午,週六,王雪玲,黃富貴,薛芳宜,|2020/01/11,安平西門國小,早上,週六,林延清,高雨婷,吳怜瑩,|2020/01/11,安平西門國小,中午,週六,呂育勝,呂嘉蓉,陳美華,林鳳珠|2020/01/11,安平西門國小,下午,週六,王揖翔,嚴佳佳,薛郁莓,|2020/01/11,孔廟園區,早上,週六,陳東君,蔡惠祺,謝秀鸞,|2020/01/11,孔廟園區,中午,週六,田頭隼人,田頭思潔,林麗芳,謝亞美|2020/01/11,孔廟園區,下午,週六,林建成,賴恩純,陳淑珍(東區東區),|2020/01/12,安平樹屋停車場,中午,週日,,黃稻珍,劉淑惠,|2020/01/12,安平樹屋停車場,下午,週日,楊紀遜,賴恩惠,王雪玲,楊孟樺|2020/01/12,安平西門國小,早上,週日,劉曜瑄,李淑慧,高雨婷,|2020/01/12,安平西門國小,中午,週日,胡家銘,張惠美(安南區安南),謝亞美,柯麗郁|2020/01/12,安平西門國小,下午,週日,林建成,黃曉蘋,吳素碧,|2020/01/12,孔廟園區,早上,週日,陳東君,劉美英,,|2020/01/12,孔廟園區,中午,週日,黃信男,薛郁萱,謝玫秀,賴恩純|2020/01/12,孔廟園區,下午,週日,,蔡玉民,黃薰萱,張惠真|2020/01/13,成大園區,早上,週一,王揖翔,陳佳瑋,許麗玉,李蕎羚|2020/01/13,成大園區,中午,週一,黃淑華,李淑慧,林麗芳,盧培吾|2020/01/13,成大園區,下午,週一,蔡元泓,陳淑珍(東區東區),林懷睦,陳亭妤|2020/01/14,成大園區,早上,週二,鄭炳文,鄭瑋珠,陳佳瑋,呂嘉蓉|2020/01/14,成大園區,中午,週二,盧培吾,張智惠,楊季羚,黃稻珍|2020/01/14,成大園區,下午,週二,陳秀玲(東區東區),李淑慧,黃佩儀,陳靜霏|2020/01/15,成大園區,早上,週三,許獻升,林麗芳,胡瓊瑢,王春桃|2020/01/15,成大園區,中午,週三,蔡登山,黃麗雲,張惠真,柯麗郁|2020/01/15,成大園區,下午,週三,楊紀遜,林懷睦,蔡喬双,徐佩凡|2020/01/16,成大園區,早上,週四,胡家銘,李蕎羚,王雅苓,黃薰萱|2020/01/16,成大園區,中午,週四,金仁基,金銀英,邱雅萍,吳美醇|2020/01/16,成大園區,下午,週四,李淑慧,劉麗華,葉憶秋,洪欣漪|2020/01/17,後火車站,下午,週五,蔡元勳,蔡儀雯,,|2020/01/17,成大園區,早上,週五,劉明仁,王秀珍,陳佳瑋,嚴佳佳|2020/01/17,成大園區,中午,週五,胡家銘,盧培吾,吳素碧,|2020/01/17,成大園區,下午,週五,郭朝彬,楊紀遜,李淑慧,|2020/01/18,安平樹屋停車場,中午,週六,田頭隼人,田頭思潔,黃麗君,張惠真|2020/01/18,安平樹屋停車場,下午,週六,劉正豪,薛郁莓,高雨婷,|2020/01/18,安平西門國小,早上,週六,林延清,劉青芳,陳秀玲(安平區北部),|2020/01/18,安平西門國小,中午,週六,安大山,謝亞美,黃柔溦,陳美瑩|2020/01/18,安平西門國小,下午,週六,王揖翔,王雪玲,陳淑珍(東區東區),|2020/01/18,孔廟園區,早上,週六,劉曜瑄,蔡惠祺,汪瑞琴,|2020/01/18,孔廟園區,中午,週六,郭朝彬,黃信男,柯麗郁,黃梅花|2020/01/18,孔廟園區,下午,週六,李淑慧,嚴佳佳,李俋蓉,|2020/01/19,安平樹屋停車場,中午,週日,張佑維,黃梅花,賴恩純,陳珮瑜|2020/01/19,安平樹屋停車場,下午,週日,陳文志,黃麗君,羅林美英,|2020/01/19,安平西門國小,早上,週日,,林惠萍,李淑慧,劉美英|2020/01/19,安平西門國小,中午,週日,,陳佩均,黃稻珍,謝玫秀|2020/01/19,安平西門國小,下午,週日,周政霖,譚金桂,薛郁莓,|2020/01/19,孔廟園區,早上,週日,劉曜瑄,高雨婷,蔡惠祺,|2020/01/19,孔廟園區,中午,週日,呂育勝,薛郁萱,楊季羚,呂嘉蓉|2020/01/19,孔廟園區,下午,週日,楊紀遜,賴恩惠,吳素碧,柯麗郁|2020/01/20,成大園區,早上,週一,王揖翔,黃佩儀,張智惠,黃薰萱|2020/01/20,成大園區,中午,週一,李達飛,李淑慧,蘇玲玲,王春桃|2020/01/20,成大園區,下午,週一,林乃玉,林懷睦,盧培吾,蔡喬双|2020/01/21,成大園區,早上,週二,王揖翔,謝秀鸞,張惠美(永康區東部),謝亞美|2020/01/21,成大園區,中午,週二,謝玫秀,劉淑珍,邱雅萍,盧培吾|2020/01/21,成大園區,下午,週二,蔡麗珍,王雅苓,李淑慧,黃薰萱|2020/01/22,成大園區,早上,週三,曹原,曹如,許小慧,王春桃|2020/01/22,成大園區,中午,週三,楊琪成,楊淑芳,黃淑華,吳素碧|2020/01/22,成大園區,下午,週三,蔡喬双,蔡麗珍,蔡儀雯,黃佩儀|2020/01/23,成大園區,早上,週四,林麗芳,陳亭妤,劉美英,陳秀玲(東區東區)|2020/01/23,成大園區,中午,週四,黃琇琪,張惠真,劉益君,吳美醇|2020/01/23,成大園區,下午,週四,郭朝彬,張鳳華,林乃玉,梁毓涵|2020/01/24,安平樹屋停車場,中午,週五,,,,|2020/01/24,安平樹屋停車場,下午,週五,蔡元勳,蔡儀雯,,陳淑珍(東區東區)|2020/01/24,安平西門國小,早上,週五,洪紹銘,洪姿蓉,嚴佳佳,薛郁萱|2020/01/24,安平西門國小,中午,週五,,,,|2020/01/24,安平西門國小,下午,週五,楊紀遜,李俋蓉,劉美英,|2020/01/24,孔廟園區,早上,週五,劉明仁,洪欣漪,劉青芳,施佳伶|2020/01/24,孔廟園區,中午,週五,胡家銘,林麗芳,,|2020/01/24,孔廟園區,下午,週五,郭朝彬,蔡麗珍,劉麗華,|2020/01/25,安平樹屋停車場,中午,週六,劉曜瑄,林麗芳,薛郁萱,陳美瑩|2020/01/25,安平樹屋停車場,下午,週六,劉正豪,李俋蓉,薛郁莓,|2020/01/25,安平西門國小,早上,週六,鄭炳文,鄭瑋珠,陳秀玲(安平區北部),|2020/01/25,安平西門國小,中午,週六,郭朝彬,黃信男,洪欣漪,張惠真|2020/01/25,安平西門國小,下午,週六,曹原,曹如,嚴佳佳,|2020/01/25,孔廟園區,早上,週六,陳東君,張文月,蔡惠祺,|2020/01/25,孔廟園區,中午,週六,田頭隼人,田頭思潔,安大山,林鳳珠|2020/01/25,孔廟園區,下午,週六,甘力行,王雪玲,陳淑珍(東區東區),|2020/01/26,安平樹屋停車場,中午,週日,劉曜瑄,謝亞美,張惠真,|2020/01/26,安平樹屋停車場,下午,週日,林子又,林乃玉,黃曉蘋,譚金桂|2020/01/26,安平西門國小,早上,週日,陳東君,劉青芳,高雨婷,|2020/01/26,安平西門國小,中午,週日,黃信男,陳美瑩,劉淑惠,劉麗琴|2020/01/26,安平西門國小,下午,週日,蔡元泓,梁毓涵,黃薰萱,羅林美英|2020/01/26,孔廟園區,早上,週日,,劉美英,蔡惠祺,|2020/01/26,孔廟園區,中午,週日,胡家銘,黃梅花,黃稻珍,楊季羚|2020/01/26,孔廟園區,下午,週日,楊紀遜,黃柔溦,王雪玲,楊孟樺|2020/01/27,安平樹屋停車場,中午,週一,,,,|2020/01/27,安平樹屋停車場,下午,週一,,,,|2020/01/27,安平西門國小,早上,週一,陳秀玲(安平區北部),許麗玉,吳麗華,|2020/01/27,安平西門國小,中午,週一,王雪玲,薛郁萱,林麗芳,|2020/01/27,安平西門國小,下午,週一,林乃玉,高雨婷,吳美醇,|2020/01/27,孔廟園區,早上,週一,劉青芳,黃薰萱,林鳳珠,|2020/01/27,孔廟園區,中午,週一,黃稻珍,劉益君,吳美醇,|2020/01/27,孔廟園區,下午,週一,王春桃,嚴佳佳,陳淑珍(東區東區),|2020/01/28,安平樹屋停車場,中午,週二,高雨婷,林麗芳,黃稻珍,|2020/01/28,安平樹屋停車場,下午,週二,王揖翔,吳麗華,蔡麗珍,|2020/01/28,安平西門國小,早上,週二,鄭炳文,鄭瑋珠,陳靜霏,張惠美(永康區東部)|2020/01/28,安平西門國小,中午,週二,謝玫秀,劉淑珍,葉美月,|2020/01/28,安平西門國小,下午,週二,劉曜瑄,李俋蓉,譚金桂,|2020/01/28,孔廟園區,早上,週二,陳秀玲(安平區北部),薛郁萱,王秀珍,劉青芳|2020/01/28,孔廟園區,中午,週二,劉淑惠,薛采娥,楊季羚,|2020/01/28,孔廟園區,下午,週二,陳秀玲(東區東區),郭淑鳳,黃薰萱,|2020/01/29,安平樹屋停車場,中午,週三,李俊,高雨婷,邱雅萍,|2020/01/29,安平樹屋停車場,下午,週三,蔡儀雯,陳淑珍(東區東區),,|2020/01/29,安平西門國小,早上,週三,林麗芳,陳秀玲(安平區北部),劉青芳,|2020/01/29,安平西門國小,中午,週三,楊琪成,楊淑芳,張惠真,|2020/01/29,安平西門國小,下午,週三,楊紀遜,黃佩儀,,|2020/01/29,孔廟園區,早上,週三,洪欣漪,王春桃,,|2020/01/29,孔廟園區,中午,週三,蔡登山,黃富貴,,|2020/01/29,孔廟園區,下午,週三,劉淑惠,譚金桂,,|2020/01/30,成大園區,早上,週四,胡家銘,林懷睦,胡瓊瑢,王雅苓|2020/01/30,成大園區,中午,週四,金仁基,金銀英,呂嘉蓉,林麗芳|2020/01/30,成大園區,下午,週四,洪欣漪,嚴佳佳,柯麗郁,黃麗雲|2020/01/31,後火車站,下午,週五,郭朝彬,盧培吾,,|2020/01/31,成大園區,早上,週五,洪姿蓉,洪欣漪,邱雅萍,施佳伶|2020/01/31,成大園區,中午,週五,胡家銘,林麗芳,,|2020/01/31,成大園區,下午,週五,蔡元勳,蔡儀雯,,";

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
      .doc("202001")
      .collection("shift")
      .doc(sha256(shift.date + shift.shift_title + shift.site)).set(shift);
    }

  }

  //轉換月班表到個人班表
  resetShift(){
    let month = "202001";
    
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
