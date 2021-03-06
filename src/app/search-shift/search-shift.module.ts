import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchShiftPage } from './search-shift.page';
import { LoginCardModule } from '../login-card/login-card.modules';

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
    LoginCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SearchShiftPage
  ]
})
export class SearchShiftPageModule {}
