import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

/** rxjs */
import { Subscription } from "rxjs";

/** angular material */
import { MatDialogRef } from "@angular/material/dialog";

/** serveices */
import { UserService } from "src/app/_services/user.service";

/** structures */
import { UserIdMap } from "src/app/_structures/UserIdMap.class";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
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
    return ( this.user_ids.includes(id.value) || id.value == "" ) ? null : {id_not_exist: {valid:false}} ;
  }

  passwordValidator = ()=>{
    return {password_error: {valid:false}} ;
  }

  /** form controls */
  login_form = this.formBuilder.group({
    id: ["",[Validators.required, this.idValidator]],
    password: ["",Validators.required]
  });

  /** functions */

  cancel(){
    this.router.navigateByUrl("home");
    this.dialogRef.close();
  }

  confirm(){  //not check valid!!!!!!!!
    this.userService.login(this.login_form.value.id,this.login_form.value.password).then(result=>{
      if(result){
        this.dialogRef.close();
      }else{
        this.login_form.controls.password.setValidators(this.passwordValidator);
        this.login_form.controls.password.updateValueAndValidity();
      }
    });
    
  }
}
