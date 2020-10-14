import { AdminDetail } from './../../classes/admin-detail';
import { PharmacyCurrentRecord } from './../../classes/pharmacy-current-record';
import { TokenStorageService } from './../../services/token-storage.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  showRecord : boolean;
  medicineSplitted: string[];
  patientDetails = new AdminDetail();
  pharmacyCurrentRecord: PharmacyCurrentRecord[];
  pharmacyRecordColumns = ['id','patient','physicianId','medicines','prescription','date','time'];
  tokenstorageService = new TokenStorageService();
 public token = this.tokenstorageService.getToken();
  constructor(private adminService: AdminService) { }

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
  this.medicineSplitted = row.medicine.split(',');


}
}

