import { Component, OnInit, OnDestroy } from '@angular/core';

/** rxjs */
import { Subscription } from "rxjs";

/** services */
import { ToolbarService } from "../toolbar/toolbar.service";
import { LoginDialogService } from "../login-dialog/login-dialog.service";
import { UserService } from "../_service/user.service";
import { AuthorityService } from "../_service/authority.service";

/** structures */
import { SubscribeManager } from "../_structure/SubscribeManager.class";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends SubscribeManager implements OnInit, OnDestroy {

  constructor(
    private toolbarService: ToolbarService,
    private loginDialogService: LoginDialogService,
    private userService: UserService,
    private authorityService: AuthorityService
  ){
    super();
  }

  /** authoritys */
  authoritys = null;

  ngOnInit(){
    this.toolbarService.title.next("首頁");
    
    /** subscribe authoritys */
    this.authorityService.current_authoritys.subscribe(data=>{
      if(!data.home){
        this.loginDialogService.openLoginDialog();
      }
      this.authoritys = data;
    });
  }

  ngOnDestroy(){}

  /** temp */

  current_user(){
    this.userService.showCurrentUser();
  }

  authority_table(){
    console.log(this.authorityService.authority_table.getValue());
  }
}
