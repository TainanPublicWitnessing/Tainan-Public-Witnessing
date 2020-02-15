import { Injectable } from '@angular/core';

/** firebase */
import { AngularFirestore } from "@angular/fire/firestore";

/** rxjs */
import { BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";

/** structures */
import { AuthorityTable, AuthorityAction } from "../_structure/AuthorityTable.class";

/** services */
import { UserService } from "../_service/user.service";
import { LoginDialogService } from "../login-dialog/login-dialog.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  constructor(
    private angularFirestore: AngularFirestore,
    private userService: UserService,
    private loginDialogService: LoginDialogService
  ){}

  /** variables */
  authority_table = new BehaviorSubject<AuthorityTable>(new AuthorityTable([]));
  current_authoritys = new BehaviorSubject<any>({});

  /** functions */
  loadAuthorityTable(){
    this.angularFirestore.doc("Settings/AuthorityTable").get().pipe(
      map(data=>{
        return data.data().authority_table;
      })
    ).subscribe(data=>{
      this.authority_table.next(new AuthorityTable(data));
    });
  }

  checkAuthority(action: string){
    let authority_table = this.authority_table.getValue().authority_table;
    if(
      !authority_table.find((A: AuthorityAction)=>{
        return A.action == action;
      }).authoritys.includes(this.userService.current_user.getValue().authority)
    ){
      this.loginDialogService.openLoginDialog();
    }
  }
}
