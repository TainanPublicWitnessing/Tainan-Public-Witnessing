import {Component,OnInit} from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import {NavService} from "./service/nav.service";
import { UserService } from './service/user.service';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})

export class AppComponent implements OnInit{

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    public navService:NavService
  ){
    this.initializeApp();
  }
  
  ngOnInit(){
    //this.navService.getNavLinkByAuthority("administrator");
    this.navService.getNavLinkByAuthority("anyone");
    this.userService.getUsersIdCodeMap();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
