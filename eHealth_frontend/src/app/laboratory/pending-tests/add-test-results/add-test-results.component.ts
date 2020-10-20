import { TokenStorageService } from './../../../services/token-storage.service';
import { DatePipe, formatDate, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LabRecord } from 'src/app/classes/lab-record';
import { LabRecordPast } from 'src/app/classes/lab-record-past';
import { Physician } from 'src/app/classes/physician';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-test-results',
  templateUrl: './add-test-results.component.html',
  styleUrls: ['./add-test-results.component.css']
})
export class AddTestResultsComponent implements OnInit {
  physician: Physician = new Physician();
  physicianName: string;
  labRecord: LabRecord = new LabRecord();
  labRecordPast : LabRecordPast = new LabRecordPast();
  date: Date;
  time: Time;

  private tokenService= new TokenStorageService();

  constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute,private router: Router,  private datePipe: DatePipe) { }

  ngOnInit(): void {
    const isPhysicanIdPresent = this.activatedRoute.snapshot.paramMap.has('physicianId');
    if(isPhysicanIdPresent){
      const physicianId = this.activatedRoute.snapshot.paramMap.get("physicianId");

      this.adminService.getPhysician(physicianId).subscribe(
        data => {
          this.physician = data;
          this.physicianName = "Dr. "+ this.physician.firstName + " " + this.physician.lastName;
        }
      );
    }

    const isTestIdPresent = this.activatedRoute.snapshot.paramMap.has('testId');
    if(isTestIdPresent){
      const testId = this.activatedRoute.snapshot.paramMap.get("testId");
      this.adminService.getTestRecord(testId).subscribe(
        data => {
          this.labRecord = data;

        }
      );
    }
  }

  saveRecord(){
    this.labRecordPast.patientId = this.labRecord.patientId;
    this.labRecordPast.physicianId = this.labRecord.physicianId;
    this.labRecordPast.testName = this.labRecord.testName;
    this.labRecordPast.treatmentId = this.labRecord.treatmentId;
    this.date = new Date();


    //current date
    this.labRecordPast.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    //current time
    this.labRecordPast.time = this.datePipe.transform(this.date, 'hh:mm:ss');


    this.adminService.saveTestRecordPast(this.labRecordPast, this.labRecord.testId).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl("/laboratory-panel/"+ this.tokenService.getToken());
      }
    );

  }

  getCurrentTime(){
    let date = new Date();
    formatDate(new Date(), 'yyyy/MM/dd', 'en');

    return date.getTime();
  }

  public logout()
  {
    this.adminService.logout();
  }

}
