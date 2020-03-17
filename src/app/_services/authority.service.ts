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
  current_authoritys$ = new BehaviorSubject<any>({});
  authority_table$ = new BehaviorSubject<AuthorityTable>(new AuthorityTable([
    { action: "/new_user", authoritys: [ "administrator" ] },
    { action: "/user_management", authoritys: [ "administrator" ] },
    { action: "/api", authoritys: [ "administrator" ] },
    { action: "/line", authoritys: [ "administrator", "manager", "user" ] },
    { action: "login", authoritys: [ "" ] },
    { action: "logout", authoritys: [ "administrator", "manager", "user" ] }
  ]));
  

  /** functions */

  refreshCurrentAuthoritys(current_authority: string){
    this.current_authoritys$.next(
      this.authority_table$.getValue().getAuthoritys(current_authority)
    );
  }

  checkAuthority(action: string): boolean{
    return this.current_authoritys$.getValue()[action];
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
