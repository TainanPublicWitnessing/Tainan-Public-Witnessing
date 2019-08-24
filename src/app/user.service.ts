import {Injectable} from "@angular/core";
import {Observable,pipe} from "rxjs";
import {map} from "rxjs/operators"; 

import {AngularFirestore} from "@angular/fire/firestore";

import {sha256} from "js-sha256/src/sha256.js";
import {User} from "./User";

@Injectable({
  providedIn: "root"
})
export class UserService{

  constructor(
    private firestore: AngularFirestore
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
          result[i] = data.docs[i].data();
        }
        return result;
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
  
  logout(){
    this.user = new User();
  }
  
  //匯入使用者資料
  importData(){
    let collect = this.firestore.collection("User");
    
    let bigstrings = "";

    let midstrings = bigstrings.split("|");
    let smallstrings = [];
    let data = [];
    
    let length = midstrings.length;
    for(let i=0;i<length;i++){
      smallstrings[i] = midstrings[i].split(",");
      let l = smallstrings.length;
      for(let j=0;j<l;j++){
        if(smallstrings[i] == undefined) smallstrings[i] = "";
      }
      data[i] = {
        name:smallstrings[i][0],
        sex:smallstrings[i][1],
        position:smallstrings[i][2],
        congregation:smallstrings[i][3],
        identity:smallstrings[i][4],
        marriage:smallstrings[i][5],
        email:smallstrings[i][6],
        cellphone:smallstrings[i][7],
        phone:smallstrings[i][8],
        address:smallstrings[i][9],
        birth_date:smallstrings[i][10],
        baptize_date:smallstrings[i][11],
        language:smallstrings[i][12],
        note:smallstrings[i][13],
        authority:smallstrings[i][14],
        password:smallstrings[i][15]
      };
    }
    for(let i=0;i<length;i++){
      collect.doc(sha256(data[i].name)).set(data[i]);
    }
  }
}
