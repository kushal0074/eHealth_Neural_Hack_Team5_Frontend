import { TokenStorageService } from './../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.css']
})
export class PhysicianComponent implements OnInit {
  private tokenService = new TokenStorageService();
  public token = this.tokenService.getToken();
  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }

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
