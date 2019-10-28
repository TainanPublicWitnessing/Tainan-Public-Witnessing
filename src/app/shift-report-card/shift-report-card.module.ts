import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {ShiftReportCardComponent} from "../shift-report-card/shift-report-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations:[
    ShiftReportCardComponent
  ],
  exports:[
    ShiftReportCardComponent
  ]
})
export class ShiftReportCardModule{}
