import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
selectedMeeting:any;
selectedMeetingSubject:BehaviorSubject<any>=new BehaviorSubject(null);
//this is something like a pipe.
  constructor() { }
  setDataFromMeetingList(selectedMeeting){
this.selectedMeeting = selectedMeeting;
//opening and putting data
console.log(this.selectedMeeting);
this.selectedMeetingSubject.next(this.selectedMeeting);
  }
  getSelectedMeetingObj(){
//broadcasting where ever opening is find.
     return this.selectedMeetingSubject.asObservable();
  }

}
