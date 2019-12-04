import { Component, OnInit } from '@angular/core';
import { ToolbarService } from "./toolbar.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private toolbarService: ToolbarService
  ){}

  ngOnInit() {
  }

  /* event */

  menuIconClick(){
    this.toolbarService.clickMenuIcon.next();
  }

}
