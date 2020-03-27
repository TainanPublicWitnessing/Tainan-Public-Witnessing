import {Component,OnInit} from "@angular/core";

import {UserService} from "../service/user.service";
import {ShiftService} from "../service/shift.service";

@Component({
  selector:"app-home",
  templateUrl:"home.page.html",
  styleUrls:["home.page.scss"],
})
export class HomePage implements OnInit{


  constructor(
    public userService:UserService,
    public shiftService:ShiftService
  ){}
  
  ngOnInit(){}

  openSideMenu(){
    document.querySelector('ion-menu-controller')
      .open();
  }

  ImportData(){  
    this.shiftService.ShiftTextProcess();
  }

  

}
