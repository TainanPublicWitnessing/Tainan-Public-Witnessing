import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {CongregationsService} from "../service/congregations.service";

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.page.html',
  styleUrls: ['./member-management.page.scss'],
})
export class MemberManagementPage implements OnInit {

  constructor(
    public congregationsService:CongregationsService,
    public userService:UserService
  ) { }

  public congregation;
  public Users:Array<any> = [];


  /* events */

  ngOnInit(){
    this.congregationsService.getCongregations();
  }
  
  onChangeCongregation(){
    this.getUsersByCongregation();
  }

  /* requests */
    
  getUsersByCongregation(): void{
    this.userService.getUsersDataByCongregation(this.congregation).subscribe(response => {
      this.Users = response;
      console.log(this.Users);
    });
  }

}
