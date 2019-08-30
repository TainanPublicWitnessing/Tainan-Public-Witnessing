import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-shift',
  templateUrl: './search-shift.page.html',
  styleUrls: ['./search-shift.page.scss'],
})
export class SearchShiftPage implements OnInit {

  //工具欄，初始顯示"個人班表"
  public ShiftDisplay = "person";

  constructor() { }

  ngOnInit() {
  }

}
