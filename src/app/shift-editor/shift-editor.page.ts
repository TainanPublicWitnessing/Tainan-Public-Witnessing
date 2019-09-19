import {Component,OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';

import {ShiftService} from "../service/shift.service";

@Component({
  selector: "app-shift-editor",
  templateUrl: "./shift-editor.page.html",
  styleUrls: ["./shift-editor.page.scss"],
})
export class ShiftEditorPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    public shiftService:ShiftService
  ){}
  
  public date = "";
  public shift_title = "";
  public site = "";
  public members = [];

  ngOnInit(){
    this.date = this.activatedRoute.snapshot.paramMap.get('date');
    this.shift_title = this.activatedRoute.snapshot.paramMap.get('shift_title');
    this.site = this.activatedRoute.snapshot.paramMap.get('site');
    //this.shiftService.ShiftTextProcess();
    this.shiftService.getSingleShift(this.date,this.shift_title,this.site).subscribe(response=>{
      this.members = response.members;
    });
  }

}
