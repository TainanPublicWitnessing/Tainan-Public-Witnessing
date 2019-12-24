import { Injectable } from '@angular/core';
import { DatePipe } from "@angular/common";

import { BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";

import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { firestore } from "firebase/app";

import { User } from "../_structure/User.class"
import { UserIdMap, UserIdMapNode } from "../_structure/UserIdMap.class";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private datePipe: DatePipe
  ){}

  /* variables */

  public id_map = new BehaviorSubject<UserIdMap>(new UserIdMap([]));
  public current_user = new BehaviorSubject<User>(new User);

  /** functions */

  public loadUserIdMap(){
    this.angularFirestore.doc("DEV/DEV/Users/_IdMap").get().pipe(
      map(data=>{
        return data.data().id_map;
      })
    ).subscribe(data=>{
      this.id_map.next(new UserIdMap(data));
    });
  }

  private addUserIdMap(node: UserIdMapNode){
    return this.angularFirestore.doc("DEV/DEV/Users/_IdMap").update({
      id_map: firestore.FieldValue.arrayUnion(Object.assign({},node))
    });
  }

  public createUser(user:User){
    return this.addUserIdMap(new UserIdMapNode(user.code,user.id)).then(()=>{
      return this.angularFirestore.collection("DEV/DEV/Users").doc(user.code).set(Object.assign({},user));
    }).then(()=>{
      return this.angularFireAuth.auth.createUserWithEmailAndPassword(
        user.getFirebaseAuthEmail(),
        this.datePipe.transform(user.baptize_date,"yyyyMMdd")
      );
    }).then(()=>{
      return this.angularFireAuth.auth.signOut();
    });
  }
}
