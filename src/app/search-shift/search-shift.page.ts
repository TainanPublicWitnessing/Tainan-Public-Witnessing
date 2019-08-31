import { Component, OnInit } from '@angular/core';

import {ShiftService} from "../service/shift.service";

@Component({
  selector: 'app-search-shift',
  templateUrl: './search-shift.page.html',
  styleUrls: ['./search-shift.page.scss'],
})
export class SearchShiftPage implements OnInit {

  //工具欄，初始顯示"個人班表"
  public ShiftDisplay = "person";

  constructor(
    public shiftService:ShiftService
  ) { }

  ngOnInit() {
    this.shiftService.getShiftByMonth("201909");
  }

}
