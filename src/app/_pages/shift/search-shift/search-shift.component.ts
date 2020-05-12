import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-personal-shift',
  templateUrl: './search-shift.component.html',
  styleUrls: ['./search-shift.component.scss']
})
export class PersonalShiftComponent implements OnInit {

  selectedMontt$: BehaviorSubject<Date>;

  // date picker setting
  minDate: Date;
  maxDate: Date;

  constructor(

  ) { }

  ngOnInit(): void {
    // set current month(auto selected)
    const currentDate = new Date();
    console.log('this month:', currentDate.getMonth() +1);
    // set min max month
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth()-1);
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1);
  }

}
