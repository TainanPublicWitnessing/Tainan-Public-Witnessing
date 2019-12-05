import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';

import { User } from "../_structure/user.class";
import { ToolbarService } from "../toolbar/toolbar.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toolbarService: ToolbarService
  ){}

  /** subscribers */

  private clickSubmitButton;

  ngOnInit(){
    this.toolbarService.title.next("新增使用者");

    this.toolbarService.showSubmitButton.next(true);

    this.clickSubmitButton = this.toolbarService.clickSubmitButton.subscribe(next=>{
      console.log("newuser");
    });
  }

  ngOnDestroy(){
    this.toolbarService.showSubmitButton.next(false);
    this.clickSubmitButton.unsubscribe();
  }

  /** variables */

  new_user = new User();

  new_user_form = this.formBuilder.group({
    id: ["",Validators.required],
    authority: ["",Validators.required],
    address: [""],
    baptize_date: ["",Validators.required],
    birth_date: [""],
    cellphone: [""],
    congregation: ["",Validators.required],
    email: [""],
    identity: ["",Validators.required],
    language: [""],
    marriage: [""],
    name: ["",Validators.required],
    note: [""],
    phone: [""],
    position: ["",Validators.required],
    sex: ["",Validators.required]
  });

}
