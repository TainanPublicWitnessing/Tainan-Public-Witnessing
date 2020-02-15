import { Injectable } from '@angular/core';

/** angular material */
import { MatDialog } from "@angular/material/dialog";

/** components */
import { LoginDialogComponent } from "./login-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class LoginDialogService {

  constructor(
    private matDialog: MatDialog
  ){}

  /** variables */
  login_dialog_exist: boolean = false; //make sure login dialog only exist one

  openLoginDialog = ()=>{  //has to be arrow function
    if(!this.login_dialog_exist){
      this.login_dialog_exist = true;
      this.matDialog.open(LoginDialogComponent,{
        width: "75%",
        height: "275px",
        maxWidth: "512px",
        disableClose: true
      }).afterClosed().subscribe(()=>{
        this.login_dialog_exist = false;
      });
    }
  }
}
