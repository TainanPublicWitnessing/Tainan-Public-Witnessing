import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

/** angular material */
import { MatDialog } from "@angular/material/dialog";

/** firebase */
import { AngularFirestore } from "@angular/fire/firestore";

/** rxjs */
import { BehaviorSubject } from 'rxjs';

/** structures */
import { AuthorityTable, AuthorityAction } from "src/app/_structures/AuthorityTable.class";

/** services */
import { UserService } from "src/app/_services/user.service";
import { LoginDialogService } from "src/app/_elements/dialogs/login-dialog/login-dialog.service";

/** components */
import { LoginDialogComponent } from "src/app/_elements/dialogs/login-dialog/login-dialog.component";


@Injectable({
  providedIn: 'root'
})
export class AuthorityService implements CanActivate{

  constructor(
    private angularFirestore: AngularFirestore,
    private userService: UserService,
    private matDialog: MatDialog,
    private router: Router,
    private loginDialogService: LoginDialogService
  ){}

  /** variables */
  authority_table = new BehaviorSubject<AuthorityTable>(new AuthorityTable([]));
  current_authoritys = new BehaviorSubject<any>({});

  /** functions */
  loadAuthorityTable(){
    this.angularFirestore.doc("Settings/AuthorityTable").get().subscribe(data=>{
      this.authority_table.next(new AuthorityTable(data.data().authority_table));
    });
  }

  checkAuthority(action: string): boolean{
    console.log(this.authority_table.getValue().authority_table);
    console.log(this.authority_table.getValue().authority_table.find((A: AuthorityAction)=>{
      return A.action == action;
    }));
    console.log(this.userService.current_user.getValue().authority);
    return this.authority_table.getValue().authority_table.find((A: AuthorityAction)=>{
      return A.action == action;
    })?.authoritys.includes(this.userService.current_user.getValue().authority);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.checkAuthority(state.url)){
      return true;
    }else{
      this.matDialog.open(LoginDialogComponent,{
        width: "75%",
        height: "auto",
        maxWidth: "512px",
        disableClose: true
      }).afterClosed().subscribe(result=>{
        if(result){
          this.router.navigateByUrl(state.url);
        }else{
          this.router.navigateByUrl("home");
        }
      });
      return false;
    }
  }
}
