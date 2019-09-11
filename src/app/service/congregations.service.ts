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
    this.firestore.collection("Congregations",query=>{
      return query.orderBy("name");
    }).get().pipe(
      map(data=>{
        let result = [];
        let length = data.docs.length;
        for(let i=0;i<length;i++){
          result[i] = data.docs[i].data();
        }
        return result;
      })
    ).subscribe(response=>{
      this.congregations = response;
    });
  }
}
