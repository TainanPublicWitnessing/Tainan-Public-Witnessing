import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from "../service/user.service";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {

  id = null;

  public User;

  constructor(
    private activatedRoute: ActivatedRoute,
    public userService:UserService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.getUsersById();
  }

  /* Events */
  onsubmit(){
    console.log(this.User);

  }

  OnChange(key, info){
    this.User[key] = info;
  }

  /* requests */
    
  getUsersById(): void{
    this.userService.getUsersDataById(this.id).subscribe(response => {
      this.User = response;
    });
  }

}
