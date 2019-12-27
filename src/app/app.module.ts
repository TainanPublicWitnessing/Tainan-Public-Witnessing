/** angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from "@angular/common";

/** angular material */
import { MAT_DATE_LOCALE } from "@angular/material";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

/* filebase */
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from "../environments/environment";  //Firebase config

/** modules */
import { AppRoutingModule } from './app-routing.module';

/** components */
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NewUserComponent } from './new-user/new-user.component';
import { SubmitConfirmDialogComponent } from './submit-confirm-dialog/submit-confirm-dialog.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    ToolbarComponent,
    NewUserComponent,
    SubmitConfirmDialogComponent,
    LoginDialogComponent
  ],
  entryComponents: [  //dynamic component goes here
    SubmitConfirmDialogComponent,
    LoginDialogComponent
  ],
  imports: [
    /** angular */
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    /** angular material */
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatDialogModule,
    MatAutocompleteModule,

    /** firebase */
    AngularFireModule.initializeApp(environment.firebase),  //import firebase settings
    AngularFirestoreModule,
    AngularFireAuthModule,

    /** routing */
    AppRoutingModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },  //for MatMomentDateModule
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
