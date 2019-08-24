import {Component,OnInit} from "@angular/core";
import {Router} from "@angular/router"

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

  /* events */

  ngOnInit(){
    this.navService.getNavLinkByAuthority("");
  }
  
  onLogout(){
    this.userService.logout();
    this.navService.getNavLinkByAuthority("");
    this.router.navigate(["index"]);
  }
}
