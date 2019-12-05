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

  ngOnInit(){
    this.toolbarService.title.subscribe(next=>{
      this.title = next;
    });

    this.toolbarService.showSubmitButton.subscribe(next=>{
      this.showSubmitButton = next;
    });
  }

  /** variables */

  title: string;
  showSubmitButton: boolean;

  /* event */

  clickMenuIcon(){
    this.toolbarService.clickMenuIcon.next();
  }

  clickSubmitButton(){
    this.toolbarService.clickSubmitButton.next();
  }

}
