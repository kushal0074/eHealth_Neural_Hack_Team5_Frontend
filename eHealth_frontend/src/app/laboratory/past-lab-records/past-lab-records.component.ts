import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { LabRecordPast } from 'src/app/classes/lab-record-past';
import { AdminService } from 'src/app/services/admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 

@Component({
  selector: 'app-past-lab-records',
  templateUrl: './past-lab-records.component.html',
  styleUrls: ['./past-lab-records.component.css']
})
export class PastLabRecordsComponent implements OnInit {

  pastRecords: LabRecordPast[] = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  modalRef: BsModalRef;
  constructor(private adminService: AdminService, private httpClient: HttpClient,private modalService: BsModalService ) { }

  ngOnInit(): void {
    this.listPastLabTestRecords();
  }

  listPastLabTestRecords(){
    this.adminService.getAllPastRecords().subscribe(
      data => this.pastRecords = data
    );
  }

  public logout()
  {
    this.adminService.logout();
  }

  getImage(testId: String) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8090/laboratory/image/get/' + testId)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          console.log(this.retrieveResonse.name + " nadjnjads");
          console.log(this.retrieveResonse.testId + "test ID");
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  openModalWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg' })  
    );  
  }  

  openModal(template: TemplateRef<any>, testId: String ){
    this.getImage(testId);
    this.openModalWithClass(template);
  }

}
