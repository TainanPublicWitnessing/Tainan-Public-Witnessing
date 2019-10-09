import { Injectable } from '@angular/core';
import {map} from "rxjs/operators"; 

import {AngularFirestore} from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  //獲取擺攤地點 site
  getSites():Observable<any>{
    return this.firestore.collection("Settings").doc("Sites").get().pipe(
      map(data=>{
        return data.data().sites;
      })
    )      
  }
}
