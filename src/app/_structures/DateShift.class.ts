import { IShift } from './interfaces/IShift.interface';

export class DateShift{
  /** variable */
  date: Date;
  shifts: IShift[];
  site: string; //place

  constructor(
    _date:Date,
    _shifts: IShift[],
    _site: string
  ){
    this.date = _date;
    this.shifts = _shifts;
    this.site = _site;
  }

  getDateString(): string{
    let dateString = this.date.getMonth()+1 +" 月 " +this.date.getDate() +" 日 (" +"一二三四五六日"[this.date.getDay()-1] +")";
    return dateString;
  }

  isContianShiftTitle(shiftTitle: string){
    for(const shift of this.shifts){
      if(shift.shift_title === shiftTitle){
        return true;
      }
    }
    return false;
  }

  getShiftByShiftTitle(shiftTitle: string): IShift{
    for(const shift of this.shifts){
      if(shift.shift_title === shiftTitle){
        return shift;
      }
    }
    return null;
  }
}
