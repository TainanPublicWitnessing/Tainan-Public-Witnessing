import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

/** services */
import { SidenavService } from "./sidenav.service";
import { UserService } from "src/app/_services/user.service";
import { AuthorityService } from "src/app/_services/authority.service";
import { LoginDialogService } from "src/app/_elements/dialogs/login-dialog/login-dialog.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private sidenavService: SidenavService,
    private userService: UserService,
    public authorityService: AuthorityService,
    private loginDialogService: LoginDialogService
  ){}

  ngOnInit(){}

  ngOnDestroy(){}

  /** functions */

  routingTo(url): void{
    this.sidenavService.clickLinkButton.next();  //launch click link button event
    this.router.navigateByUrl(url);
  }

  login(){
    this.sidenavService.clickLinkButton.next();  //launch click link button event
    this.loginDialogService.openLoginDialog();
  }

  logout(){
    this.sidenavService.clickLinkButton.next();  //launch click link button event
    this.userService.logout();
    this.routingTo("home");
  }
}
