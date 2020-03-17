/** angular */
import { NgModule } from '@angular/core';
import { DatePipe } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { environment } from "src/environments/environment";  //Firebase config

/** modules */
import { AppRoutingModule } from 'src/app/app-routing.module';

/** components */
import { AppComponent } from 'src/app/app.component';
import { SidenavComponent } from 'src/app/sidenav/sidenav.component';
import { ToolbarComponent } from 'src/app/toolbar/toolbar.component';
import { HomeComponent } from 'src/app/_pages/home/home.component';
import { NewUserComponent } from 'src/app/_pages/new-user/new-user.component';
import { ApiComponent } from 'src/app/_pages/api/api.component';

import { SubmitConfirmDialogComponent } from 'src/app/_elements/dialogs/submit-confirm-dialog/submit-confirm-dialog.component';
import { LoginDialogComponent } from 'src/app/_elements/dialogs/login-dialog/login-dialog.component';
import { LineComponent } from './_pages/line/line.component';
import { PersonalShiftComponent } from './_pages/personal-shift/personal-shift.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    ToolbarComponent,
    NewUserComponent,
    SubmitConfirmDialogComponent,
    LoginDialogComponent,
    ApiComponent,
    LineComponent,
    PersonalShiftComponent
  ],
  entryComponents: [  //dynamic component goes here
    SubmitConfirmDialogComponent,
    LoginDialogComponent
  ],
  imports: [
    /** angular */
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
    AppRoutingModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },  //for MatMomentDateModule
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
