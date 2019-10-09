import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { LoginCardModule } from '../login-card/login-card.modules';

import { ShiftReportPage } from './shift-report.page';



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
    LoginCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ShiftReportPage
  ]
})
export class ShiftReportPageModule {}
