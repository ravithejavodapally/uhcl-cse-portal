import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { CreateMeetingModel } from '../Models/CreateMeetingModel';
import { MeetingService } from '../Services/meeting.service';
import { Router } from '@angular/router';
import { AuthorizationServiceService } from '../Services/authorization-service.service';
@Component({
  selector: 'app-detailed-meeting',
  templateUrl: './detailed-meeting.component.html',
  styleUrls: ['./detailed-meeting.component.css']
})
export class DetailedMeetingComponent implements OnInit {
showDetailedMeeting:boolean=false;
finalised:boolean=true;
rejectClicked:boolean=false;
selectedMeeting:CreateMeetingModel;
loggedInUserDataFromDB:any=null;
commentByUser:any[];
createMeetingModelObject2=new CreateMeetingModel();
agendaList:any[];
comment:any;
  constructor(private meetingService:MeetingService,private route:Router, private db:AngularFirestore,private authorizationService:AuthorizationServiceService) {
    this.authorizationService.getUserFromAuthorizationServiceObj().subscribe(data => {
      this.loggedInUserDataFromDB = data;
      console.log("in nav bar",this.loggedInUserDataFromDB);
    });
   }

  ngOnInit() {
    this.meetingService.getSelectedMeetingObj().subscribe(data => {
      this.selectedMeeting = data;
      this.comment = this.selectedMeeting['comments'][this.loggedInUserDataFromDB.emailId];
      this.db.collection("AgendaList").doc(this.selectedMeeting.documentIdOfAgendaListCollection).valueChanges().subscribe(data => this.agendaList = data['wholeAgendaList']);
      console.log(this.selectedMeeting);
     });
    }
    showAddMeetingMinutesForm(){
      console.log(this.agendaList);
      this.db.collection("AgendaList").doc(this.selectedMeeting.documentIdOfAgendaListCollection).update({wholeAgendaList:this.agendaList});
      //this.route.navigate(['AddMeetingMinutes']);
    }
    finaliseMeetingMinutes(){
      //this.finalised=true;
      this.db.collection("Meetings").doc('VtxIlGlXbUMKRufUzoLk').update({finalised:true})

    }

    rejectButtonClicked(){
      this.rejectClicked=true;
      if (!this.selectedMeeting.rejects.some((item) => item == this.loggedInUserDataFromDB.emailId)) {
        this.selectedMeeting.rejects.push(this.loggedInUserDataFromDB.emailId);
    }
    
    this.db.collection("Meetings").doc('VtxIlGlXbUMKRufUzoLk').update({rejects:this.selectedMeeting.rejects})
    }
    approveButtonClicked(){
      if (!this.selectedMeeting.approvals.some((item) => item == this.loggedInUserDataFromDB.emailId)) {
        this.selectedMeeting.approvals.push(this.loggedInUserDataFromDB.emailId);      
    }
    if (this.selectedMeeting.rejects.some((item) => item == this.loggedInUserDataFromDB.emailId)) {
      this.selectedMeeting.rejects.splice(this.selectedMeeting.rejects.indexOf(this.loggedInUserDataFromDB.emailId),1);
      }
    this.db.collection("Meetings").doc('VtxIlGlXbUMKRufUzoLk').update({comments:{[this.loggedInUserDataFromDB.emailId]:this.comment}, rejects:this.selectedMeeting.rejects,approvals:this.selectedMeeting.approvals})
    }
    saveComment(){
      //this.commentByUser.append()
      //this
      this.rejectClicked=false;
      this.db.collection("Meetings").doc('VtxIlGlXbUMKRufUzoLk').update({comments:{[this.loggedInUserDataFromDB.emailId]:this.comment}})
    }
    cancelCommentSection(){
      this.rejectClicked=false;
    }

}

 



