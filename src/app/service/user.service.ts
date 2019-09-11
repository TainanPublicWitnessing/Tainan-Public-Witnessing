import {Injectable} from "@angular/core";
import {Observable,pipe} from "rxjs";
import {map} from "rxjs/operators"; 

import {AngularFirestore} from "@angular/fire/firestore";

import {sha256} from "js-sha256/src/sha256.js";
import {User} from "../structures/User";

@Injectable({
  providedIn:"root"
})
export class UserService{

  constructor(
    private firestore:AngularFirestore
  ){}
  
  /* variables */
  
  user:User = new User();
  
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
  
  login(id,password){
    return this.firestore.collection("User").doc(sha256(id)).get().pipe(
      map(data=>{
        if(data.data().password == sha256(password)){
          this.user.name = data.data().name;
          this.user.congregation = data.data().congregation;
          this.user.authority = data.data().authority;
          return true;
        }else{
          return false;
        }
      })
    );
  }
  
  /* 以下為臨時用 */
  
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
      console.log(response);
      this.firestore.collection("User").doc(sha256("何素碧")).collection("MonthlyData").doc("201910").set({personal_shift:response});
    });
  }
}
