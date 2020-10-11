import { TokenStorageService } from './../../services/token-storage.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  tokenstorageService = new TokenStorageService();
 public token = this.tokenstorageService.getToken();
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }
  public logout()
  {
    this.adminService.logout();
  }


}
