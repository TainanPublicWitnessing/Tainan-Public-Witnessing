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
import { User } from "src/app/_structures/User.class"
import { UserIdCodeMap, UserIdCodeMapNode } from "src/app/_structures/UserIdCodeMap.class";

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

  users_id_code_map$ = new BehaviorSubject<UserIdCodeMap>(new UserIdCodeMap([]));
  current_user$ = new BehaviorSubject<User>(new User);

  /** functions */

  //load user id map from server
  loadUserIdCodeMap(){
    this.angularFirestore.doc("_KEY_MAPS/_USERS_ID_CODE_MAP").get().pipe(
      map(data=>{
        return data.data()._USERS_ID_CODE_MAP;
      })
    ).subscribe(data=>{
      this.users_id_code_map$.next(new UserIdCodeMap(data));  //update user id map
    });
  }

  //add new user id to user id map, and upload to server
  private addUserIdCodeMap(node: UserIdCodeMapNode): Promise<void>{
    return this.angularFirestore.doc("_KEY_MAPS/_USERS_ID_CODE_MAP").update({
      _USERS_ID_CODE_MAP: firestore.FieldValue.arrayUnion(Object.assign({},node))
    });
  }

  createUser(user:User): Promise<void>{
    return this.addUserIdCodeMap(new UserIdCodeMapNode(user.code,user.id)).then(()=>{
      this.angularFirestore.collection("User").doc(user.code).set(Object.assign({},user));  //can't use custom object, have to assign to a new empty object
    }).then(()=>{
      this.angularFireAuth.auth.createUserWithEmailAndPassword(
        user.getFirebaseAuthEmail(),  //user id + @Tainan.Public.Witnessing
        this.datePipe.transform(user.baptize_date,"yyyyMMdd")  //password default as baptize date
      );
    }).then(()=>{
      this.angularFireAuth.auth.signOut();  //will auto signin after create, have to deal with it later
    });
  }

  login(user_id: string,password: string): Promise<boolean>{
    let code = this.users_id_code_map$.getValue().getUserCodeById(user_id);
    return this.angularFireAuth.auth.signInWithEmailAndPassword(User.transformToFirebaseAuthEmail(code),password).then(()=>{
      this.angularFirestore.doc("User/" + code).get().pipe(
        map(data=>{
          return data.data();
        })
      ).subscribe(data=>{
        this.current_user$.next(Object.assign(new User,data));
      });
      return true;
    }).catch(()=>{
      return false;
    });
  }

  logout(): Promise<void>{
    this.current_user$.next(new User);
    return this.angularFireAuth.auth.signOut();
  }

  /** from old DB */
  getUsersAsCSV(): Promise<string>{
    let result: string = "address,authority,baptize_date,birth_date,cellphone,congregation,email,identity,language,marriage,name,note,password,phone,position,sex\n";
    return this.angularFirestore.collection("User").get().toPromise().then(response=>{
      response.docs.sort((a,b)=>{
        let aname = a.data().name;
        let bname = b.data().name;
        if(!aname || !bname){
          console.log(a.data(), b.data);
          return true;
        } 
        return aname.localeCompare(bname);
        // return a.data().name.localeCompare(b.data().name);
      }).forEach(doc=>{
        const data = doc.data();
        result = result.concat(
          data.address, ",",
          data.authority, ",",
          data.baptize_date, ",",
          data.birth_date, ",",
          data.cellphone, ",",
          data.congregation, ",",
          data.email, ",",
          data.identity, ",",
          data.language, ",",
          data.marriage, ",",
          data.name, ",",
          data.note, ",",
          data.password, ",",
          data.phone, ",",
          data.position, ",",
          data.sex, "\n"
        );
      });
      return result;
    });
  }

  transUsers(){
    return this.angularFirestore.collection("User").get().toPromise().then(response=>{
      response.forEach(doc=>{
        const data = doc.data();
        if(data.name){
          this.angularFireAuth.auth.createUserWithEmailAndPassword(
            User.transformToFirebaseAuthEmail(doc.id),
            data.password
          ).then(()=>{
            console.log(data.name)
          })
        }
      });
    })
    // return this.angularFirestore.collection("User").get().toPromise().then(response=>{
    //   response.forEach(doc=>{
    //     const data = doc.data();
    //     if(data.name){
    //       this.angularFirestore.doc("User/" + doc.id).update({  //update and set
    //         code: doc.id,
    //         id: data.name
    //       }).then(()=>{
    //         return this.angularFirestore.doc("_KEY_MAPS/_USERS_ID_CODE_MAP").update({
    //           _USERS_ID_CODE_MAP: firestore.FieldValue.arrayUnion({
    //             code: doc.id,
    //             id: data.name
    //           })
    //         });
    //       }).then(()=>{
    //         console.log(data.name);
    //       })
    //     }
    //   });
    // })
  }

  /** temp */
  showCurrentUser(){
    console.log(this.current_user$.getValue());
    console.log(this.angularFireAuth.auth.currentUser);
  }
}
