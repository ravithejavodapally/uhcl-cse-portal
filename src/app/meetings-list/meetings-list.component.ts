import { CreateMeetingModel } from './../Models/CreateMeetingModel';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DetailedMeetingComponent } from '../detailed-meeting/detailed-meeting.component';
import { MeetingService } from '../Services/meeting.service';
import {MatTableDataSource} from '@angular/material/table';
//Router is for navigation between components/pages
import { Router } from '@angular/router';
import { AuthorizationServiceService } from '../Services/authorization-service.service';
@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.css']
})
export class MeetingsListComponent implements OnInit {
meetings:any;
loggedInUserDataFromDB:any=null;
//detailedMeetingComponentObject=new DetailedMeetingComponent();
agendaList:any[];
displayedColumns: string[] = ['Subject', 'Date','Time','Duration', 'Department', 'HostedBy','AgendaList'];
  constructor(private db1:AngularFirestore, private meetingService:MeetingService, private route:Router, private authorizationService:AuthorizationServiceService){
    db1.collection("Meetings").valueChanges().subscribe(data=>
      {this.meetings=new MatTableDataSource(data);
    });
    this.authorizationService.getUserFromAuthorizationServiceObj().subscribe(data => {
      this.loggedInUserDataFromDB = data;
      console.log("in nav bar",this.loggedInUserDataFromDB);
    });
   }
   getMeeting(meet){ 
    this.meetingService.setDataFromMeetingList(meet)
    this.route.navigate(['DetailedMeeting']);
    
   }
   createMeeting(){
     this.route.navigate(['CreateMeeting']);
   }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.meetings.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

  }

}
