import { TokenStorageService } from './../services/token-storage.service';
import { Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospital-admin',
  templateUrl: './hospital-admin.component.html',
  styleUrls: ['./hospital-admin.component.css']
})
export class HospitalAdminComponent implements OnInit {
  private tokenService = new TokenStorageService();
  token = this.tokenService.getToken();
  constructor(private adminService : AdminService, private router : Router) { }

  ngOnInit(): void {

    }

    routeToAddMember()
    {

      this.router.navigate(['addmember', this.tokenService.getToken()]);
    }

    addMember(event: any)
    {
      if(event.target.value == 'Physician')
      {
        this.router.navigate(['add-member-physician/' + this.tokenService.getToken()]);
      }
      else if(event.target.value == 'Lab-Admin')
      {
        this.router.navigate(['add-member-lab/' + this.tokenService.getToken()]);
      }
      else if(event.target.value == 'Pharmacy-Admin')
      {
        this.router.navigate(['add-member-pharmacy/' + this.tokenService.getToken()]);
      }
    }
    public logout()
    {

      this.adminService.logout();

    }
}
