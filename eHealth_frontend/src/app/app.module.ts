import { ModalModule } from 'ngx-bootstrap/modal';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { AddLabComponent } from './hospital-admin/add-lab/add-lab.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { ConfirmBookingComponent } from './book-appointment/confirm-booking/confirm-booking.component';
import { authInterceptorProviders } from './helper/auth-intercepter';
import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, Pipe, PipeTransform } from '@angular/core';

// import Http module
import { HttpModule} from '@angular/http';
// import ReactiveFormsModule for reactive form
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import module for Routing.
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';

import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import { AdminService } from './services/admin.service';
import { Time24to12Format } from './time24to12.pipe';
import { HospitalAdminComponent } from './hospital-admin/hospital-admin.component';
import { PatientComponent } from './patient/patient.component';
import { AddMemberComponent } from './hospital-admin/add-member/add-member.component';
import { PhysicianComponent } from './physician/physician.component';
import { AppointmentComponent } from './physician/appointment/appointment.component';
import {MatTableModule} from '@angular/material/table';
import { RecordComponent } from './physician/record/record.component';
import { AddPharmacyComponent } from './hospital-admin/add-pharmacy/add-pharmacy.component';
import { MedicineComponent } from './pharmacy/medicine/medicine.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { PatientRecordComponent } from './profile/patient-record/patient-record.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { AddTestResultsComponent } from './laboratory/pending-tests/add-test-results/add-test-results.component';
import { DatePipe } from '@angular/common';
import { PendingTestsComponent } from './laboratory/pending-tests/pending-tests.component';

import { BillingComponent } from './hospital-admin/billing/billing.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { PastLabRecordsComponent } from './laboratory/past-lab-records/past-lab-records.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ProfileComponent,
    HospitalAdminComponent,
    PatientComponent,
    AddMemberComponent,  BookAppointmentComponent,
    ConfirmBookingComponent,
    PhysicianComponent,
    AppointmentComponent,
    RecordComponent,
    AddLabComponent,
    AddPharmacyComponent,
    MedicineComponent,
    Time24to12Format,
    PatientRecordComponent,
    LaboratoryComponent,
    AddTestResultsComponent,
    PendingTestsComponent,
    BillingComponent,
    DialogBoxComponent,
    PastLabRecordsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    BrowserModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatTableModule,
    ModalModule.forRoot(),
    ScrollingModule,
    RouterModule.forRoot([
      {
        path : '',
        component : HomeComponent
      },
      {
        path : 'login',
        component : LoginComponent
      },
      {
        path : 'signup',
        component : SignupComponent
      },
      {
        path : 'profile/:adminId',
        component : ProfileComponent
      },
      {
        path : 'hospital-admin/:adminId',
        component : HospitalAdminComponent
      },
      {
        path : 'add-member-physician/:adminId',
        component : AddMemberComponent
      },
      {
        path : 'physician-panel/:adminId',
        component : PhysicianComponent
      },
      {
        path : 'physician/appointment-panel/:adminId',
        component : AppointmentComponent
      },
      {
        path : 'physician/record/:adminId',
        component : RecordComponent
      },
      {
        path : 'patient/:adminId',
        component : BookAppointmentComponent
      },
      {
        path : 'patient/record/:adminId',
        component : PatientRecordComponent
      },
      {
        path : 'patient/confirm-booking/:physicianId/:availabilityId',
        component : ConfirmBookingComponent
      },
      {
        path : 'add-member-pharmacy/:adminId',
        component : AddPharmacyComponent
      },
      {
        path : 'add-member-lab/:adminId',
        component : AddLabComponent
      },
      {
        path : 'pharmacy_home/:adminId',
        component : PharmacyComponent
      },
      {
        path : 'pharmacy_medicine/:adminId',
        component : MedicineComponent
      },
      {
        path: 'laboratory-panel/:adminId',

        children:[
          {
            path: "",
            component: LaboratoryComponent
          },
          {
            path: "viewPendingTests",
            children:[
              {
                path: "",
                component: PendingTestsComponent
              },
              {
                path: "addTestResults/:testId/for/:patientId/by/:physicianId/:treatmentId",
                component : AddTestResultsComponent
              }
            ]
          },
          {
            path: "viewPastLabRecords",
            component: PastLabRecordsComponent
          }
        ]
      },
      {
        path : 'hospital-admin/billing-panel/:adminId',
        component : BillingComponent
      }
    ]),

    BrowserAnimationsModule
  ],
  providers: [
    AdminService, authInterceptorProviders, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
