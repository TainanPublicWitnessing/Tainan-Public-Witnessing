import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";

/* filebase */
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {environment} from "../environments/environment";

/* components */
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./login/login.component";

/* root module */
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    IndexComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),  //import firebase settings
 	  AngularFirestoreModule
  ],
  providers:[],
  bootstrap:[AppComponent]
})
export class AppModule{}
