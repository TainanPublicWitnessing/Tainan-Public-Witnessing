import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor(){}

  /* event */
  public menuIconClick = new Subject();
}
