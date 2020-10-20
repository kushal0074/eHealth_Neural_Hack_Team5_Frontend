import { Component, OnInit } from '@angular/core';
import { LabRecord } from 'src/app/classes/lab-record';
import { Physician } from 'src/app/classes/physician';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-pending-tests',
  templateUrl: './pending-tests.component.html',
  styleUrls: ['./pending-tests.component.css']
})
export class PendingTestsComponent implements OnInit {

  records: LabRecord[] = [];
  physician: Physician = new Physician();
  physicians: Physician[] = [];
  filters = {
    keyword: ''
  }

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.listTestRecords();
  }

  listTestRecords(){
    this.adminService.getAllTestRecords().subscribe(
      data => this.records = data
      );
  }

  getPhysician(physicianId: string){
    console.log("hvadsjvad");
    this.adminService.getPhysician(physicianId).subscribe(
      data => this.physician = data
    );
  }

  public logout()
  {
    this.adminService.logout();
  }

}
