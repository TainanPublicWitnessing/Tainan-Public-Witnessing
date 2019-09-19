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
  }

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
      shift_title:string
      site:string;
    }    

    this.bigShiftString = "2019/10/01,成大醫院,早上,週二,蔡元勳,蔡儀雯,劉青芳,黃佩儀|2019/10/01,成大醫院,中午,週二,楊季羚,劉淑珍,康珍妮,高久婷|2019/10/01,成大醫院,下午,週二,任宥澤,王揖翔,任亦彤,張智惠|2019/10/02,成大醫院,早上,週三,許獻升,許小慧,曹原,曹如|2019/10/02,成大醫院,中午,週三,楊琪成,楊淑芳,,黃梅花|2019/10/02,成大醫院,下午,週三,楊紀遜,徐佩凡,劉淑惠,林懷睦|2019/10/03,成大醫院,早上,週四,胡家銘,施佳伶,安貝麗,高雨婷|2019/10/03,成大醫院,中午,週四,蘇克尹,後藤亞裕美,蔡馨儀,黃念貞|2019/10/03,成大醫院,下午,週四,劉曜瑄,陳亭妤,葉憶秋,蔡麗珍|2019/10/04,成大醫院,早上,週五,劉明仁,王秀珍,康珍妮,林玉婷|2019/10/04,成大醫院,中午,週五,林延清,黃淑華,林麗芳,邱雅萍|2019/10/04,成大醫院,下午,週五,洪紹銘,蔡元勳,蔡儀雯,陳淑珍(東區東區)|2019/10/04,後火車站,下午,週五,楊紀遜,楊孟樺,劉美英,陳亭妤|2019/10/05,安平西門國小,早上,週六,林延清,汪瑞琴,蔡惠祺,薛郁萱|2019/10/05,安平西門國小,中午,週六,呂育勝,呂嘉蓉,黃梅花,安貝麗|2019/10/05,安平西門國小,下午,週六,曹原,曹如,康珍妮,高雨婷|2019/10/05,安平樹屋停車場,中午,週六,田頭隼人,田頭思潔,蔡馨儀,|2019/10/05,安平樹屋停車場,下午,週六,蘇克尹,許琬如,許均苓,|2019/10/05,孔廟園區,早上,週六,陳東君,陳美瑩,黃柔溦,吳欣儒|2019/10/05,孔廟園區,中午,週六,郭朝彬,黃信男,黃麗君,洪欣漪|2019/10/05,孔廟園區,下午,週六,,,王雪玲,陳淑珍(東區東區)|2019/10/06,安平西門國小,早上,週日,黃信男,洪欣漪,李淑慧,胡家銘|2019/10/06,安平西門國小,中午,週日,蘇克尹,黃稻珍,安貝麗,黃梅花|2019/10/06,安平西門國小,下午,週日,楊紀遜,黃麗君,王雪玲,康珍妮|2019/10/06,安平樹屋停車場,中午,週日,陳東君,陳佩均,賴恩惠,陳美瑩|2019/10/06,安平樹屋停車場,下午,週日,林建成,蔡惠祺,譚金桂,羅林美英|2019/10/06,孔廟園區,早上,週日,周政霖,謝亞美,高雨婷,黃時|2019/10/06,孔廟園區,中午,週日,李信寬,楊季羚,柯麗郁,郭朝彬|2019/10/06,孔廟園區,下午,週日,呂育勝,蔡玉民,呂嘉蓉,吳素碧|2019/10/07,成大醫院,早上,週一,王揖翔,吳麗華,劉淑惠,洪欣漪|2019/10/07,成大醫院,中午,週一,任宥澤,黃文清,任亦彤,劉益君|2019/10/07,成大醫院,下午,週一,蔡元泓,陳亭妤,林懷睦,吳素碧|2019/10/08,成大醫院,早上,週二,鄭炳文,鄭瑋珠,謝秀鸞,陳亭妤|2019/10/08,成大醫院,中午,週二,謝玫秀,康珍妮,葉美月,林麗芳|2019/10/08,成大醫院,下午,週二,蔡登山,黃薰萱,陳秀玲(東區東區),王雅苓|2019/10/09,成大醫院,早上,週三,洪欣漪,胡瓊蓉,陳亭妤,王淑燕|2019/10/09,成大醫院,中午,週三,田頭隼人,田頭思潔,林鳳珠,|2019/10/09,成大醫院,下午,週三,黃佩儀,蔡儀雯,許小慧,陳淑珍(東區東區)|2019/10/10,孔廟園區,早上,週四,李志明,李玉如,黃薰萱,王雅苓|2019/10/10,孔廟園區,中午,週四,黃文清,李達飛,,劉益君|2019/10/10,孔廟園區,下午,週四,劉曜瑄,陳佩均,陳佩瑜,姬正宇|2019/10/10,安平西門國小,早上,週四,胡家銘,林懷睦,康珍妮,施佳伶|2019/10/10,安平西門國小,中午,週四,蘇克尹,黃琇琪,黃麗君,蔡馨儀|2019/10/10,安平西門國小,下午,週四,黃振宇,黃佩儀,黃薰萱,黃梅花|2019/10/10,安平樹屋停車場,中午,週四,任宥澤,任亦彤,張惠真,吳美醇|2019/10/10,安平樹屋停車場,下午,週四,郭朝彬,劉麗琴,許麗玉,高雨婷|2019/10/11,孔廟園區,早上,週五,佐野尚文,周政霖,佐野芙由,黃梅花|2019/10/11,孔廟園區,中午,週五,任亦彤,劉青芳,高久婷,吳素碧|2019/10/11,孔廟園區,下午,週五,郭朝彬,蔡玉民,陳淑珍(東區東區),李淑慧|2019/10/11,安平西門國小,早上,週五,蔡元勳,蔡儀雯,胡瓊瑢,|2019/10/11,安平西門國小,中午,週五,林延清,,後藤亞裕美,陳佩瑜|2019/10/11,安平西門國小,下午,週五,楊紀遜,楊孟樺,蔡喬双,黃念貞|2019/10/11,安平樹屋停車場,中午,週五,胡家銘,林懷睦,黃稻珍,黃富貴|2019/10/11,安平樹屋停車場,下午,週五,柯麗郁,蔡麗珍,劉麗華,|2019/10/12,安平西門國小,早上,週六,鄭炳文,鄭瑋珠,魏彩晨,陳秀玲(安平區北部)|2019/10/12,安平西門國小,中午,週六,黃信男,劉美英,黃麗君,林鳳珠|2019/10/12,安平西門國小,下午,週六,蘇克尹,賴恩惠,陳淑珍(東區東區),王雅苓|2019/10/12,安平樹屋停車場,中午,週六,郭朝彬,陳美華,柯麗郁,洪欣漪|2019/10/12,安平樹屋停車場,下午,週六,張惠美(安南區安南),高雨婷,康珍妮,|2019/10/12,孔廟園區,早上,週六,李信寬,林惠萍,高久婷,薛郁萱|2019/10/12,孔廟園區,中午,週六,劉曜瑄,謝亞美,安貝麗,|2019/10/12,孔廟園區,下午,週六,,譚金桂,張惠真,|2019/10/13,安平西門國小,早上,週日,劉曜瑄,胡瓊瑢,吳怜瑩,周政霖|2019/10/13,安平西門國小,中午,週日,張佑維,黃柔溦,郭朝彬,安貝麗|2019/10/13,安平西門國小,下午,週日,蔡元泓,黃薰萱,黃曉蘋,吳素碧|2019/10/13,安平樹屋停車場,中午,週日,胡家銘,張惠美(安南區安南),康珍妮,王雪玲|2019/10/13,安平樹屋停車場,下午,週日,楊紀遜,楊孟樺,張惠真,高雨婷|2019/10/13,孔廟園區,早上,週日,吳欣儒,洪欣漪,黃時,|2019/10/13,孔廟園區,中午,週日,陳東君,陳珮瑜,張智惠,陳美瑩|2019/10/13,孔廟園區,下午,週日,陳文志,後藤亞裕美,劉麗琴,羅林美英|2019/10/14,成大醫院,早上,週一,任宥澤,施佳伶,林鳳珠,黃薰萱|2019/10/14,成大醫院,中午,週一,李達飛,黃淑華,蘇玲玲,林麗芳|2019/10/14,成大醫院,下午,週一,蔡登山,黃佩儀,林懷睦,陳淑珍(東區東區)|2019/10/15,成大醫院,早上,週二,鄭炳文,鄭瑋珠,陳佳瑋,呂嘉蓉|2019/10/15,成大醫院,中午,週二,劉淑惠,林麗芳,張惠美(安南區安南),邱雅萍|2019/10/15,成大醫院,下午,週二,王揖翔,蔡喬双,王雅苓,李淑慧|2019/10/16,成大醫院,早上,週三,許獻升,康珍妮,林麗芳,王淑燕|2019/10/16,成大醫院,中午,週三,盧培吾,張惠真,柯麗郁,邱雅萍|2019/10/16,成大醫院,下午,週三,楊紀遜,李淑慧,劉淑惠,徐佩凡|2019/10/17,成大醫院,早上,週四,任宥澤,任亦彤,陳秀玲(東區東區),李蕎羚|2019/10/17,成大醫院,中午,週四,黃文清,林麗芳,蔡馨儀,林麗芳|2019/10/17,成大醫院,下午,週四,柯麗郁,蔡喬双,葉憶秋,許麗玉|2019/10/18,成大醫院,早上,週五,洪姿蓉,陳佳瑋,劉青芳,安貝麗|2019/10/18,成大醫院,中午,週五,胡家銘,林延清,林玉婷,邱雅萍|2019/10/18,成大醫院,下午,週五,蔡元勳,蔡儀雯,李淑慧,陳淑珍(東區東區)|2019/10/18,後火車站,下午,週五,呂育勝,郭朝彬,吳素碧,楊孟樺|2019/10/19,安平西門國小,早上,週六,林延清,黃柔溦,吳欣儒,張文月|2019/10/19,安平西門國小,中午,週六,劉曜瑄,黃稻珍,安貝麗,洪欣漪|2019/10/19,安平樹屋停車場,中午,週六,周政霖,蔡馨儀,黃梅花,林鳳珠|2019/10/19,安平樹屋停車場,下午,週六,譚金桂,賴恩惠,王雅苓,|2019/10/19,安平西門國小,下午,週六,王揖翔,王雪玲,高雨婷,|2019/10/19,孔廟園區,早上,週六,李鈞函,吳怜瑩,陳錦蘭,汪瑞琴|2019/10/19,孔廟園區,中午,週六,黃信男,柯麗郁,陳美華,楊季羚|2019/10/19,孔廟園區,下午,週六,蘇克尹,陳淑珍(東區東區),康珍妮,林建成|2019/10/20,安平西門國小,早上,週日,劉曜瑄,劉青芳,高雨婷,劉美英|2019/10/20,安平西門國小,中午,週日,蘇克尹,黃梅花,張智惠,賴恩惠|2019/10/20,安平西門國小,下午,週日,陳文志,蔡玉民,柯麗郁,黃曉蘋|2019/10/20,安平樹屋停車場,中午,週日,郭朝彬,洪欣漪,吳怜瑩,安貝麗|2019/10/20,安平樹屋停車場,下午,週日,李信寬,劉淑惠,黃薰萱,吳素碧|2019/10/20,孔廟園區,早上,週日,胡家銘,李淑慧,李婉雪,黃柔溦|2019/10/20,孔廟園區,中午,週日,黃信男,黃稻珍,康珍妮,楊季羚|2019/10/20,孔廟園區,下午,週日,林建成,黃念貞,黃麗君,譚金桂|2019/10/21,成大醫院,早上,週一,王揖翔,李蕎羚,陳佳瑋,張智惠|2019/10/21,成大醫院,中午,週一,黃文清,盧培吾,李淑慧,林麗芳|2019/10/21,成大醫院,下午,週一,楊紀遜,蔡元泓,吳美醇,黃佩儀|2019/10/22,成大醫院,早上,週二,蔡元勳,蔡儀雯,王秀珍,許麗玉|2019/10/22,成大醫院,中午,週二,謝玫秀,蘇玲玲,盧培吾,葉美月|2019/10/22,成大醫院,下午,週二,佐野尚文,佐野芙由,蔡麗珍,吳麗華|2019/10/23,成大醫院,早上,週三,洪欣漪,胡瓊蓉,康珍妮,林麗芳|2019/10/23,成大醫院,中午,週三,田頭隼人,田頭思潔,黃淑華,黃富貴|2019/10/23,成大醫院,下午,週三,許獻升,許小慧,蔡儀雯,陳淑珍(東區東區)|2019/10/24,成大醫院,早上,週四,胡家銘,黃薰萱,吳怜瑩,黃欣妤|2019/10/24,成大醫院,中午,週四,蘇克尹,黃麗君,呂嘉蓉,吳美醇|2019/10/24,成大醫院,下午,週四,蔡登山,蔡麗珍,蔡喬双,葉憶秋|2019/10/25,成大醫院,早上,週五,洪姿蓉,佐野尚文,佐野芙由,吳怜瑩|2019/10/25,成大醫院,中午,週五,高久婷,林麗芳,邱雅萍,黃富貴|2019/10/25,成大醫院,下午,週五,楊紀遜,楊孟樺,吳素碧,李淑慧|2019/10/25,後火車站,下午,週五,呂育勝,林延清,劉美英,林懷睦|2019/10/26,孔廟園區,早上,週六,李鈞函,魏彩晨,陳秀玲(安平區北部),謝秀鸞|2019/10/26,孔廟園區,中午,週六,郭朝彬,周政霖,楊季羚,蔡馨儀|2019/10/26,孔廟園區,下午,週六,王揖翔,賴恩惠,高雨婷,|2019/10/26 ,安平西門國小,早上,週六,陳東君,陳美瑩,陳錦蘭,吳怜瑩|2019/10/26 ,安平西門國小,中午,週六,田頭隼人,田頭思潔,柯麗郁,黃稻珍|2019/10/26 ,安平西門國小,下午,週六,任宥澤,任亦彤,張惠真,康珍妮|2019/10/26 ,安平樹屋停車場,中午,週六,李信寬,林延清,謝亞美,劉青芳|2019/10/26 ,安平樹屋停車場,下午,週六,王雪玲,譚金桂,陳淑珍(東區東區),林建成|2019/10/27,安平西門國小,早上,週日,李信寬,李婉雪,李淑慧,黃時|2019/10/27,安平西門國小,中午,週日,陳東君,陳珮瑜,張惠真,陳美瑩|2019/10/27,安平西門國小,下午,週日,呂育勝,呂嘉蓉,羅林美英,吳欣儒|2019/10/27,安平樹屋停車場,中午,週日,張佑維,謝亞美,王雪玲,柯麗郁|2019/10/27,安平樹屋停車場,下午,週日,陳文志,劉麗琴,林建成,譚金桂|2019/10/27,孔廟園區,早上,週日,劉曜瑄,蔡惠祺,黃柔溦,吳怜瑩|2019/10/27,孔廟園區,中午,週日,蘇克尹,陳佩均,張惠美(安南區安南),楊季羚|2019/10/27,孔廟園區,下午,週日,楊紀遜,楊孟樺,賴恩惠,黃曉蘋|2019/10/28,成大醫院,早上,週一,姬正宇,陳凱惠,許麗玉,黃時|2019/10/28,成大醫院,中午,週一,李達飛,李淑慧,劉益君,蘇玲玲|2019/10/28,成大醫院,下午,週一,楊紀遜,吳素碧,吳美醇,陳淑珍(東區東區)|2019/10/29,成大醫院,早上,週二,鄭炳文,鄭瑋珠,張惠美(永康區東部),李蕎羚|2019/10/29,成大醫院,中午,週二,蘇玲玲,劉淑珍,邱雅萍,楊季羚|2019/10/29,成大醫院,下午,週二,郭朝彬,黃薰萱,劉淑惠,李淑慧|2019/10/30,成大醫院,早上,週三,曹原,曹如,康珍妮,林麗芳|2019/10/30,成大醫院,中午,週三,楊琪成,楊淑芳,李俊,張惠美(安南區安南)|2019/10/30,成大醫院,下午,週三,楊紀遜,李淑慧,陳淑珍(東區東區),林懷睦|2019/10/31,成大醫院,早上,週四,李志明,李玉如,林懷睦,吳怜瑩|2019/10/31,成大醫院,中午,週四,黃文清,呂嘉蓉,劉益君,蔡馨儀|2019/10/31,成大醫院,下午,週四,柯麗郁,葉憶秋,陳秀玲(安平區北部),許麗玉";
    
    let SHiftArray = new Array<Object>();
  
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
    /*
    for(let _shift of SHiftArray){
      this.firestore.collection("MonthlyData")
      .doc("201910")
      .collection("shift")
      .doc(sha256(_shift.date + _shift.shift_title + _shift.site)).set(_shift);
    }*/

  }

  //轉換月班表到個人班表
  resetShift(){
    let month = "201910";
    
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
        
        db.doc(sha256(name)).collection("MonthlyData").doc(month).update({personal_shift:result[name]});
      }
    });
  }
}
