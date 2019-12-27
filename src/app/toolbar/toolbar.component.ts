import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

/** services */
import { ToolbarService } from "./toolbar.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  constructor(
    private toolbarService: ToolbarService
  ){}

  /** subscirptions */
  private subscriptions = {
    title: null as Subscription,
    showSubmitButton: null as Subscription
  }

  ngOnInit(){

    /** subscribe data */

    //get current page title
    this.subscriptions.title = this.toolbarService.title.subscribe(data=>{
      this.title = data;
    });

    //get flag of showing submit button or not
    this.subscriptions.showSubmitButton = this.toolbarService.showSubmitButton.subscribe(data=>{
      this.showSubmitButton = data;
    });
  }

  ngOnDestroy(){
    for(let index in this.subscriptions){
      this.subscriptions[index].unsubscribe();
    }
  }

  /** variables */

  title: string;  //page title
  showSubmitButton: boolean;  //show submit button or not

  /* events */

  //launch click menu icon event
  clickMenuIcon(): void{
    this.toolbarService.clickMenuIcon.next();
  }

  //launch click submit button event
  clickSubmitButton(): void{
    this.toolbarService.clickSubmitButton.next();
  }
}
