import { TokenStorageService } from './../../services/token-storage.service';
import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Treatement } from './../../classes/treatement';
import { AdminDetail } from './../../classes/admin-detail';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent implements OnInit {
  showRecord: boolean;
  patientDetails = new AdminDetail();
  public token = this.tokenService.getToken();

  patientRecordList: Treatement[];
  displayedColumns = ['treatmentId', 'physicianId', 'billAmount', 'date', 'time', 'labId', 'pharmacyRecordId', 'treatementRepostLink', 'medicines', 'test', 'remarks'];

  constructor(private adminService: AdminService, private router: Router, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
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
  ViewRecord(patientId, physicianId)
  {
    this.showRecord = true;
    this.adminService.getPatientById(patientId).subscribe(
      data => {
          this.patientDetails = data.data;
      }
    );

  }
}
