import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor(){}

  /** events */
  
  public clickMenuIcon = new Subject();
  public clickSubmitButton = new Subject();

  /** variables */

  public title = new BehaviorSubject("");
  public showSubmitButton = new BehaviorSubject(false);
}
