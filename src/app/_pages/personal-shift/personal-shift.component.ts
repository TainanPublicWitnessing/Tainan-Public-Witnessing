import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-shift',
  templateUrl: './personal-shift.component.html',
  styleUrls: ['./personal-shift.component.scss']
})
export class PersonalShiftComponent implements OnInit {

  //date picker setting
  minDate: Date;
  maxDate: Date;

  constructor(

  ) { }

  ngOnInit(): void {
  }

}
