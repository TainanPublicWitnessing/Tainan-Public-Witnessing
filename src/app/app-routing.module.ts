import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'search-shift', loadChildren: './search-shift/search-shift.module#SearchShiftPageModule' },
  { path: 'member-management', loadChildren: './member-management/member-management.module#MemberManagementPageModule' },
  { path: 'personal-information/:id', loadChildren: './personal-information/personal-information.module#PersonalInformationPageModule' },
  { path: 'shift-editor/:date/:shift_title/:site', loadChildren: './shift-editor/shift-editor.module#ShiftEditorPageModule' },
  { path: 'shift-report', loadChildren: './shift-report/shift-report.module#ShiftReportPageModule' },
  { path: 'shift-report/:shiftId', loadChildren: './shift-report/shift-report.module#ShiftReportPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
