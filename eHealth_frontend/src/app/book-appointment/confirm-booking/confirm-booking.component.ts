import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../../classes/appointment';
import { Availablity } from '../../classes/availablity';
import { Physician } from '../../classes/physician';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {
  physician: Physician = new Physician();
  availabilty: Availablity = new Availablity();
  appointment: Appointment = new Appointment();
  
  constructor(private adminSerivce: AdminService, private activatedRoute: ActivatedRoute, private router: Router) { }

  
  ngOnInit(): void {
    const isIdPresentPhysician = this.activatedRoute.snapshot.paramMap.has('physicianId');
    if(isIdPresentPhysician){
      const id = this.activatedRoute.snapshot.paramMap.get('physicianId');

      this.adminSerivce.getPhysician(id).subscribe(
        data => this.physician = data
      );
      
    }

    const isIdPresenAvailibilty = this.activatedRoute.snapshot.paramMap.has('availabilityId');
    if(isIdPresenAvailibilty){
      const id = this.activatedRoute.snapshot.paramMap.get('availabilityId');
      this.adminSerivce.getAvailibilty(id).subscribe(
        data => this.availabilty = data
      );
    }
     
  }

  saveAppointment(){
    this.appointment.date = this.availabilty.date;
    this.appointment.physicianId = this.physician.physicianId;
    this.appointment.startTime = this.availabilty.startTime;
    this.appointment.endTime = this.availabilty.endTime;
    this.appointment.date = this.availabilty.date;
    this.appointment.patientId ="000000";

    this.adminSerivce.saveAppointment(this.appointment, this.availabilty.availabilityId).subscribe(
      data => {
        console.log("appointment confirmed!!");
        this.router.navigateByUrl('/bookappointment');
      }
    )
  }

}
