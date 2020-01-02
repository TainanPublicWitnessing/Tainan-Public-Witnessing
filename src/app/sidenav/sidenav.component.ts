import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

/** rxjs */
import { Subscription } from "rxjs";

/** services */
import { SidenavService } from "./sidenav.service";
import { UserService } from "../_service/user.service";
import { AuthorityService } from "../_service/authority.service";
import { LoginDialogService } from "../login-dialog/login-dialog.service";

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
    private authorityService: AuthorityService,
    private loginDialogService: LoginDialogService
  ){}
  
  /** authoritys */
  authoritys = null;

  /** subscriptions */
  private subscriptions = {
    authoritys: null as Subscription
  }

  ngOnInit(){
    /** subscribe authoritys */
    this.subscriptions.authoritys = this.authorityService.current_authoritys.subscribe(data=>{
      this.authoritys = data;
    })
  }

  ngOnDestroy(){
    /** unsubscribe */
    for(let index in this.subscriptions){
      this.subscriptions[index].unsubscribe();
    }
  }

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
