import { TokenStorageService } from './../services/token-storage.service';

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {
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
