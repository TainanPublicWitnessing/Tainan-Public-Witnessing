import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";

import { SidenavService } from "./sidenav.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(
    private router: Router,
    private sidenavService: SidenavService
  ){}

  ngOnInit() {
  }

  /** routing functions */
  routingTo(url){
    this.sidenavService.clickLinkButton.next();
    this.router.navigateByUrl(url);
  }

}
