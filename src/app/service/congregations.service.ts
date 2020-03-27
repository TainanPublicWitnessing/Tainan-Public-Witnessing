import {Injectable} from "@angular/core";
import {Observable,pipe} from "rxjs";
import {map} from "rxjs/operators";

import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn:"root"
})
export class CongregationsService{

  constructor(
    private firestore:AngularFirestore
  ){}
  
  /* variables */
  
  public congregations:Array<any>;
  
  /* requests */
  
  getCongregations(){
    this.firestore.collection("Settings").doc("Cangregations").get().pipe(
      map(data=>{
        return data.data().congregations;
      })
    ).subscribe(response=>{
      this.congregations = response;
    });
  }
}
