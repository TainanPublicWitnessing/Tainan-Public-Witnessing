import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";

import { MatDialog } from "@angular/material/dialog";

import { User } from "../_structure/User.class";
import { UserIdMap } from "../_structure/UserIdMap.class";

import { ToolbarService } from "../toolbar/toolbar.service";
import { SettingsService } from "../_service/settings.service";
import { UserService } from "../_service/user.service"

import { SubmitConfirmDialogComponent } from "../submit-confirm-dialog/submit-confirm-dialog.component";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private matDialog: MatDialog,
    private toolbarService: ToolbarService,
    private settingsService: SettingsService,
    private userService: UserService
  ){}

  /** subscribers */
  private subscribers = {
    //events
    clickSubmitButton: null,
    //variables
    gender: null,
    congregation: null,
    authority: null,
    identity: null,
    position: null,
    marriage: null,
    user_ids: null
  };
  

  ngOnInit(){
    this.toolbarService.title.next("新增使用者");

    this.toolbarService.showSubmitButton.next(true);

    this.subscribers.clickSubmitButton = this.toolbarService.clickSubmitButton.subscribe(data=>{
      this.submitNewUser();
    });

    this.subscribers.gender = this.settingsService.genders.subscribe(data=>{
      this.options.genders = data;
    });

    this.subscribers.congregation = this.settingsService.congregations.subscribe(data=>{
      this.options.congregations = data;
    });

    this.subscribers.authority = this.settingsService.authoritys.subscribe(data=>{
      this.options.authoritys = data;
    });

    this.subscribers.identity = this.settingsService.identitys.subscribe(data=>{
      this.options.identitys = data;
    });

    this.subscribers.position = this.settingsService.positions.subscribe(data=>{
      this.options.positions = data;
    });

    this.subscribers.marriage = this.settingsService.marriages.subscribe(data=>{
      this.options.marriages = data;
    });

    this.subscribers.user_ids = this.userService.id_map.subscribe((data: UserIdMap)=>{
      this.user_ids = data.getUserIds();
    });
  }

  ngOnDestroy(){
    this.toolbarService.showSubmitButton.next(false);
    
    for(let index in this.subscribers){
      this.subscribers[index].unsubscribe();
    }
  }

  /** variables */

  new_user = new User();
  user_ids = [];

  //mat-options
  options = {
    genders: null,
    congregations: null,
    authoritys: null,
    identitys: null,
    positions: null,
    marriages: null
  }

  //validators
  idValidator = (id: FormControl)=>{
    return this.user_ids.includes(id.value) ? {id_exist: {valid:false}} : null ;
  }

  //form control
  new_user_form = this.formBuilder.group({
    name: ["",Validators.required],
    id: ["",[Validators.required,this.idValidator]],
    gender: ["",Validators.required],
    congregation: ["",Validators.required],
    authority: ["",Validators.required],
    baptize_date: ["",Validators.required],   //matDatepickerParse error by date picker
    identity: ["",Validators.required],
    position: ["",Validators.required],
    marriage: ["",Validators.required],

    birth_date: [""],  //matDatepickerParse error by date picker
    address: [""],
    phone: [""],
    cellphone: ["",Validators.pattern(/^09\d{8}$/g)],
    email: ["",Validators.email],
    language: [""],
    note: [""]
  });

  /** events */

  presetID(){
    this.new_user_form.controls.id.setValue(this.new_user_form.controls.name.value);
  }

  submitNewUser(){
    this.new_user_form.markAllAsTouched();

    if(this.new_user_form.status == "VALID"){

      Object.assign(this.new_user,this.new_user_form.value);
      this.new_user.generateCode();
      this.new_user.baptize_date = this.datePipe.transform(this.new_user.baptize_date,"yyyy-MM-dd");
      this.new_user.birth_date = this.datePipe.transform(this.new_user.birth_date,"yyyy-MM-dd");

      this.matDialog.open(SubmitConfirmDialogComponent,{
        data: {
          title: "資料確認",
          message: "",
          fields: this.new_user
        }
      }).afterClosed().subscribe(result=>{
        if(result){
          this.userService.createUser(this.new_user).then(()=>{
            this.new_user_form.reset();
          });
        }
      });
    }
  }
}
