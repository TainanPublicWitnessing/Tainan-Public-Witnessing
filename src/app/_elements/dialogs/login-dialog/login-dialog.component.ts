import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

/** angular material */
import { MatDialogRef, MatDialog } from "@angular/material/dialog";

/** serveices */
import { UserService } from "src/app/_services/user.service";

/** structures */
import { UserIdMap } from "src/app/_structures/UserIdMap.class";

/** managers */
import { SubscribeManager } from "src/app/_managers/SubscribeManager.class";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, OnDestroy {

  constructor(
    private matDialogRef: MatDialogRef<LoginDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ){}

  /** managers */
  subscribe_manager: SubscribeManager = new SubscribeManager();

  /** variables */
  user_ids = [];  //all user id list
  options = {  //for mat options
    user_ids: []
  }

  /** validators */
  idValidator = (id: FormControl)=>{
    return ( this.user_ids.includes(id.value) || id.value == "" ) ? null : {id_not_exist: {valid:false}} ;
  }

  /** form controls */
  login_form = this.formBuilder.group({
    id: ["",[Validators.required, this.idValidator]],
    password: ["",Validators.required]
  });

  /** angular life cycle */

  ngOnInit(){

    this.subscribe_manager.pushSubscriptions(

      this.userService.id_map.subscribe((data: UserIdMap)=>{
        this.user_ids = data.getUserIds();
      }),

      this.login_form.controls.id.valueChanges.subscribe(data=>{
        this.options.user_ids = this.user_ids.filter(id=>id.includes(data));
      })

    );
  }

  ngOnDestroy(){
    /** unsubscribe */
    this.subscribe_manager.unsubscribeAll();
  }

  /** functions */

  cancel(){
    this.matDialogRef.close(false);
  }

  confirm(){  //not check valid!!!!!!!!
    this.userService.login(this.login_form.value.id, this.login_form.value.password).then(result=>{
      if(result){
        this.matDialogRef.close(true);
      }else{
        this.login_form.controls.password.setErrors({password_error: true});
      }
    });
  }
}
