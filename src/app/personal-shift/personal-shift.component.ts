import {Component,OnInit} from '@angular/core';
import {NavService} from '../nav.service';
import {ShiftService} from "../shift.service";

@Component({
  selector: 'app-personal-shift',
  templateUrl: './personal-shift.component.html',
  styleUrls: ['./personal-shift.component.css']
})
export class PersonalShiftComponent implements OnInit{

  constructor(
    private navService: NavService,
    private shiftService:ShiftService
  ){}

  ngOnInit(){
    this.navService.current_page = "個人班表";
    //this.shiftService.importData();
  }

}
