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
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
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

// Authorisation

  //signup -- kushal
  saveAdminDetails(adminDetail: AdminDetail): Observable<any>
  {
      const url = this.baseUrl + 'register';
      return this.http.post(url,
       adminDetail, httpOptions);
  }

  //login -- kushal
  login(adminDetail: AdminDetail): Observable<any>
  {
      return this.http.post(this.loginUrl, adminDetail, httpOptions);
  }

  //logout -- kushal
  logout()
  {
    this.tokenService.signOut();
    this.router.navigate(['login']);
  }

// Pharmacy Module
//register doctor -- kushal
addDoctor(doctordetail: DoctorDetail): Observable<any>
{
  return this.http.post(this.baseUrl + 'addPhysician', doctordetail, httpOptions);
}

// physician service, fetching appointments from id -- kushal
 getAppointmentById(id: string): Observable<AppointmentResponse[]>
{
  return this.http.get<GetResponse>(this.baseUrl + 'appointment/get-appointment/' + id).pipe(
    map(response => response.data)
  );
}

// fetching physician --  added by gautam
getPhysician(physicianId: string): Observable<Physician>
{
  return this.http.get<Physician>(`http://localhost:8085/appointment/get-physician/${physicianId}`).pipe(
    map(response => response)
  );
}

//fetching physicians by speciality Physician Module -- gautam
getPhysicians(speciality: String): Observable<Physician[]>
{

  return this.http.get<Physician[]>(`http://localhost:8085/appointment/get-physicians/${speciality}`).pipe(
    map(response => response)
  );
}

// Get Availablity  : Slots  -- gautam
getAvailibilty(availablityId: string): Observable<Availablity>
{
  return this.http.get<Availablity>(`http://localhost:8085/appointment/get-slot/${availablityId}`);
}

// get Available slots for particular date -- Gautam
getAvailableSlots(physicianId: string, date: Date): Observable<Availablity[]>
{
  return this.http.get<Availablity[]>(`http://localhost:8085/appointment/get-slots/${physicianId}/${date}`);
}

// Create a Appointment with avialablity id --gautam
saveAppointment(appointment: Appointment, availabilityId: String): Observable<Appointment>{
  return this.http.post<Appointment>(`http://localhost:8085/appointment/set-appointment/${availabilityId}`, appointment);
}

// add prescription in lab -- kushal
saveTreatementInLab(labrecord: Labrecord) :Observable<any>
{
  return this.http.post(this.baseUrl + 'lab/add-lab-records', labrecord,httpOptions);
}

// add prescription in pharmacy -- kushal
saveTreatementInPharmacy(phrecord: PharmacyCurrentRecord) :Observable<any>
{
  return this.http.post(this.baseUrl + 'pharmacy/add-record', phrecord,httpOptions);
}

// fetching patient by id -- kushal
getPatientById(id: string): Observable<any>
{
  return this.http.get(this.baseUrl + 'user/user-by-id/' + id);
}

// fetch lab records by treatmentid -- kushal
getLabTestRecords(id: string): Observable<LabRecordPast[]>
{
  return this.http.get<GetLabTestrecord>(this.baseUrl + 'lab/get-lab-test-by-treatment-id/'+ id).pipe(
    map(response => response.data)
  );
}

// get prescription by id --kushal
getTreatementById(treatmentid: string): Observable<Treatement>
{
  return this.http.get<GetTreatement>(this.baseUrl + 'history/get-history-by-id/' +treatmentid).pipe(
    map(response => response.data)
  );
}

//fetch all records associated  with patient id -- kushal
getAllrecordsBtPatient(patientId):Observable<Treatement[]>
{
  return this.http.get<GetRecord>(this.baseUrl + 'history/get-all-records-by-patient-id/' + patientId).pipe(
    map(response => response.data)
  );
}

//lab-admin, send mail api-- gautam
sendEmail(emailDetails: EmailDetails): Observable<EmailDetails>{
  return this.http.post<EmailDetails>(`http://localhost:8084//send/Email`, emailDetails);
}

// fetch test record by test id -- gautam
getTestRecord(testId: String): Observable<LabRecord>
{
  return this.http.get<GetLabRecord>(`http://localhost:8086/laboratory/get-labrecord/${testId}`).pipe(
    map(response => response.data)
  );
}

