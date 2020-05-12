import { Injectable } from '@angular/core';

/** rxjs */
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map, } from "rxjs/operators";

/** firebase */
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class SettingsService{

  constructor(
    private angularFirestore: AngularFirestore
  ){}

  /** variables */

  congregations$ = new BehaviorSubject(null);
  sites$ = new BehaviorSubject(null)
  shiftTitle$ = new BehaviorSubject(null);

  authoritys$ = new Observable(observer=>{
    observer.next(["administrator", "manager", "user"]);
    observer.complete();
  });

  genders$ = new Observable(observer=>{
    observer.next(["弟兄","姐妹"]);
    observer.complete();
  });

  identitys$ = new Observable(observer=>{
    observer.next(["傳道員","正規先驅","特別先驅"]);
    observer.complete();
  });

  positions$ = new Observable(observer=>{
    observer.next(["---","助理僕人","長老"]);
    observer.complete();
  });

  marriages$ = new Observable(observer=>{
    observer.next(["獨身","已婚","離婚"]);
    observer.complete();
  });

  /** functions */
  waitAllSetting(){
    console.log("test");
    forkJoin(this.congregations$, this.sites$, this.shiftTitle$).subscribe(res=>{
      console.log(res);
    })

    this.congregations$.subscribe(res=>{
      console.log(res);
    })

    this.sites$.subscribe(res=>{
      console.log(res);
    })
  }

  //load congregation list from server
  loadCongregations(){
    this.angularFirestore.collection("Settings").doc("Cangregations").get().pipe(
      map(data=>{
        return data.data().congregations;
      })
    ).subscribe(data=>{
      this.congregations$.next(data.sort((A: string, B: string)=>{
        return A.localeCompare(B);
      }));
    });
  }

  loadSites(){
    this.angularFirestore.collection("Settings").doc("Sites").get().pipe(
      map(data=>{
        return data.data().sites;
      })
    ).subscribe(data=>{
      this.sites$.next(data.sort((A: string, B: string)=>{
        return A.localeCompare(B);
      }))
    })
  }

  loadShiftTitle(){
    this.angularFirestore.collection("Settings").doc("ShiftTitle").get().pipe(
      map(data=>{
        return data.data().shift_title;
      })
    ).subscribe(data=>{
      this.shiftTitle$.next(data);
    })
  }
}
