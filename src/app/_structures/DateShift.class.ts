import { IShift } from './interfaces/IShift.interface';

export class DateShift{
  /** variable */
  date: Date;
  shifts: IShift;
  site: string; //place

  getDateString(): string{
    let dateString = this.date.getMonth() +"月" +this.date.getDate() +"日";
    return dateString;
  }
}
