import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShiftReportListPage } from './shift-report-list.page';

const routes: Routes = [
  {
    path: '',
    component: ShiftReportListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShiftReportListPage]
})
export class ShiftReportListPageModule {}
