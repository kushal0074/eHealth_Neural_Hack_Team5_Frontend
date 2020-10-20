import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailDetails } from 'src/app/classes/email-details';
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
  private tokenService = new TokenStorageService();
  physician: Physician = new Physician();
  availabilty: Availablity = new Availablity();
  appointment: Appointment = new Appointment();
  emailDetails: EmailDetails = new EmailDetails();


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
    this.appointment.patientId = this.tokenService.getUser().id;

    this.adminSerivce.saveAppointment(this.appointment, this.availabilty.availabilityId).subscribe(
      data => {
        console.log("appointment confirmed!!");
        this.router.navigateByUrl('patient/'+ this.tokenService.getToken());
      }
    )
  }

  sendEmail(){
    console.log(this.appointment.appointmentId);
    this.emailDetails.appointmentId = this.appointment.appointmentId;
    this.emailDetails.patientName = this.tokenService.getUser().firstName + ' ' +this.tokenService.getUser().lastName;
    this.emailDetails.physicianName = this.physician.firstName + " " + this.physician.lastName;
    this.emailDetails.date = this.appointment.date;
    this.emailDetails.time = this.appointment.startTime;
    console.log(this.tokenService.getUser().firstName + ' '+this.tokenService.getUser().email);
    this.emailDetails.patientEmail = this.tokenService.getUser().email;
    this.adminSerivce.sendEmail(this.emailDetails).subscribe(
      data => {
        console.log("Email Sent!!");
      }
    )
  }

  confirmAppointment(){
    this.saveAppointment();
    this.sendEmail();
  }

  public logout()
  {
    this.adminSerivce.logout();
  }

}
