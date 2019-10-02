import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchShiftPage } from './search-shift.page';
import { LoginCardComponent } from '../login-card/login-card.component'

const routes: Routes = [
  {
    path: '',
    component: SearchShiftPage
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
    SearchShiftPage,
    LoginCardComponent
  ]
})
export class SearchShiftPageModule {}
