import {Component,OnInit} from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import {NavService} from "./service/nav.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})

export class AppComponent {
  public appPages = [
    {
      title: '首頁',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'list',
      url: '/list',
      icon: 'list'
    },
    {
      title: '查詢班表',
      url: '/search-shift',
      icon: 'md-search'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navService:NavService
  ){
    this.initializeApp();
  }
  
  ngOnInit(){
    this.navService.getNavLinkByAuthority("administrator");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
