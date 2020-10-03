import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponentComponent } from './home-component/home-component.component';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import below for login using microsoft
import { AngularFireAuthModule } from "@angular/fire/auth";
//import below for routing
import { RouterModule } from '@angular/router';
//Import below for forms working
import {FormsModule} from '@angular/forms'
//Import this below lines to use fireDb related things
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database'
import {AngularFirestoreModule} from '@angular/fire/firestore';
//Imported for components
import { UserListComponent } from './user-list/user-list.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
//import this for getting popup modules
//import {PopupModule} from 'ng2-opd-popup';
//import below for Table Api
import {MatTableModule} from '@angular/material/table';
//import for sorting
import {MatSortModule} from '@angular/material/sort';
//Import for angular material datepicker API
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
//import {MatMomentDateModule} from '@angular/material-moment-adapter';
//import for mat-label API
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
//importing prime ng
import {OverlayPanelModule} from 'primeng/overlaypanel';
//import for browswe animations module
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { MeetingsListComponent } from './meetings-list/meetings-list.component';
import { DetailedMeetingComponent } from './detailed-meeting/detailed-meeting.component';
import { MeetingService } from './Services/meeting.service';
import { AddMeetingMinutesComponent } from './add-meeting-minutes/add-meeting-minutes.component';
import {MsalModule, MsalGuard} from '@azure/msal-angular';
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    NavigationBarComponent,
    HomeComponentComponent,
    CreateMeetingComponent,
    MeetingsListComponent,
    DetailedMeetingComponent,
    AddMeetingMinutesComponent
  ],
  imports: [
    

    BrowserModule,
    AppRoutingModule,
    //import below for popup window
    //PopupModule.forRoot(),
    //import below for working with forms
    FormsModule,
    //Use the below lines for using firedb
    AngularFireModule.initializeApp(environment.fireBase),//Basic module. 
    /*If we want Angular fire authentication, angualr fire database 
     and all we need some other modules*/
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    //import for angular tables
    MatTableModule,
    //import for sorting
    MatSortModule,
    //Import for angular material datepicker
    MatDatepickerModule,
    MatNativeDateModule,
    //Import below for working with routing
    //import for mat-label API
    MatFormFieldModule,
    MatInputModule,
    //import for browser animations
    BrowserAnimationsModule,
    //importing prime ng model
    OverlayPanelModule,
    AngularFireAuthModule,
    //import for microsoft auth
    MsalModule.forRoot({
      clientID: "f1ac7d06-f07e-4a1a-96f7-428bc851cf15",
      consentScopes: ["https://graph.microsoft.com/User.ReadWrite","user.read"],
      postLogoutRedirectUri: "http://localhost:4200/"
  }),
    RouterModule.forRoot([
      {path:'',component:HomeComponentComponent,canActivate: [MsalGuard]},
      {path:'Users',component:UserListComponent},
      {path:'DetailedMeeting',component:DetailedMeetingComponent},
      {path:'MeetingsList',component:MeetingsListComponent},
      {path:'CreateMeeting',component:CreateMeetingComponent},
      {path:'AddMeetingMinutes',component:AddMeetingMinutesComponent}
    ])
  ],
  providers: [MatDatepickerModule,MeetingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
