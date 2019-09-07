import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {

  name = null;

  public User:Array<any> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public userService:UserService
  ) { }

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.paramMap.get('name');

    this.getUsersByName();
  }


  /* requests */
    
  getUsersByName(): void{
    this.userService.getUsersDataByName(this.name).subscribe(response => {
      this.User = response[0];
      console.log(this.User);
    });
  }

}
