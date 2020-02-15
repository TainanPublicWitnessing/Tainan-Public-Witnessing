import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { combineLatest } from "rxjs";

/** services */
import { ToolbarService } from "src/app/toolbar/toolbar.service";
import { SidenavService } from "src/app/sidenav/sidenav.service";
import { SettingsService } from "src/app/_services/settings.service";
import { UserService } from "src/app/_services/user.service";
import { AuthorityService } from "src/app/_services/authority.service";

/** structures */
import { SubscribeManager } from "src/app/_managers/SubscribeManager.class";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends SubscribeManager implements OnInit, OnDestroy {

  constructor(
    private toolbarService: ToolbarService,
    private sidenavService: SidenavService,
    private settingsService: SettingsService,
    private userService: UserService,
    private authorityService: AuthorityService
  ){
    super();
  }

  ngOnInit(){
    
    this.subscriptions.push(
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
      combineLatest(
        this.userService.current_user,
        this.authorityService.authority_table
      ).subscribe(([current_user,authority_table])=>{
        this.authorityService.current_authoritys.next(
          authority_table.getAuthoritys(current_user.authority)
        );
      })
    );

    /** load data */  //some of these might move to other components later
    this.settingsService.loadCongregations();
    this.settingsService.loadAuthoritys();
    this.userService.loadUserIdMap();
    this.authorityService.loadAuthorityTable();
  }

  ngOnDestroy(){
    this.unsubscribe();
  }

  /** DOM */
  @ViewChild("sidenav") sidenav;
}
