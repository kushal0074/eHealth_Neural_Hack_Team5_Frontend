import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin.service';

import { LabRecordPast } from 'src/app/classes/lab-record-past';
import { OnInit, TemplateRef, Component } from '@angular/core';


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

  private modalRef: BsModalRef;
constructor(private adminService: AdminService, private httpClient: HttpClient, private modalService: BsModalService) {

}

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
    this.httpClient.get('http://localhost:8086/laboratory/image/get/' + testId)
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

  openModal(template: TemplateRef<any>, testId: string ){
    this.getImage(testId);
    this.openModalWithClass(template);
  }

}
