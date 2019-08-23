import {NgModule} from "@angular/core";
import {Routes,RouterModule} from "@angular/router";

/* page components */
import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./login/login.component";
import {PersonalShiftComponent} from './personal-shift/personal-shift.component';

/* routings */
const routes:Routes = [
  {path:"",redirectTo:"index",pathMatch:"full"},
  {path:"index",component:IndexComponent},
  {path:"login",component:LoginComponent},
  {path:"personal_shift",component:PersonalShiftComponent}
];

/* export routing module */
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{}
