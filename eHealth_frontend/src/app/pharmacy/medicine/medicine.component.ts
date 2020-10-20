import { DialogBoxComponent } from './../../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Medicinerecord } from './../../classes/medicinerecord';
import { AdminDetail } from './../../classes/admin-detail';
import { PharmacyCurrentRecord } from './../../classes/pharmacy-current-record';
import { TokenStorageService } from './../../services/token-storage.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';


const dataSource: Medicinerecord[] = [
];

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {

  pharmacyId: string;
  medicineDatasource = dataSource;
  showRecord : boolean;
  medicineSplitted: string[];
  patientDetails = new AdminDetail();
  pharmacyCurrentRecord: PharmacyCurrentRecord[];
  pharmacyRecordColumns = ['id','patient','physicianId','medicines','prescription','date','time'];
  displayedColumns = ['name','price'];
  tokenstorageService = new TokenStorageService();
 public token = this.tokenstorageService.getToken();


 @ViewChild('billTable') table: MatTable<Medicinerecord>;

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
    this.adminService.getAllRecords().subscribe(
      data =>{
        this.pharmacyCurrentRecord = data;
      }
    );
  }
getClickedRow(row)
{

  this.adminService.getPatientById(row.patientId).subscribe(
    data => {
        this.patientDetails = data.data;
    }
  );
  this.showRecord = true;
  this.pharmacyId = row.id;


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
  let data1: Medicinerecord[] = [];
  data1 = (this.table.dataSource as Medicinerecord[]);
  console.log('test name '+row_obj.name);
  this.adminService.getMedicineByName(row_obj.name).subscribe(
    data =>
    {
      if(data != null){
      data1.push(data);
      this.table.dataSource = data1;
      this.table.renderRows();
      }
    }
  );
  this.medicineDatasource = data1;
  this.table.renderRows();
}

updatePayment()
{
  this.adminService.updatePaymentByPharmacy(this.pharmacyId).subscribe(
    data =>
    {
      console.log('data obj '+data);
      console.log(data);
      this.adminService.insertHistory(data).subscribe(
        data => {
          console.log(data);
        }
      );
      this.adminService.deleteRecord(data).subscribe(
        data => {
          console.log(data);
  window.location.reload();

        }
      );
    }
  );
}
calculation(){
    return this.medicineDatasource.reduce((summ, v) => summ += v.price, 0)
    }
}

