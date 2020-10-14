import {Injectable} from "@angular/core";
import {Observable,Subject, BehaviorSubject } from "rxjs";
import {map} from "rxjs/operators";

import {AngularFirestore} from "@angular/fire/firestore";

import { DatePipe } from '@angular/common';

import {sha256} from "js-sha256/src/sha256.js";
import {User} from "../structures/User";

@Injectable({
  providedIn:"root"
})
export class UserService{

  constructor(
    private firestore:AngularFirestore,
    private datepipe: DatePipe
  ){}
  
  /* variables */
  

  all_users_name = [];
  user:User = new User();
  users_id_code_map: any[];

  //新的架構，之後都使用BehaviorSubject
  public user$:BehaviorSubject<User> = new BehaviorSubject<User>(undefined);

  public mess = new Subject<User>();

  /* requests */
  
  getUsersByCongregation(congregation:String){
    return this.firestore.collection("User",query => {
      return query.where("congregation","==",congregation);
    }).get().pipe(
      map(data=>{
        let result = [];
        let length = data.docs.length;
        for(let i=0;i<length;i++){
          result[i] = data.docs[i].data().name;
        }
        return result;
      })
    );
  }

  getUsersDataByCongregation(congregation:String){
    return this.firestore.collection("User",query => {
      return query.where("congregation","==",congregation);
    }).get().pipe(
      map(data=>{
        let result = [];
        let length = data.docs.length;
        for(let i=0;i<length;i++){
          let _user = data.docs[i].data();
          _user.id = data.docs[i].id;
          result.push(_user);          
        }
        return result;
      })
    );
  }

  getUsersDataById(id){
    return this.firestore.doc("User/"+id).snapshotChanges().pipe(
      map(data=>{
        return data.payload.data();
      })
    );
  }
  
  getAllUsersName(){
    return this.firestore.collection("User").doc("metadata").get().pipe(
      map(data=>{
        return data.data().primary_keys;
      })
    );
  }

  addPersonalShift(name,date,shift_title,site){
    let sMonth = this.datepipe.transform(date, "yyyyMM");
    let days = ["週日","週一","週二","週三","週四","週五","週六"];
    let day = days[(new Date(date)).getDay()];

    let DB = this.firestore.collection("User").doc(sha256(name)).collection("MonthlyData").doc(sMonth);
    DB.get().pipe(
      map(data=>{
        return data.get("personal_shift");
      })
    ).subscribe(response=>{
      if(!response.some(function(a){
        return a.date == this;
      },date)){
        response.push({
          date:date,
          day:day,
          shift_title:shift_title,
          site:site
        });
        response.sort(function(a,b){
          return a.date.localeCompare(b.date);
        });
        DB.set({personal_shift:response});
      }
    });
  }

  deletePersonalShift(name,date){
    let sMonth = this.datepipe.transform(date, "yyyyMM");
    let DB = this.firestore.collection("User").doc(sha256(name)).collection("MonthlyData").doc(sMonth);
    DB.get().pipe(
      map(data=>{
        return data.get("personal_shift");
      })
    ).subscribe(response=>{
      let index = response.findIndex(function(a){
        return a.date == this;
      },date);
      if(index != -1){
        response.splice(index,1);
        DB.set({personal_shift:response});
      }
    });
  }

  getUsersIdCodeMap = () => {
    this.firestore.collection('_KEY_MAPS').doc('_USERS_ID_CODE_MAP').get().subscribe(data => {
      this.users_id_code_map = data.data()['_USERS_ID_CODE_MAP'];
    });
  }

  login(id, password){
    const user = this.users_id_code_map.find(node => node.id === id);
    return this.firestore.collection('User').doc(user.code).get().pipe(
      map(data => {
        if (data.data().password === sha256(password)) {
          this.user.name = data.data().name;
          this.user.congregation = data.data().congregation;
          this.user.authority = data.data().authority;
          this.user$.next(this.user);
          this.mess.next(this.user);
          return true;
        } else {
          return false;
        }
      })
    );
  }


  /* 以下為臨時用 */

  // refreshMetadata(){
  //   let usernames = [];
  //   this.firestore.collection("User").get().subscribe(response=>{
  //     response.docs.forEach(doc=>{
  //       let name = doc.data().id;
  //       if(name){
  //         usernames.push(name);
  //       }
  //     });
  //     this.firestore.collection("User").doc("metadata").set({
  //       primary_keys: usernames
  //     });
  //   });
  // }
  
  addUser(){
    this.firestore.collection("User").doc(sha256("黃柔溦")).set({
      name:"黃柔溦",
      sex:"姊妹",
      position:"---",
      congregation:"安平區南部",
      identity:"傳道員",
      marriage:"獨身",
      email:"do3450503@gm.tut.edu.tw",
      cellphone:"0938-561-758",
      phone:"(06)297-7558",
      address:"台南市永華二街41巷50號7樓之3",
      birth_date:"1995-9-12",
      baptize_date:"2013-12-13",
      language:"中文/閩南語",
      note:"",
      authority:"user",
      password:"fff8c56f0291ea5539fa5dcd185676153700582554d6135d8e00288a9747ebc8"
    });
  }
  
  transUser(){
    this.firestore.collection("User").doc(sha256("吳素碧")).collection("MonthlyData").doc("201910").get().pipe(
      map(data=>{
        return data.data().personal_shift;
      })
    ).subscribe(response=>{
      this.firestore.collection("User").doc(sha256("何素碧")).collection("MonthlyData").doc("201910").set({personal_shift:response});
    });
  }
  
  getAllUser(){
    this.firestore.collection("User").get().pipe(
      map(data=>{
        let result = [];
        let length = data.docs.length;
        for(let i=0;i<length;i++){
          result.push(data.docs[i].data().name);          
        }
        return result;
      })
    ).subscribe(response=>{
      response.sort();
      this.firestore.collection("User").doc("metadata").set({primary_keys:response});
    });
  }
}
