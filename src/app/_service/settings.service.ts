import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";

import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class SettingsService{

  constructor(
    private angularFirestore: AngularFirestore
  ){}

  /** variables */

  congregations = new BehaviorSubject([]);
  authoritys = new BehaviorSubject({});

  genders = new Observable(observer=>{
    observer.next(["弟兄","姐妹"]);
    observer.complete();
  });

  identitys = new Observable(observer=>{
    observer.next(["傳道員","正規先驅"]);
    observer.complete();
  });

  positions = new Observable(observer=>{
    observer.next(["---","助理僕人","長老"]);
    observer.complete();
  });

  marriages = new Observable(observer=>{
    observer.next(["獨身","已婚","離婚"]);
    observer.complete();
  });

  /** functions */

  loadCongregations(){
    this.angularFirestore.collection("Settings").doc("Cangregations").get().pipe(
      map(data=>{
        return data.data().congregations;
      })
    ).subscribe(response=>{
        this.congregations.next(response);
    });
  }

  loadAuthoritys(){
    this.angularFirestore.collection("Settings").doc("Authoritys").get().pipe(
      map(data=>{
        return data.data();
      })
    ).subscribe(response=>{
        this.authoritys.next(response);
    });
  }
}
