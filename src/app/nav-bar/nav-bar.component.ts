import {Component,OnInit} from "@angular/core";
import {Router} from "@angular/router"
import * as $ from 'jquery';
import Popper, {PopperOptions} from 'popper.js';

/* services */
import {NavService} from "../nav.service";
import {UserService} from "../user.service";
import {User} from "../User";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit{
  
  constructor(
    private router:Router,
    public navService: NavService,
    public userService: UserService
  ){}
  
  public popper: Popper;

  /* events */

  ngOnInit(){
    this.navService.getNavLinkByAuthority("administrator");
  }
  
  onLogout(){
    this.userService.logout();
    this.navService.getNavLinkByAuthority("");
    this.router.navigate(["index"]);
  }
}
