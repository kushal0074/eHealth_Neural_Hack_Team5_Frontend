import { PharmacyCurrentRecord } from './../../classes/pharmacy-current-record';
import { Labrecord } from './../../classes/labrecord';
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

  private labrecord = new Labrecord();
  private phrecord = new PharmacyCurrentRecord();
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
        console.log(this.dataSource);
      }
    );

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

  //lab
  this.labrecord.date = this.CurrentDate;
  this.labrecord.time = this.CurrentTime;
  this.labrecord.patientId = this.patientId;
  this.labrecord.physicianId = this.tokenService.getUser().id;
  this.labrecord.testName = this.Test.value;

  this.phrecord.date = this.CurrentDate;
  this.phrecord.time = this.CurrentTime;
  this.phrecord.patientId = this.patientId;
  this.phrecord.physicianId = this.tokenService.getUser().id;
  this.phrecord.medicine = this.Medicine.value;
  this.phrecord.prescription = this.Remarks.value;


  this.adminService.postPatientPrescriptions(this.treatement).subscribe(
    data => {
      if(data.status == 1)
      {
        alert('Submitted successfully');
        this.labrecord.treatmentId = data.data.treatmentId;
        this.phrecord.treatmentId = data.data.treatmentId;
        this.adminService.saveTreatementInLab(this.labrecord).subscribe(
        data =>
        {
           console.log('lab'+data);
        }
        );
        this.adminService.saveTreatementInPharmacy(this.phrecord).subscribe(
        data =>
        {
          console.log('ph'+data);
        }
        );
        this.adminService.deleteAppointmentById(this.currentAppointmentId).subscribe(
          data =>
          {
            console.log(data);
          }
        );
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
