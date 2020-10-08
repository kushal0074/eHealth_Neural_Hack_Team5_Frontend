import { TokenStorageService } from './../../services/token-storage.service';
import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  public token = this.tokenService.getToken();
  constructor(private adminService: AdminService, private router: Router, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
  }
  public logout()
  {
    this.adminService.logout();
  }
  public routeToApointment()
  {
    this.router.navigate(['pharmacian/appointment-panel',this.tokenService.getToken()]);
  }

}
