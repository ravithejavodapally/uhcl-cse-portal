import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CreateMeetingModel } from '../Models/CreateMeetingModel';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})
export class CreateMeetingComponent implements OnInit {
  showCreateMeetingForm:boolean;

  disableCheckBox:boolean=false;
  showAddAgendaItem:boolean;
  lblToThrowDepartmentNotSelectedError:boolean;
  createMeetingModelObject=new CreateMeetingModel();
  items:any[] = [{agenda:'',id:1,duration:0}];
  itemsArray:string[]=[];
  //selectedDepratmentsList:string[] = [];
   constructor(private db:AngularFirestore, private route:Router) {
     this.createMeetingModelObject.inlineCheckbox1 = true;
     this.onCheck(null);
   }
  submitToSaveMeeting(){
    //date formatting
    var date=new Date(this.createMeetingModelObject.date);
    this.createMeetingModelObject.formateddate= (date.getMonth() + 1) + "/" + date.getDate()+ "/" +date.getFullYear() ; 
    
    //time formatting
    // if(this.createMeetingModelObject.HH>'0' && this.createMeetingModelObject.HH<10){
    //   this.createMeetingModelObject.HH='0'+this.createMeetingModelObject.HH;

    // }
    // if(this.createMeetingModelObject.MM>=0 && this.createMeetingModelObject.MM<10){
    //   this.createMeetingModelObject.MM='0'+this.createMeetingModelObject.MM;
    // }
     this.createMeetingModelObject.time=this.createMeetingModelObject.HH+":"+this.createMeetingModelObject.MM+" "+this.createMeetingModelObject.noon;
     
     //duration formatting
     this.createMeetingModelObject.duration=this.createMeetingModelObject.duration+" Minutes";

     //department list formatting
     this.createMeetingModelObject.departmentList = this.populateSelectedDepartmentList();
     this.showCreateMeetingForm=!this.showCreateMeetingForm;
    
    //agenda list formatting
      for(let i=0;i<this.items.length;i++){
        if(this.items[i].agenda!=''){
          this.itemsArray.push(this.items[i].agenda);
         }
      }
    
    //saving to databases
    //saving to AgendaList collection
    this.db.collection("AgendaList").add({wholeAgendaList:this.items}).then(docref =>{
      //storing document id of AgendaList in a variable.
      this.createMeetingModelObject.documentIdOfAgendaListCollection = docref.id;
    });
    //saving to Meetings collection
    this.db.collection("Meetings").add({finalised:false,subject:this.createMeetingModelObject.subject,date:this.createMeetingModelObject.formateddate,time:this.createMeetingModelObject.time,duration:this.createMeetingModelObject.duration,hostedBy:this.createMeetingModelObject.hostedBy,department:this.createMeetingModelObject.departmentList
      ,agendaList:this.itemsArray,approvals:[],rejects:[] }).then(ref =>{
        this.db.collection("Meetings").doc(ref.id).update({documentIdOfAgendaListCollection:this.createMeetingModelObject.documentIdOfAgendaListCollection});
      });

 //formatting whole form to empty
 this.createMeetingModelObject=new CreateMeetingModel(); 

 //routing to MeetingListComponent
 this.route.navigate(['MeetingsList']);
  }

  cancel(){
    this.createMeetingModelObject=new CreateMeetingModel(); 
    this.route.navigate(['MeetingsList']);
  }
  onCheck(event){
    if(this.createMeetingModelObject.inlineCheckbox1){
      this.createMeetingModelObject.inlineCheckbox2=true;
      this.createMeetingModelObject.inlineCheckbox3=true;
      this.createMeetingModelObject.inlineCheckbox4=true;
      this.createMeetingModelObject.inlineCheckbox5=true;
      this.disableCheckBox=true;
    }
    else
    {
      this.disableCheckBox=false;
      this.createMeetingModelObject.inlineCheckbox2=false;
      this.createMeetingModelObject.inlineCheckbox3=false;
      this.createMeetingModelObject.inlineCheckbox4=false;
      this.createMeetingModelObject.inlineCheckbox5=false;

    }
  }
  populateSelectedDepartmentList(){
    if(!this.createMeetingModelObject.inlineCheckbox1 && !this.createMeetingModelObject.inlineCheckbox2
       && !this.createMeetingModelObject.inlineCheckbox3 && !this.createMeetingModelObject.inlineCheckbox4
       && !this.createMeetingModelObject.inlineCheckbox5){
        this.lblToThrowDepartmentNotSelectedError=true;
       }
    var array = [];
    if(this.createMeetingModelObject.inlineCheckbox2){
      array.push('CS');
    }
    if(this.createMeetingModelObject.inlineCheckbox3){
      array.push('CIS');
    }
    if(this.createMeetingModelObject.inlineCheckbox4){
      array.push('IT');
    }
    if(this.createMeetingModelObject.inlineCheckbox5){
      array.push('DS');
    }
    return array;
  }
  newAgendaItem(){
    console.log(this.items);
    let id = this.items.length+1;
    
    this.items.push({agenda:'',id:id,duration:null,meetingMinutes:null});
   
  }
  cancelAgendaItemInput(){
    this.items.pop();
  }
  ngOnInit() {
  }
  

}
