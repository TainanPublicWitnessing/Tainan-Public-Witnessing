import {Component,OnInit} from '@angular/core';

/* services */
import {NavService} from "../nav.service";

@Component({
  selector: 'app-monthly-shift',
  templateUrl: './monthly-shift.component.html',
  styleUrls: ['./monthly-shift.component.css']
})
export class MonthlyShiftComponent implements OnInit {

  constructor(
    private navService:NavService
  ){}

  ngOnInit(){
    this.navService.current_page = "每月班表";
  }

}
