import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** services */
import { AuthorityService } from "src/app/_services/authority.service";

/* components */
import { HomeComponent } from "src/app/_pages/home/home.component";
import { NewUserComponent } from "src/app/_pages/new-user/new-user.component";
import { ApiComponent } from 'src/app/_pages/api/api.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "new_user", component: NewUserComponent, canActivate:[AuthorityService] },
  { path: "api", component: ApiComponent, canActivate:[AuthorityService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