// fetch all lab records in lab module -- gautam
getAllTestRecords(): Observable<LabRecord[]>{
  return this.http.get<GetTestRecords>(`http://localhost:8086/laboratory/get-labrecords-all`).pipe(
    map(response => response.data)
  );
}

// fetch all performed test records --  gautam
getAllPastRecords(): Observable<LabRecordPast[]>{
  return this.http.get<GetPastLabRecords>(`http://localhost:8086/laboratory/get-labrecords-all-past`).pipe(
    map(response => response.data)
  );
}

// add performed record in Past records -- gautam
saveTestRecordPast(labRecordPast : LabRecordPast, testId : String) : Observable<LabRecordPast>{
  return this.http.post<GetTestRecordPast>(`http://localhost:8086/laboratory/add-past-testrecord/${testId}`, labRecordPast).pipe(
    map(response => response.data)
  );
}

//Physcian module ... upload prescription -- kushal
postPatientPrescriptions(treatement: Treatement): Observable<any>
{
  return this.http.post(this.baseUrl + 'history/insert-history', treatement);
}

// Fetch all records associated with physician id -- kushal
getAllRecordByPhysicianId(physicianId: string): Observable<Treatement[]>
{
  return this.http.get<GetRecord>(this.baseUrl + 'history/get-all-records-by-physician-id/' + physicianId).pipe(
    map(response => response.data)
  );
}

// delete appointment from current appointments -- kushal
deleteAppointmentById(appointmentId)
{
  console.log('called delete ' + appointmentId);
  return this.http.get(this.baseUrl + 'appointment/delete-appointment/' + appointmentId, httpOptions);
}


// Get all prescription in pharmacy -- kushal
getAllRecords(): Observable<PharmacyCurrentRecord[]>
{
  return this.http.get<GetPharmacyRecord>(this.baseUrl + 'pharmacy/get-all-records', httpOptions).pipe(
    map(response => response.data)
  );
}

// Fetch medicine details by name -- kushal
getMedicineByName(name: string): Observable<Medicinerecord>
{
  return this.http.get<GetMedcineRecord>(this.baseUrl +'pharmacy/get-medicine-by-name/' +name).pipe(
    map(response => response.data)
  );
}

// payment through pharmacy admmin -- kushal
updatePaymentByPharmacy(id: string): Observable<PharmacyCurrentRecord>
{
  return this.http.get<GetPharmacy>(this.baseUrl + 'pharmacy/get-pharmacy-by-id/'+ id).pipe(
    map(response => response.data)
  );
}

// insert detils after payment for records -- kushal
insertHistory(pharmacy){
  return this.http.post(this.baseUrl + 'pharmacy/history/insert-history', pharmacy, httpOptions);
}

//delete records from pending payments -- kushal
deleteRecord(pharmacy): Observable<any>
{
  return this.http.get(this.baseUrl + 'pharmacy/delete-record/'+ pharmacy.id, httpOptions);
}


//hospital-admin
// Get all records for hospital - admin - billing -- kushal
getTreamentHistory(): Observable<Treatement[]>
{
  return this.http.get<GetRecord>(this.baseUrl + 'history/get-all-records-to-be-paid').pipe(
    map(response => response.data)
  );
}

//Fetch test details by test name -- kushal
getTestRecordByName(name: string) : Observable<Testrecord>
{
  return this.http.get<GetTestRecord>(this.baseUrl + 'history/get-test-by-name/' + name).pipe(
    map(response => response.data)
  );
}

//Update payment for Hospital admnin -- kushal
updatePaymentByAdmin(id): Observable<any>
{
  return this.http.get(this.baseUrl + 'history/update-payment/' + id);
}

// upload image -- gautam
upload(file: File, testId: string): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();

  formData.append('file', file);
  formData.append('testId', testId);

  const req = new HttpRequest('POST', `http://localhost:8086/laboratory/image/upload`, formData, {
    reportProgress: true,
    responseType: 'json'
  });
  console.log("sadhbdash");
  console.log(req);
  return this.http.request(req);
}

// get image -- gautam
getFiles(): Observable<any> {
  return this.http.get(`http://localhost:8086/laboratory/files`);
}


}
interface GetTreatement{
  data: Treatement;
}
interface GetLabTestrecord
{
  data: LabRecordPast[];
}
interface GetPharmacy
{
  data: PharmacyCurrentRecord;
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
  data : LabRecordPast;
}
interface GetLabRecord
{
  data : LabRecord;
}
interface GetPastLabRecords
{
  data : LabRecordPast[];
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
