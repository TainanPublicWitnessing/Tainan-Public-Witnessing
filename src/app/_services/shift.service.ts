import { Injectable } from '@angular/core';

/** rxjs */
import { BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";

/** firebase */
import { AngularFirestore } from "@angular/fire/firestore";

/** structures */
import { User } from "src/app/_structures/User.class"

/** service */
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(
    private angularFirestore: AngularFirestore,
    private userService: UserService,
  ) { }
  
  getUserShiftByMonth(month): Promise<any>{
    console.log("getUserShiftByMonth, month:", month); 

    this.userService.current_user$.subscribe((user:User) =>{
      console.log("user:", user);

      // this.angularFirestore
      //   .collection("User")
      //   .doc(user.id)
      //   .collection("MonthlyData")
      //   .
    })

    return null;
  }

}


