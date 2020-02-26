import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";
import { Subscription } from "rxjs";

/** angular materials */
import { MatDialog } from "@angular/material/dialog";

/** structures */
import { User } from "src/app/_structures/User.class";
import { UserIdMap } from "src/app/_structures/UserIdMap.class";

/** services */
import { ToolbarService } from "src/app/toolbar/toolbar.service";
import { SettingsService } from "src/app/_services/settings.service";
import { UserService } from "src/app/_services/user.service";
import { AuthorityService } from "src/app/_services/authority.service";
import { LoginDialogService } from "src/app/_elements/dialogs/login-dialog/login-dialog.service";

/** components */
import { SubmitConfirmDialogComponent, ConfirmDialogData } from "src/app/_elements/dialogs/submit-confirm-dialog/submit-confirm-dialog.component";

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
    private userService: UserService,
    private authorityService: AuthorityService,
    private loginDialogService: LoginDialogService
  ){}

  /** authoritys */
  authoritys = null;

  /** subscriptions */
  private subscriptions = {
    /** authoritys */
    authoritys: null as Subscription,

    /** events */
    clickSubmitButton: null as Subscription,

    /** data */
    gender: null as Subscription,
    congregation: null as Subscription,
    authority: null as Subscription,
    identity: null as Subscription,
    position: null as Subscription,
    marriage: null as Subscription,
    user_ids: null as Subscription
  };
  

  ngOnInit(){
    /** initialize */

    this.toolbarService.title.next("新增使用者");  //set page title
    this.toolbarService.showSubmitButton.next(true);  //show submit button

    /** subscribe authoritys */
    this.subscriptions.authoritys = this.authorityService.current_authoritys.subscribe(data=>{
      if(!data.new_user){
        this.loginDialogService.openLoginDialog();
      }
      this.authoritys = data;
    })

    /** subscribe events */

    //start submit new user process by clicking submit button
    this.subscriptions.clickSubmitButton = this.toolbarService.clickSubmitButton.subscribe(data=>{
      this.submitNewUser();
    });

    /** subscribe data */

    this.subscriptions.gender = this.settingsService.genders.subscribe(data=>{
      this.options.genders = data;
    });

    this.subscriptions.congregation = this.settingsService.congregations.subscribe(data=>{
      this.options.congregations = data;
    });

    this.subscriptions.authority = this.settingsService.authoritys.subscribe(data=>{
      this.options.authoritys = data;
    });

    this.subscriptions.identity = this.settingsService.identitys.subscribe(data=>{
      this.options.identitys = data;
    });

    this.subscriptions.position = this.settingsService.positions.subscribe(data=>{
      this.options.positions = data;
    });

    this.subscriptions.marriage = this.settingsService.marriages.subscribe(data=>{
      this.options.marriages = data;
    });

    //get user id list
    this.subscriptions.user_ids = this.userService.id_map.subscribe((data: UserIdMap)=>{
      this.user_ids = data.getUserIds();
    });
  }

  ngOnDestroy(){
    this.toolbarService.showSubmitButton.next(false);  //hide submit button
    
    /** unsubscribe */
    for(let index in this.subscriptions){
      this.subscriptions[index].unsubscribe();
    }
  }

  /** variables */

  new_user = new User();
  user_ids = [];

  /** mat-options */
  options = {
    genders: null,
    congregations: null,
    authoritys: null,
    identitys: null,
    positions: null,
    marriages: null
  }

  /** validators */
  //check if user id exist or not, id has to be unique
  idValidator = (id: FormControl)=>{
    return this.user_ids.includes(id.value) ? {id_exist: {valid:false}} : null ;
  }

  /** form control */
  new_user_form = this.formBuilder.group({
    name: ["",Validators.required],
    id: ["",[Validators.required,this.idValidator]],
    gender: ["",Validators.required],
    congregation: ["",Validators.required],
    authority: ["",Validators.required],
    baptize_date: ["",Validators.required],   //if format is wrong, launch matDatepickerParse error by date picker
    identity: ["",Validators.required],
    position: ["",Validators.required],
    marriage: ["",Validators.required],

    birth_date: [""],  //if format is wrong, launch matDatepickerParse error by date picker
    address: [""],
    phone: [""],
    cellphone: ["",Validators.pattern(/^09\d{8}$/g)],
    email: ["",Validators.email],
    language: [""],
    note: [""]
  });

  /** events */

  //set user name to user id as default, when user name is changed
  presetID(){
    this.new_user_form.controls.id.setValue(this.new_user_form.controls.name.value);
  }

  submitNewUser(){
    this.new_user_form.markAllAsTouched();  //trigger fields that required but not touched yet

    if(this.new_user_form.status == "VALID"){

      /** set user object by form input */
      Object.assign(this.new_user,this.new_user_form.value);  //copy values
      this.new_user.generateCode();  //generate random sha256 user code
      this.new_user.baptize_date = this.datePipe.transform(this.new_user.baptize_date,"yyyy-MM-dd");
      this.new_user.birth_date = this.datePipe.transform(this.new_user.birth_date,"yyyy-MM-dd");

      /** open confirm dialog */
      this.matDialog.open(SubmitConfirmDialogComponent,{
        data: new ConfirmDialogData("資料確認","",this.new_user)
      }).afterClosed().subscribe(result=>{
        if(result){  //true if confirmed, false if canceled
          this.userService.createUser(this.new_user).then(()=>{
            this.new_user_form.reset();  //clear form for next new user
          });
        }
      });
    }
  }
}
