import { Testrecord } from './../../classes/testrecord';
import { DialogBoxComponent } from './../../dialog-box/dialog-box.component';
import { Treatement } from './../../classes/treatement';
import { PharmacyCurrentRecord } from './../../classes/pharmacy-current-record';
import { AdminDetail } from './../../classes/admin-detail';
import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
export interface UsersData {
  name: string;
  id: number;
}
const dataSource: Testrecord[] = [
];
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})

export class BillingComponent implements OnInit {
  showRecord : boolean;
  treamentId: string;

  testRecord = dataSource;
  patientDetails = new AdminDetail();
  pharmacyCurrentRecord:  Treatement[];
  pharmacyRecordColumns = ['id','patient','physicianId','medicines','prescription','test','date','time'];
  displayedColumns = ['testname', 'testprice'];
  tokenstorageService = new TokenStorageService();


  @ViewChild('billTable') table: MatTable<Testrecord>;

 public token = this.tokenstorageService.getToken();
  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.showRecord = false;
    this.getAllRecords();
  }
  public logout()
  {
    this.adminService.logout();
  }
  getAllRecords()
  {
    this.adminService.getTreamentHistory().subscribe(
      data =>{
        this.pharmacyCurrentRecord = data;
      }
    );
  }
  calculation(){
    return this.testRecord.reduce((summ, v) => summ += v.testprice, 0)
    }
getClickedRow(row)
{
  this.treamentId = row.treatmentId;
  this.adminService.getPatientById(row.patientId).subscribe(
    data => {
        this.patientDetails = data.data;
    }
  );
  this.showRecord = true;

}
updatePayment()
{
  console.log('clicked');
  this.adminService.updatePaymentByAdmin(this.treamentId).subscribe(
    data =>{
      console.log(data);
    }
  );
  window.location.reload();
}


openDialog(action,obj) {
  obj.action = action;
  const dialogRef = this.dialog.open(DialogBoxComponent, {
    width: '250px',
    data: obj
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('result '+ result.data);
    if(result.event == 'Add'){
      this.addRowData(result.data);
    }
  });
}

addRowData(row_obj){
  let data1: Testrecord[] = [];
  data1 = (this.table.dataSource as Testrecord[]);
  console.log('test name '+row_obj.name);
  this.adminService.getTestRecordByName(row_obj.name).subscribe(
    data =>
    {
      data1.push(data);
      this.table.dataSource = data1;
      this.table.renderRows();
    }
  );
    this.testRecord = data1;
}
}
