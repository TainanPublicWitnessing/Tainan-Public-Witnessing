import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

/** rxjs */
import { Subscription } from "rxjs";

/** angular material */
import { MatDialogRef } from "@angular/material/dialog";

/** serveices */
import { UserService } from "../_service/user.service";

/** structures */
import { UserIdMap } from "../_structure/UserIdMap.class";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ){}

  /** subscriptions */
  private subscriptions = {
    user_ids: null as Subscription,
    user_ids_options: null as Subscription
  }

  ngOnInit(){
    
    /** subscribe data */
    this.subscriptions.user_ids = this.userService.id_map.subscribe((data: UserIdMap)=>{
      this.user_ids = data.getUserIds();
    });

    /** subscribe events */
    this.subscriptions.user_ids_options = this.login_form.controls.id.valueChanges.subscribe(data=>{
      this.options.user_ids = this.user_ids.filter(id=>id.includes(data));
    });
  }

  ngOnDestroy(){
    /** unsubscribe */
    for(let index in this.subscriptions){
      this.subscriptions[index].unsubscribe();
    }
  }

  /** mat ooptions */
  options = {
    user_ids: []
  }

  /** variables */
  user_ids = [];

  /** validators */
  idValidator = (id: FormControl)=>{
    return this.user_ids.includes(id.value) ? null : {id_not_exist: {valid:false}} ;
  }

  /** form controls */
  login_form = this.formBuilder.group({
    id: ["",[Validators.required, this.idValidator]],
    password: ["",Validators.required]
  });

  /** functions */

  cancel(){
    this.dialogRef.close();
  }

  confirm(){
    this.dialogRef.close();
  }
}
