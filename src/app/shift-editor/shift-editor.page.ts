import {Component,OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';

import {ShiftService} from "../service/shift.service";
import {UserService} from "../service/user.service";

@Component({
  selector: "app-shift-editor",
  templateUrl: "./shift-editor.page.html",
  styleUrls: ["./shift-editor.page.scss"],
})
export class ShiftEditorPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    public shiftService:ShiftService,
    public userService:UserService
  ){}
  
  /* variables */
  
  //from url
  public date = "";
  public shift_title = "";
  public site = "";
  
  public origin_members = [];
  public members = [];
  public member_names = [];
  public member_select_options = [];

  ngOnInit(){
    //get variables from url
    this.date = this.activatedRoute.snapshot.paramMap.get('date');
    this.shift_title = this.activatedRoute.snapshot.paramMap.get('shift_title');
    this.site = this.activatedRoute.snapshot.paramMap.get('site');
    
    this.shiftService.getSingleShift(this.date,this.shift_title,this.site).subscribe(response=>{
      this.members = response.members;
      this.origin_members = [...this.members];
      /*
      for(let i=0;i<4;i++){
        this.member_select_options.push([this.members[i]]);
      }
      */
    });

    this.userService.getAllUsersName().subscribe(response=>{
      this.member_names = response.sort();
    });
    
    //this.shiftService.ShiftTextProcess();
    //this.shiftService.resetShift();
  }
  
  onSelectChange(index){
    this.members[index] = this.members[index].trim();
    this.member_select_options[index] = this.member_names.filter(function(name){
      return name.includes(this);
    },this.members[index]);
  }

  edit(){
    console.log(this.origin_members);
    console.log(this.members);
    let flag = true;
    for(let member of this.members){
      flag = this.member_names.includes(member);
    }
    if(flag){
      for(let i=0;i<4;i++){
        if(this.members[i] != this.origin_members[i]){
          if(this.origin_members[i] != ""){
            this.userService.deletePersonalShift(this.origin_members[i],this.date);
          }
          if(this.members[i] != ""){
            this.userService.addPersonalShift(this.members[i],this.date,this.shift_title,this.site);
          }
          this.origin_members = [...this.members];
          this.shiftService.setShiftByDate(this.date,this.shift_title,this.site,this.members)
        }
      }
    }
  }
}