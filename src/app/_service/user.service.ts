import { Injectable } from '@angular/core';
import { DatePipe } from "@angular/common";

/** rxjs */
import { BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";

/** firebase */
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { firestore } from "firebase/app";

/** structures */
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

  id_map = new BehaviorSubject<UserIdMap>(new UserIdMap([]));
  current_user = new BehaviorSubject<User>(new User);

  /** functions */

  //load user id map from server
  loadUserIdMap(){
    this.angularFirestore.doc("DEV/DEV/Users/_IdMap").get().pipe(
      map(data=>{
        return data.data().id_map;
      })
    ).subscribe(data=>{
      this.id_map.next(new UserIdMap(data));  //update user id map
    });
  }

  //add new user id to user id map, and upload to server
  private addUserIdMap(node: UserIdMapNode): Promise<void>{
    return this.angularFirestore.doc("DEV/DEV/Users/_IdMap").update({
      id_map: firestore.FieldValue.arrayUnion(Object.assign({},node))
    });
  }

  createUser(user:User): Promise<void>{  //promiseis for synchronize
    return this.addUserIdMap(new UserIdMapNode(user.code,user.id)).then(()=>{  //write in user id map
      //can't use custom object, have to assign to a new empty object
      return this.angularFirestore.collection("DEV/DEV/Users").doc(user.code).set(Object.assign({},user));  //write in user data
    }).then(()=>{
      return this.angularFireAuth.auth.createUserWithEmailAndPassword(  //create firebase auth user
        user.getFirebaseAuthEmail(),  //user id + @Tainan.Public.Witnessing
        this.datePipe.transform(user.baptize_date,"yyyyMMdd")  //password default as baptize date
      );
    }).then(()=>{
      //will auto signin after create, have to deal with it later
      return this.angularFireAuth.auth.signOut();
    });
  }
}
