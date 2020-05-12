import { Component, OnInit, Input } from '@angular/core';
import { DateShift } from 'src/app/_structures/DateShift.class';
import { SettingsService } from 'src/app/_services/settings.service';
import { BehaviorSubject } from 'rxjs';
import { IShift } from 'src/app/_structures/interfaces/IShift.interface';

@Component({
  selector: 'app-date-shift',
  templateUrl: './date-shift.component.html',
  styleUrls: ['./date-shift.component.scss']
})
export class DateShiftComponent implements OnInit {

  @Input("DateShiftData") myDateShift: DateShift;

  shiftTitles: string[];

  shifts$: BehaviorSubject<IShift[]> = new BehaviorSubject<IShift[]>(null);

  isloading = true;

  constructor(
    public settingsService: SettingsService
  ) {}

  ngOnInit(): void {

    this.settingsService.shiftTitle$.subscribe((shift_title:string[])=>{
      if(shift_title){
        this.isloading = true;
        this.shiftTitles = shift_title;
        if(this.myDateShift){
          //處理不同的班次
          let shifts: IShift[] = [];
          for(const shiftTitle of this.shiftTitles){
            let _shift: IShift = this.myDateShift.getShiftByShiftTitle(shiftTitle);
            if(_shift !== null){
              shifts.push(_shift);
            }
          }
          this.shifts$.next(shifts);
        }
      }
    })


    this.shifts$.subscribe((shift: IShift[])=>{
      console.log(this.shifts$.getValue());
      if(shift !== null){
        this.isloading = false;
      }else{
        this.isloading = true;
      }
      console.log(this.isloading);
    })
  }


}
