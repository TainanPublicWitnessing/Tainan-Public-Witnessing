import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DateShift } from 'src/app/_structures/DateShift.class';
import { SettingsService } from 'src/app/_services/settings.service';
import { IShift } from 'src/app/_structures/interfaces/IShift.interface';
import { SHIFT_TITLE } from 'src/app/_structures/Enum/SHIFT_TITLE.enum';

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

  //temp
  FAKE_SHIFT: IShift = {
    id:"",
        date: new Date(),
        site: "成大園區",
        shift_title: "早上",
        members: [
          "蔡元泓一",
          "菜園勳",
          "哇哇哇",
          "一二三四"
        ]
  };

  FAKE_DATE_SHIFT_DATA: DateShift = new DateShift(
    new Date(),
    [
      {
        id:"",
            date: new Date(),
            site: "成大園區",
            shift_title: "早上",
            members: [
              "蔡元泓一",
              "菜園勳",
              "哇哇哇",
              "一二三四"
            ]
      },
      {
        id:"",
            date: new Date(),
            site: "成大園區",
            shift_title: "中午",
            members: [
              "蔡元泓一",
              "菜園勳",
              "哇哇哇",
              "一二三四"
            ]
      },
      {
        id:"",
            date: new Date(),
            site: "成大園區",
            shift_title: "下午",
            members: [
              "蔡元泓一",
              "菜園勳",
              "哇哇哇",
              "一二三四"
            ]
      }
    ],
    "成大園區",
  )


  constructor(
    private settingService: SettingsService,
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
