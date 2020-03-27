import {Component,OnInit} from "@angular/core";
import {ActivatedRoute,Router} from '@angular/router';

import {ShiftService} from "../service/shift.service";
import {UserService} from "../service/user.service";

@Component({
  selector: "app-shift-editor",
  templateUrl: "./shift-editor.page.html",
  styleUrls: ["./shift-editor.page.scss"]
})
export class ShiftEditorPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
    });

    this.userService.getAllUsersName().subscribe(response=>{
      this.member_names = response.sort((a: string, b: string)=>{
        return a.localeCompare(b);
      });
    });

    // this.refreshMetadata();
  }

  // refreshMetadata(){
  //   this.userService.refreshMetadata();
  // }
  
  trackByIndex(index,item){
    return index;
  }

  onSelectChange(index){
    this.members[index] = this.members[index].trim();
    this.member_select_options[index] = this.member_names.filter((name)=>{
      return name.includes(this.members[index]);
    });
    
    setTimeout(()=>{
      this.member_select_options[index].unshift("");
    },250);
    
  }

  edit(){
    let flag = true;
    for(let member of this.members){
      member = member.trim();
      if(!(this.member_names.includes(member) || member == "")){
        flag = false;
      }
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
          this.shiftService.setShiftByDate(this.date,this.shift_title,this.site,this.members);
        }
      }
      alert("修改成功");
      this.router.navigate(["search-shift"]);
    }else{
      alert("輸入錯誤");
    }
  }
}