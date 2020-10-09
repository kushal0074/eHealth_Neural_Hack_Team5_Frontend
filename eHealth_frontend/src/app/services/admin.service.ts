import { AppointmentResponse } from './../classes/appointment-response';
import { DoctorDetail } from './../classes/doctor-detail';
import { FormGroup } from '@angular/forms';
import { TokenStorageService } from './token-storage.service';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AdminDetail } from '../classes/admin-detail';
import { Router } from '@angular/router';
import { Availablity } from '../classes/availablity';
import { Appointment } from '../classes/appointment';
import { Physician } from '../classes/physician';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private tokenService = new TokenStorageService();
  private  baseUrl = 'http://localhost:8080/';
  private loginUrl = this.baseUrl + 'authenticate';
  constructor(private http: HttpClient, private router: Router) { }
  saveAdminDetails(adminDetail: AdminDetail): Observable<any>
  {
      let url = this.baseUrl + 'register';
      return this.http.post(url,
        {
        firstName : adminDetail.firstName,
        lastName :  adminDetail.lastName,
        emailId :  adminDetail.emailId,
        username  : adminDetail.username,
        phone : adminDetail.phone,
        password : adminDetail.password,
        roles : [
          {
            role : 'PATIENT'
          }
        ]
      }, httpOptions);
  }
  login(adminDetail: AdminDetail): Observable<any>
  {
      return this.http.post(this.loginUrl, adminDetail, httpOptions);
  }

  logout()
  {
    this.tokenService.signOut();
    this.router.navigate(['login']);
  }

getAllUsers(): Observable<any>
{
    return this.http.get(this.baseUrl + 'admin/getAllUsers', httpOptions);
}

addDoctor(doctordetail : DoctorDetail): Observable<any>
{
  return this.http.post(this.baseUrl + 'addPhysician', doctordetail, httpOptions);
}

// physician service
getAppointmentById(id: string): Observable<AppointmentResponse[]>
{
  return this.http.get<GetResponse>(this.baseUrl + 'appointment/get-appointment/'+ id).pipe(
    map(response => response.data)
  );
}
getPhysician(physicianId : String) : Observable<Physician>
{
  return this.http.get<Physician>(`http://localhost:8085/appointment/get-physician/${physicianId}`).pipe(
    map(response => response)
  );
}

getPhysicians(speciality: String) : Observable<Physician[]>
{
  
  return this.http.get<Physician[]>(`http://localhost:8085/appointment/get-physicians/${speciality}`).pipe(
    map(response => response)
  )
}

getAvailibilty(availablityId: String): Observable<Availablity>
{
  return this.http.get<Availablity>(`http://localhost:8085/appointment/get-slot/${availablityId}`)
}

getAvailableSlots(physicianId: String, date: Date): Observable<Availablity[]>
{
  console.log("date" + date);
  console.log("id" + physicianId);
  return this.http.get<Availablity[]>(`http://localhost:8085/appointment/get-slots/${physicianId}/${date}`)
}

saveAppointment(appointment : Appointment, availabilityId: String): Observable<Appointment>{
  return this.http.post<Appointment>(`http://localhost:8085/appointment/set-appointment/${availabilityId}`, appointment);
}

}
interface GetResponse
{
    data: AppointmentResponse[];
}
