import { Component, OnInit } from '@angular/core';

/** services */
import { ToolbarService } from "src/app/toolbar/toolbar.service";
import { UserService } from "src/app/_services/user.service";
import { AuthorityService } from "src/app/_services/authority.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private toolbarService: ToolbarService,
    private userService: UserService,
    private authorityService: AuthorityService
  ){}

  /** authoritys */
  authoritys = null;

  ngOnInit(){
    this.toolbarService.title.next("首頁");
  }

  /** temp */

  current_user(){
    this.userService.showCurrentUser();
  }

  authority_table(){
    console.log(this.authorityService.$authority_table.getValue());
  }
}
