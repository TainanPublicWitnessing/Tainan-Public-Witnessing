import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

/** services */
import { ToolbarService } from "./toolbar/toolbar.service";
import { SidenavService } from "./sidenav/sidenav.service";
import { SettingsService } from "./_service/settings.service";
import { UserService } from "./_service/user.service";

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
    private userService: UserService
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

    /** load data */  //some of these might move to other components later
    this.settingsService.loadCongregations();
    this.settingsService.loadAuthoritys();
    this.userService.loadUserIdMap();
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
