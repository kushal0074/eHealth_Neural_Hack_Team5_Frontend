import { Medicinerecord } from './../classes/medicinerecord';
import { Labrecord } from './../classes/labrecord';
import { Testrecord } from './../classes/testrecord';
import { PharmacyCurrentRecord } from './../classes/pharmacy-current-record';
import { Treatement } from './../classes/treatement';
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
import { LabRecord } from '../classes/lab-record';
import { LabRecordPast } from '../classes/lab-record-past';
import { Time } from '@angular/common';
import { EmailDetails } from '../classes/email-details';


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
      const url = this.baseUrl + 'register';
      return this.http.post(url,
       adminDetail, httpOptions);
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

addDoctor(doctordetail: DoctorDetail): Observable<any>
{
  return this.http.post(this.baseUrl + 'addPhysician', doctordetail, httpOptions);
}

// physician service
getAppointmentById(id: string): Observable<AppointmentResponse[]>
{
  return this.http.get<GetResponse>(this.baseUrl + 'appointment/get-appointment/' + id).pipe(
    map(response => response.data)
  );
}
getPhysician(physicianId: String): Observable<Physician>
{
  return this.http.get<Physician>(`http://localhost:8085/appointment/get-physician/${physicianId}`).pipe(
    map(response => response)
  );
}

getPhysicians(speciality: String): Observable<Physician[]>
{

  return this.http.get<Physician[]>(`http://localhost:8085/appointment/get-physicians/${speciality}`).pipe(
    map(response => response)
  );
}

getAvailibilty(availablityId: string): Observable<Availablity>
{
  return this.http.get<Availablity>(`http://localhost:8085/appointment/get-slot/${availablityId}`);
}

getAvailableSlots(physicianId: string, date: Date): Observable<Availablity[]>
{
  

  return this.http.get<Availablity[]>(`http://localhost:8085/appointment/get-slots/${physicianId}/${date}`);
}
//
saveAppointment(appointment: Appointment, availabilityId: String): Observable<Appointment>{
  return this.http.post<Appointment>(`http://localhost:8085/appointment/set-appointment/${availabilityId}`, appointment);
}
saveTreatementInLab(labrecord: Labrecord) :Observable<any>
{
  return this.http.post(this.baseUrl + 'lab/add-lab-records', labrecord,httpOptions);
}
saveTreatementInPharmacy(phrecord: PharmacyCurrentRecord) :Observable<any>
{
  return this.http.post(this.baseUrl + 'pharmacy/add-record', phrecord,httpOptions);
}

getPatientById(id: string): Observable<any>
{
  return this.http.get(this.baseUrl + 'user/user-by-id/' + id);
}

getAllrecordsBtPatient(patientId):Observable<Treatement[]>
{
  return this.http.get<GetRecord>(this.baseUrl + 'history/get-all-records-by-patient-id/' + patientId).pipe(
    map(response => response.data)
  );
}


sendEmail(emailDetails: EmailDetails): Observable<EmailDetails>{
  return this.http.post<EmailDetails>(`http://localhost:8084//send/Email`, emailDetails);
}
getTestRecord(testId: String): Observable<LabRecord>
{
  return this.http.get<GetLabRecord>(`http://localhost:8090/laboratory/get-labrecord/${testId}`).pipe(
    map(response => response.data)
  )
}

getAllTestRecords(): Observable<LabRecord[]>{
  return this.http.get<GetTestRecords>(`http://localhost:8090/laboratory/get-labrecords-all`).pipe(
    map(response => response.data)
  );
}
saveTestRecordPast(labRecordPast : LabRecordPast, testId : String) : Observable<LabRecordPast>{
  return this.http.post<GetTestRecordPast>(`http://localhost:8090/laboratory/add-past-testrecord/${testId}`, labRecordPast).pipe(
    map(response => response.data)
  );
}


postPatientPrescriptions(treatement: Treatement): Observable<any>
{
  return this.http.post(this.baseUrl + 'history/insert-history', treatement);
}

getAllRecordByPhysicianId(physicianId: string): Observable<Treatement[]>
{
  return this.http.get<GetRecord>(this.baseUrl + 'history/get-all-records-by-physician-id/' + physicianId).pipe(
    map(response => response.data)
  );
}

deleteAppointmentById(appointmentId)
{
  console.log('called delete ' + appointmentId);
  return this.http.get(this.baseUrl + 'appointment/delete-appointment/' + appointmentId, httpOptions);
}


// Pharmacy
getAllRecords(): Observable<PharmacyCurrentRecord[]>
{
  return this.http.get<GetPharmacyRecord>(this.baseUrl + 'pharmacy/get-all-records', httpOptions).pipe(
    map(response => response.data)
  );
}

getMedicineByName(name: string): Observable<Medicinerecord>
{
  return this.http.get<GetMedcineRecord>(this.baseUrl +'pharmacy/get-medicine-by-name/' +name).pipe(
    map(response => response.data)
  );
}
updatePaymentByPharmacy(id: string): Observable<PharmacyCurrentRecord>
{
  return this.http.get<GetPharmacy>(this.baseUrl + 'pharmacy/get-pharmacy-by-id/'+ id).pipe(
    map(response => response.data)
  );
}

insertHistory(pharmacy){
  return this.http.post(this.baseUrl + 'pharmacy/history/insert-history', pharmacy, httpOptions);
}
deleteRecord(pharmacy): Observable<any>
{
  return this.http.get(this.baseUrl + 'pharmacy/delete-record/'+ pharmacy.id, httpOptions);
}


//hospital-admin
getTreamentHistory(): Observable<Treatement[]>
{
  return this.http.get<GetRecord>(this.baseUrl + 'history/get-all-records-to-be-paid').pipe(
    map(response => response.data)
  );
}
getTestRecordByName(name: string) : Observable<Testrecord>
{
  return this.http.get<GetTestRecord>(this.baseUrl + 'history/get-test-by-name/' + name).pipe(
    map(response => response.data)
  );
}

updatePaymentByAdmin(id): Observable<any>
{
  return this.http.get(this.baseUrl + 'history/update-payment/' + id);
}
}
interface GetPharmacy
{
  data : PharmacyCurrentRecord;
}
interface GetTestRecord
{
  data: Testrecord;
}
interface GetMedcineRecord
{
  data: Medicinerecord;
}

interface GetTestRecordPast
{
  data : LabRecordPast
}
interface GetLabRecord
{
  data : LabRecord
}

interface GetTestRecords
{
  data : LabRecord[];
}
interface GetPharmacyRecord
{
    data: PharmacyCurrentRecord[];
}

interface GetRecord
{
    data: Treatement[];
}



interface GetResponse
{
    data: AppointmentResponse[];
}
