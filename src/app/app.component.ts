import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs";


/** services */
import { ToolbarService } from "src/app/toolbar/toolbar.service";
import { SidenavService } from "src/app/sidenav/sidenav.service";
import { SettingsService } from "src/app/_services/settings.service";
import { UserService } from "src/app/_services/user.service";
import { AuthorityService } from "src/app/_services/authority.service";
import { LoginDialogService } from "src/app/_elements/dialogs/login-dialog/login-dialog.service";

/** structures */
import { SubscribeManager } from "src/app/_managers/SubscribeManager.class";

/** components */
import { LoginDialogComponent } from "src/app/_elements/dialogs/login-dialog/login-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private toolbarService: ToolbarService,
    private sidenavService: SidenavService,
    private settingsService: SettingsService,
    private userService: UserService,
    private authorityService: AuthorityService,
    private loginDialogService: LoginDialogService
  ){}

  /** managers */
  subscribeManager: SubscribeManager = new SubscribeManager();

  /** DOM */
  @ViewChild("sidenav") sidenav;

  ngOnInit(){

    this.subscribeManager.pushSubscriptions(
      /** subscribe events */

      //toggle sidenav by clicking menu icon
      this.toolbarService.clickMenuIcon.subscribe(()=>{
        this.sidenav.toggle();
      }),

      //close sidenav after clicking sidenav links
      this.sidenavService.clickLinkButton.subscribe(()=>{
        this.sidenav.close();
      }),

      //when current user or authority table update, update current authoritys
      this.userService.current_user$.subscribe(current_user=>{
        this.authorityService.refreshCurrentAuthoritys(current_user.authority)
      })

    );

    /** load data */  //some of these might move to other components later
    this.settingsService.waitAllSetting();
    this.settingsService.loadCongregations();
    this.settingsService.loadSites();
    this.settingsService.loadShiftTitle();
    this.userService.loadUserIdCodeMap();

    /** open login dialog */
    this.loginDialogService.openLoginDialog();
  }

  ngOnDestroy(){
    this.subscribeManager.unsubscribeAll();
  }
}
