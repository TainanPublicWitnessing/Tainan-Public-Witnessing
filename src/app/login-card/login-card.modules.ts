import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {LoginCardComponent} from "../login-card/login-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations:[
    LoginCardComponent
  ],
  exports:[
    LoginCardComponent
  ]
})
export class LoginCardModule{}
