import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms"; //處理表單輸入

/* filebase */
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {environment} from "../environments/environment";  //Firebase 環境設定檔

/* components */
import {AppRoutingModule} from "./app-routing.module";  //處理路由
import {AppComponent} from "./app.component";   //根的compoment
import {NavBarComponent} from "./nav-bar/nav-bar.component";  //導覽列
import {IndexComponent} from "./index/index.component";   //首頁
import {LoginComponent} from "./login/login.component";   //登入
import {PersonalShiftComponent} from './personal-shift/personal-shift.component';

/* root module */
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    IndexComponent,
    LoginComponent,
    PersonalShiftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),  //import firebase settings
 	  AngularFirestoreModule
  ],
  providers:[],
  bootstrap:[AppComponent]   //首先呼叫的Component
})
export class AppModule{}

