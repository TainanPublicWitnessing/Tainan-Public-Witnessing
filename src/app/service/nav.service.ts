import {Injectable} from "@angular/core";
import {Observable, pipe, of} from "rxjs";
import {map} from "rxjs/operators"; 

import {AngularFirestore} from "@angular/fire/firestore";

import {sha256} from "js-sha256/src/sha256.js";

@Injectable({
  providedIn: "root"
})
export class NavService{

  constructor(
    private firestore:AngularFirestore
  ){}
  
  /* variables */
  
  nav_links:Array<any>;
  
  /* requests */
  
  getNavLinkByAuthority(authority){
    return this.firestore.collection("NavLinks",query=>{
      return query.orderBy("order");
    }).get().pipe(
      map(data=>{
        let result = [];
        let length = data.docs.length;
        for(let i=0;i<length;i++){
          console.log(data.docs[i].data().name);
          if(data.docs[i].data().authority.split("|").includes(authority)){
            result.push(data.docs[i].data());
          }
        }
        return result;
      })
    ).subscribe(response=>{
      this.nav_links = response;
    });
  }
}
