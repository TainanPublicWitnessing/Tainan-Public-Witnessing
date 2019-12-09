import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from "../_structure/user.class"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(){}

  /* variables */

  current_user = new BehaviorSubject<User>(new User);
}
