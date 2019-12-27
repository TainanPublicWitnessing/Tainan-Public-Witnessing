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

  openLoginDialog = ()=>{  //has to be arrow function
    this.matDialog.open(LoginDialogComponent,{
      width: "75%",
      height: "275px",
      maxWidth: "512px",
      disableClose: true
    });
  }
}
