import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor(){}

  /** events */

  public clickLinkButton = new Subject();
}
