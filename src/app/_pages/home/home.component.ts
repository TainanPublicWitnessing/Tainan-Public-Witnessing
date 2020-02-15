import { Component, OnInit, OnDestroy } from '@angular/core';

/** rxjs */
import { Subscription } from "rxjs";

/** services */
import { ToolbarService } from "src/app/toolbar/toolbar.service";
import { LoginDialogService } from "src/app/_elements/dialogs/login-dialog/login-dialog.service";
import { UserService } from "src/app/_services/user.service";
import { AuthorityService } from "src/app/_services/authority.service";

/** structures */
import { SubscribeManager } from "src/app/_managers/SubscribeManager.class";

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
