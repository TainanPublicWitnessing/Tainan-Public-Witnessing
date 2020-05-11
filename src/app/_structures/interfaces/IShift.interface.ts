import { SHIFT_TITLE } from '../Enum/SHIFT_TITLE.enum';

export interface IShift{
  id: string;
  date: Date;
  menbers: string[];
  shift_title: SHIFT_TITLE;
  site: string;
}
