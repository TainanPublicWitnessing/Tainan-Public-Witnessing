import { Component, OnInit, OnDestroy } from '@angular/core';

import { ToolbarService } from "../toolbar/toolbar.service";
import { LoginDialogService } from "../login-dialog/login-dialog.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private toolbarService: ToolbarService,
    private loginDialogService: LoginDialogService
  ){}

  /** subscribers */

  ngOnInit(){
    this.toolbarService.title.next("首頁");
    this.loginDialogService.openLoginDialog();
  }

  ngOnDestroy(){}

}
