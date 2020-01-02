import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

/** services */
import { ToolbarService } from "./toolbar/toolbar.service";
import { SidenavService } from "./sidenav/sidenav.service";
import { SettingsService } from "./_service/settings.service";
import { UserService } from "./_service/user.service";
import { AuthorityService } from "./_service/authority.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  constructor(
    private toolbarService: ToolbarService,
    private sidenavService: SidenavService,
    private settingsService: SettingsService,
    private userService: UserService,
    private authorityService: AuthorityService
  ){}

  /** subscriptions */  //for unsubscribe
  private subscriptions = {
    /** events */
    clickMenuIcon: null as Subscription,
    clickLinkButton: null as Subscription
  }

  ngOnInit(){

    /** subscribe events */

    //toggle sidenav by clicking menu icon
    this.subscriptions.clickMenuIcon = this.toolbarService.clickMenuIcon.subscribe(()=>{
      this.sidenav.toggle();
    });

    //close sidenav after clicking sidenav links
    this.subscriptions.clickLinkButton = this.sidenavService.clickLinkButton.subscribe(()=>{
      this.sidenav.close();
    });

    //when current user or authority table update, update current authoritys
    combineLatest(
      this.userService.current_user,
      this.authorityService.authority_table
    ).subscribe(([current_user,authority_table])=>{
      this.authorityService.current_authoritys.next(
        authority_table.getAuthoritys(current_user.authority)
      );
    });

    /** load data */  //some of these might move to other components later
    this.settingsService.loadCongregations();
    this.settingsService.loadAuthoritys();
    this.userService.loadUserIdMap();
    this.authorityService.loadAuthorityTable();
  }

  ngOnDestroy(){
    /** unsubscribe */
    for(let index in this.subscriptions){
      this.subscriptions[index].unsubscribe();
    }
  }

  /** DOM */
  @ViewChild("sidenav",{static:false}) sidenav;
}
