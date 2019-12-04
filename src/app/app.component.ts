import { Component, ViewChild } from '@angular/core';
import { ToolbarService } from "./toolbar/toolbar.service";
import { SidenavService } from "./sidenav/sidenav.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private toolbarService: ToolbarService,
    private sidenavService: SidenavService
  ){
    /** subscribe events */

    this.toolbarService.clickMenuIcon.subscribe(next=>{
      this.sidenav.toggle();
    });

    this.sidenavService.clickLinkButton.subscribe(next=>{
      this.sidenav.close();
    });
  }

  /** DOM */

  @ViewChild("sidenav",{static:false}) sidenav;
}
