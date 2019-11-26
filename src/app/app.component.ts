import { Component, ViewChild } from '@angular/core';
import { ToolbarService } from "./toolbar/toolbar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private toolbarService: ToolbarService
  ){
    /* subscribe events */

    this.toolbarService.menuIconClick.subscribe(next=>{
      this.sidenav.toggle();
    });
  }

  /* DOM */
  @ViewChild("sidenav",{static:false}) sidenav;
}
