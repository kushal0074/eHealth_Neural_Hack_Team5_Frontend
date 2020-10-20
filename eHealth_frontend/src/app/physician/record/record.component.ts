import { LabRecordPast } from 'src/app/classes/lab-record-past';
import { AdminDetail } from './../../classes/admin-detail';
import { Treatement } from './../../classes/treatement';
import { TokenStorageService } from './../../services/token-storage.service';
import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  dataSource: LabRecordPast[];

  showRecord: boolean;
  patientDetails = new AdminDetail();
  public token = this.tokenService.getToken();

  patientRecordList: Treatement[];
  displayedColumns = ['treatmentId', 'physicianId', 'billAmount', 'date', 'time', 'labId', 'pharmacyRecordId', 'treatementRepostLink', 'medicines', 'test', 'remarks'];
  testColumns = ['testName','testResults','date','time'];
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
    this.adminService.getAllRecordByPhysicianId(this.tokenService.getUser().id).subscribe(
      data => {
        console.log('record ' + data[0]);
        this.patientRecordList = data;
      }
    )
  }
  ViewRecord(patientId, physicianId,treatmentId)
  {
    console.log(treatmentId);
    this.showRecord = true;
    this.adminService.getPatientById(patientId).subscribe(
      data => {
          this.patientDetails = data.data;
      }
    );
    this.adminService.getLabTestRecords(treatmentId).subscribe(
      data => {
          this.dataSource = data;
        }
      );
  }
}
