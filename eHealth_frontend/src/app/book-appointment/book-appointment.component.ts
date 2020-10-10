import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Physician } from 'src/app/classes/physician';
import { ActivatedRoute } from '@angular/router';
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
  showDateAndTimeSlotFor: String;
  availableSlots: Availablity[];
  appointment = new Appointment();
  slotSelected: Time;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  listPhysicians(event: any){

    this.adminService.getPhysicians(event.target.value).subscribe(
      data => this.physicians = data
    )

  }

  showDateAndSlot(physicianId: String){
    this.showDateAndTimeSlotFor = physicianId;
    this.availableSlots = [];
  }

  getAvailableSlots(physicianId: String){
    this.adminService.getAvailableSlots(physicianId, this.appointment.date).subscribe(
      data => this.availableSlots = data
    )
  }




}

