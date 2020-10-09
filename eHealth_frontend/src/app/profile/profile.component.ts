import { TokenStorageService } from './../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private tokenService = new TokenStorageService();
  token = this.tokenService.getToken();

 constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {



  }
  public logout()
  {

    this.adminService.logout();

  }
}
