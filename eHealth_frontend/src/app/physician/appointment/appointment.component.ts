import { Router } from '@angular/router';
import { Time } from '@angular/common';
import { Treatement } from './../../classes/treatement';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminDetail } from './../../classes/admin-detail';
import { TokenStorageService } from './../../services/token-storage.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { AppointmentResponse } from 'src/app/classes/appointment-response';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  private treatement = new Treatement();
  patientId: string;
  currentAppointmentId: string;
  showPatientTable = false;
  public patientSource: AdminDetail;
  public dataSource: AppointmentResponse[];
  private tokenService = new TokenStorageService();
  public token = this.tokenService.getToken();

  constructor(private adminService : AdminService,private router: Router) { }

  displayedColumns: string[] = ['appointmentId', 'physicianId', 'patientId', 'date','startTime','endTime'];
  ngOnInit(): void {
    console.log('appointment id ' + this.tokenService.getUser().id);
    this.adminService.getAppointmentById(this.tokenService.getUser().id).subscribe(
      data => {
        this.dataSource = data;
        console.log('appointment obj ' + data);
      }
    )

  }
  formPerscrption = new FormGroup({
    test : new FormControl('' , Validators.required),
    medicine : new FormControl('', Validators.required),
    remarks : new FormControl('' , Validators.required),
});

PhysicianRecord()
{

  this.treatement.medicines = this.Medicine.value;
  this.treatement.test = this.Test.value;
  this.treatement.prescription = this.Remarks.value;
  this.treatement.patientId = this.patientId;
  this.treatement.physicianId = this.tokenService.getUser().id;
  this.treatement.date = this.CurrentDate;
  this.treatement.time = this.CurrentTime;


  this.adminService.postPatientPrescriptions(this.treatement).subscribe(
    data => {
      if(data.status == 1)
      {
        alert('Submitted successfully');
        this.adminService.deleteAppointmentById(this.currentAppointmentId).subscribe(
          data=>{
            console.log(data);
          }
        )
        window.location.reload();
      }
    }
  );
}
  public logout()
  {
    this.adminService.logout();
  }

  getClickedRow(row)
  {
    this.patientId = row.patientId;
    this.currentAppointmentId = row.appointmentId;
    this.adminService.getPatientById(row.patientId).subscribe(
      data =>{
        this.showPatientTable = true;
        console.log('firstName '+ data.data.firstName);
        this.patientSource = data.data;
        console.log(this.patientSource.firstName);
      }
    )
  }
  viewPatientRecord(data)
  {
    console.log('onclicked '+data);


  }
  get Medicine()
  {
    return this.formPerscrption.get('medicine');
  }
  get Test()
  {
    return this.formPerscrption.get('test');
  }
  get Remarks()
  {
    return this.formPerscrption.get('remarks');
  }
  get CurrentDate()
  {
    let date = new Date();
    formatDate(new Date(), 'yyyy/MM/dd', 'en');


    return date;

  }
  get CurrentTime()
  {

    let date = new Date();
    formatDate(new Date(), 'yyyy/MM/dd', 'en');


    return date.getTime();

  }

}
