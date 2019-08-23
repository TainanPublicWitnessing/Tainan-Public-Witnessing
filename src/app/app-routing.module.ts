import {NgModule} from "@angular/core";
import {Routes,RouterModule} from "@angular/router";

/* page components */
import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./login/login.component";

/* routings */
const routes:Routes = [
  {path:"",redirectTo:"index",pathMatch:"full"},
  {path:"index",component:IndexComponent},
  {path:"login",component:LoginComponent}
];

/* export routing module */
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{}
