import { LabRecordPast } from './../../classes/lab-record-past';
import { TokenStorageService } from './../../services/token-storage.service';
import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Treatement } from './../../classes/treatement';
import { AdminDetail } from './../../classes/admin-detail';
import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent implements OnInit {

  showPrescription: boolean;
  dataSource: LabRecordPast[];
  treatmentRecord: Treatement;
  showRecord: boolean;
  physicianDetails = new AdminDetail();
  public token = this.tokenService.getToken();
  testColumns = ['testName', 'testResults', 'date', 'time'];
  patientRecordList: Treatement[];
  displayedColumns = ['treatmentId', 'physicianId', 'billAmount', 'date', 'time', 'labId', 'pharmacyRecordId', 'treatementRepostLink', 'medicines', 'test', 'remarks'];

  constructor(private adminService: AdminService, private router: Router, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.showPrescription = false;
    this.showRecord = false;
    this.getPatientRecord();

  }
  public logout()
  {
    this.adminService.logout();
  }
  public routeToApointment()
  {
    this.router.navigate(['pharmacian/appointment-panel', this.tokenService.getToken()]);
  }

  getPatientRecord()
  {
    this.adminService.getAllrecordsBtPatient(this.tokenService.getUser().id).subscribe(
      data => {
        console.log('record ' + data[0]);
        this.patientRecordList = data;
      }
    )
  }
  ViewRecord(patientId, physicianId, treatmentId)
  {
    this.showRecord = true;
    this.adminService.getPatientById(physicianId).subscribe(
      data => {
          this.physicianDetails = data.data;
      }
    );
    this.adminService.getLabTestRecords(treatmentId).subscribe(
      data => {
          this.dataSource = data;
        }
      );

    this.adminService.getTreatementById(treatmentId).subscribe(
     data => {
        this.treatmentRecord = data;
        this.showPrescription = true;
     }
   );

  }
}
