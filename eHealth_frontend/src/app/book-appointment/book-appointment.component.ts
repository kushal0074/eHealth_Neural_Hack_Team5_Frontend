import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { TokenStorageService } from './../services/token-storage.service';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Physician } from 'src/app/classes/physician';
import { Availablity } from '../classes/availablity';
import { Appointment } from '../classes/appointment';
import { Time } from '@angular/common';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  physicians: Physician[];
  public showDateAndTimeSlotFor: string;
  tokenService = new TokenStorageService();
  token = this.tokenService.getToken();
  availableSlots: Availablity[];
  appointment = new Appointment();
  slotSelected: Time;
  constructor(private adminService: AdminService,private router: Router) { }

dateForm = new FormGroup({
  appointMentDate : new FormControl('' , Validators.required)
});


  ngOnInit(): void {
    // this.showDateAndTimeSlotFor = false;
  }

  listPhysicians(event: any){

    this.adminService.getPhysicians(event.target.value).subscribe(
      data => this.physicians = data
    )

  }

  showDateAndSlot(physicianId: string){

    console.log("physicanshow " + physicianId);
    this.showDateAndTimeSlotFor = physicianId;
    console.log(this.showDateAndTimeSlotFor);
    this.availableSlots = [];

  }

  getAvailableSlots(physicianId: string){
    this.adminService.getAvailableSlots(physicianId, this.appointment.date).subscribe(
      data => this.availableSlots = data
    )
  }
  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
}
  public logout()
  {
    this.adminService.logout();
  }
  moveToconfirmBooking(physicianId,availiblityId){
      this.router.navigate(['patient/confirm-booking/'+ physicianId + '/' + availiblityId]);
  }
}
