import { Component, OnInit } from '@angular/core';
import { LabRecord } from '../classes/lab-record';
import { Physician } from '../classes/physician';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})
export class LaboratoryComponent implements OnInit {
  records : LabRecord[] = [];
  physician: Physician = new Physician();
  physicians: Physician[] = [];
  filters = {
    keyword: ''
  }
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    console.log("in ngonInit");
    this.listTestRecords();
  }

  listTestRecords(){
      this.adminService.getAllTestRecords().subscribe(
        data => this.records = data
      );
    // console.log("in list records");
    // this.adminService.getAllTestRecords().subscribe(
    //   data => {
    //     this.records = data
    //     for(let i=0;i<this.records.length;i++){
    //       this.getPhysician(this.records[i]);
    //     }

    //   }
    // );

  }

  // filterExpenses(records: LabRecord[]){
  //   return records.filter((e) => {
  //     return e.patientId.toLowerCase().includes(this.filters.keyword.toLowerCase());
  //   }).sort((a,b) => {
  //       return a.date < b.date ? -1 : 1;
  //   })
  // }

  // getPhysician(record: LabRecord){
  //     this.adminService.getPhysician(record.physicianId).subscribe(
  //       data => {
  //         this.physicians.push(data);
  //         console.log(this.physicians.length);
  //       }
  //     );
  // }

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
