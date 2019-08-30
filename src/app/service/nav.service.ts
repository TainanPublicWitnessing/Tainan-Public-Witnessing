import {Injectable} from "@angular/core";
import {Observable, pipe, of} from "rxjs";
import {map} from "rxjs/operators"; 

import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class NavService {

  constructor(
    private firestore: AngularFirestore
  ){}
  
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "List",
      url: "/list",
      icon: "list"
    }
  ];
  
  /* variables */
  
  nav_links:Array<any>;
  
  current_page:String;
  
  /* requests */
  
  getNavLinkByAuthority(authority){
    return this.firestore.collection("NavLinks",query=>{
      return query.orderBy("order");
    }).get().pipe(
      map(data=>{
        let result = [];
        let length = data.docs.length;
        for(let i=0;i<length;i++){
          if(data.docs[i].data().authority.split("|").includes(authority)){
            result.push(data.docs[i].data());
          }
        }
        return result;
      })
    ).subscribe(response=>{
      this.nav_links = response;
    });;
  }
}
