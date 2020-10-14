import {Component,OnInit} from "@angular/core";
import {FormGroup,FormControl} from "@angular/forms";

import {CongregationsService} from "../service/congregations.service";
import {UserService} from "../service/user.service";
import {NavService} from "../service/nav.service";

@Component({
  selector: "app-login-card",
  templateUrl: "./login-card.component.html",
  styleUrls: ["./login-card.component.scss"],
})
export class LoginCardComponent implements OnInit{

  constructor(
    public congregationsService:CongregationsService,
    public userService:UserService,
    public navService:NavService
  ){}
  
  /* variables */
  
  names: Array<any> = [];
    
  login_form = {
    congregation:"",
    name:"",
    password:""
  };
  
  is_legal = {
    congregation:true,
    name:true,
    password:true
  };
  
  /* checking functions */
  
  checkCongregation(){
    if(this.login_form.congregation){
      this.is_legal.congregation = true;
    }else{
      this.is_legal.congregation = false;
    }
  }
  
  checkName(){
    if(this.login_form.name){
      this.is_legal.name = true;
    }else{
      this.is_legal.name = false;
    }
  }
  
  checkPassword(){
    if(this.login_form.password){
      this.is_legal.password = true;
    }else{
      this.is_legal.password = false;
    }
  }
  
  checkAll(){
    let result = true;
    for(let index in this.is_legal){
      result = result && this.is_legal[index];
    }
    return result;
  }

  /* events */

  ngOnInit(){
    this.congregationsService.getCongregations();
  }
  
  onChangeCongregation(){
    this.checkCongregation();
    this.getUsersByCongregation();
  }
  
  onChangeName(){
    this.checkName();
  }
  
  onChangePassword(){
    this.checkPassword();
  }
  
  onSubmit(){
    this.checkCongregation();
    this.checkName();
    this.checkPassword();
    if(this.checkAll()){ 
      this.login();
    }
  }
  
  /* requests */
    
  getUsersByCongregation(): void{
    this.userService.getUsersByCongregation(this.login_form.congregation).subscribe(response => {
      this.names = response;
    });
  }

  login() {
    this.userService.login(this.login_form.name, this.login_form.password).subscribe(response=>{
      if (response) {  // success
        this.navService.getNavLinkByAuthority(this.userService.user.authority);
        // this.router.navigate(["index"]);
      } else {  // fail
        this.login_form.password = '';
        this.is_legal.password = false;
      }
    });
  }

}
