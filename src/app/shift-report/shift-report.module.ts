import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShiftReportPage } from './shift-report.page';
import {LoginCardComponent} from "../login-card/login-card.component";

const routes: Routes = [
  {
    path: '',
    component: ShiftReportPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ShiftReportPage,
    LoginCardComponent
  ]
})
export class ShiftReportPageModule {}
