import { TokenStorageService } from './../../services/token-storage.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { AppointmentResponse } from 'src/app/classes/appointment-response';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public dataSource: AppointmentResponse[];
  private tokenService = new TokenStorageService();
  public token = this.tokenService.getToken();
  constructor(private adminService : AdminService) { }
  displayedColumns: string[] = ['appointmentId', 'physicianId', 'patientId', 'date','time'];
  ngOnInit(): void {
    console.log('appointment id ' + this.tokenService.getUser().id);
    this.adminService.getAppointmentById(this.tokenService.getUser().id).subscribe(
      data => {
        this.dataSource = data;

        console.log('appointment obj ' +data);
      }
    )

  }
  public logout()
  {
    this.adminService.logout();
  }

}
