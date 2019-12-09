import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from "../_structure/user.class";
import { ToolbarService } from "../toolbar/toolbar.service";
import { SettingsService } from "../_service/settings.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private toolbarService: ToolbarService,
    private settingsService: SettingsService
  ){}

  /** subscribers */
  private subscribers = {
    clickSubmitButton: null,
    gender: null,
    congregation: null,
    authority: null,
    identity: null,
    position: null,
    marriage: null
  };
  

  ngOnInit(){
    this.toolbarService.title.next("新增使用者");

    this.toolbarService.showSubmitButton.next(true);

    this.subscribers.clickSubmitButton = this.toolbarService.clickSubmitButton.subscribe(data=>{
      console.log(this.new_user_form);
    });

    this.subscribers.gender = this.settingsService.genders.subscribe(data=>{
      this.genders = data;
    });

    this.subscribers.congregation = this.settingsService.congregations.subscribe(data=>{
      this.congregations = data;
    });

    this.subscribers.authority = this.settingsService.authoritys.subscribe(data=>{
      this.authoritys = data;
    });

    this.subscribers.identity = this.settingsService.identitys.subscribe(data=>{
      this.identitys = data;
    });

    this.subscribers.position = this.settingsService.positions.subscribe(data=>{
      this.positions = data;
    });

    this.subscribers.marriage = this.settingsService.marriages.subscribe(data=>{
      this.marriages = data;
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

  //for mat-options
  genders;
  congregations;
  authoritys;
  identitys;
  positions;
  marriages;

  //form control
  new_user_form = this.formBuilder.group({
    name: ["",Validators.required],
    id: ["",Validators.required],
    gender: ["",Validators.required],
    congregation: ["",Validators.required],
    authority: ["",Validators.required],
    baptize_date: ["",Validators.required],
    identity: ["",Validators.required],
    position: ["",Validators.required],
    marriage: ["",Validators.required],

    birth_date: [""],
    address: [""],
    phone: [""],
    cellphone: [""],
    email: [""],
    language: [""],
    note: [""]
  });

  /** functions */

  submitNewUser(){

  }
}
