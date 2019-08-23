import {Component,OnInit} from "@angular/core";
import {FormGroup,FormControl} from "@angular/forms";
import {Router} from "@angular/router"

/* services */
import {CongregationsService} from "../congregations.service";
import {UserService} from "../user.service";
import {NavService} from "../nav.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit{
  
  constructor(
    private router:Router,
    private navService:NavService,
    public congregationService:CongregationsService,
    private userService:UserService
  ){}
  
  /* variables */

  names: Array<any> = [];
    
  login_form = new FormGroup({
    congregation: new FormControl(""),
    name: new FormControl(""),
    password: new FormControl("")
  });
  
  is_legal = {
    congregation:true,
    name:true,
    password:true
  };
  
  /* checking functions */
  
  checkCongregation(){
    if(this.login_form.value.congregation){
      this.is_legal.congregation = true;
    }else{
      this.is_legal.congregation = false;
    }
  }
  
  checkName(){
    if(this.login_form.value.name){
      this.is_legal.name = true;
    }else{
      this.is_legal.name = false;
    }
  }
  
  checkPassword(){
    if(this.login_form.value.password){
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
    this.congregationService.getCongregations();
    this.navService.current_page = "登入";
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
    this.userService.getUsersByCongregation(this.login_form.value.congregation).subscribe(response => {
      this.names = response
    });
  }
  
  login(){
    this.userService.login(this.login_form.value.name,this.login_form.value.password).subscribe(response=>{
      if(response){  //success
        this.navService.getNavLinkByAuthority(this.userService.user.authority);
        this.router.navigate(["index"]);
      }else{  //fail
        this.login_form.patchValue({password:""});
        this.is_legal.password = false;
      }
    });
  }
}
