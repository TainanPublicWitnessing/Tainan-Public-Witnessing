import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { LoginCardModule } from '../login-card/login-card.modules';
import { ShiftReportCardModule } from '../shift-report-card/shift-report-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginCardModule,
    ShiftReportCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations:[
    HomePage
  ]
})
export class HomePageModule{}
