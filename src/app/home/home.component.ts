import { Component, OnInit, OnDestroy } from '@angular/core';

import { ToolbarService } from "../toolbar/toolbar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private toolbarService: ToolbarService
  ){}

  /** subscribers */

  ngOnInit(){
    this.toolbarService.title.next("首頁");
  }

  ngOnDestroy(){}

}
