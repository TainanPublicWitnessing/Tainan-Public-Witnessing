import {Component,OnInit} from "@angular/core";
import {FormGroup,FormControl} from "@angular/forms";

import {CongregationsService} from "../service/congregations.service";
import {UserService} from "../service/user.service";

@Component({
  selector: "app-login-card",
  templateUrl: "./login-card.component.html",
  styleUrls: ["./login-card.component.scss"],
})
export class LoginCardComponent implements OnInit{

  constructor(
    public congregationsService:CongregationsService,
    public userService:UserService
  ){}
  
  /* variables */
  
  names: Array<any> = [];
    
  login_form = new FormGroup({
    congregation: new FormControl(""),
    name: new FormControl(""),
    password: new FormControl("")
  });

  ngOnInit(){
    this.congregationsService.getCongregations();
  }
  
  onChangeCongregation(){
    //this.checkCongregation();
    this.getUsersByCongregation();
  }
  
  /* requests */
    
  getUsersByCongregation(): void{
    this.userService.getUsersByCongregation(this.login_form.value.congregation).subscribe(response => {
      this.names = response
    });
  }

}
