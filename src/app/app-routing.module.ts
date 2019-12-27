import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* components */
import { HomeComponent } from "./home/home.component";
import { NewUserComponent } from "./new-user/new-user.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "new_user", component: NewUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
