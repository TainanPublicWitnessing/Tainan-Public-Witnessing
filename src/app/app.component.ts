import { Component, ViewChild, OnInit } from '@angular/core';
import { ToolbarService } from "./toolbar/toolbar.service";
import { SidenavService } from "./sidenav/sidenav.service";
import { SettingsService } from "./_service/settings.service";
import { UserService } from "./_service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private toolbarService: ToolbarService,
    private sidenavService: SidenavService,
    private settingsService: SettingsService,
    private userService:UserService
  ){}

  ngOnInit(){
    this.toolbarService.clickMenuIcon.subscribe(next=>{
      this.sidenav.toggle();
    });

    this.sidenavService.clickLinkButton.subscribe(next=>{
      this.sidenav.close();
    });

    this.settingsService.loadCongregations();
    this.settingsService.loadAuthoritys();
    this.userService.loadUserIdMap();
  }

  /** DOM */

  @ViewChild("sidenav",{static:false}) sidenav;
}
