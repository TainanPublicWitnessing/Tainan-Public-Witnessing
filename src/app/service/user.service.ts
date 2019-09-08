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
}
