import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { AddLabComponent } from './hospital-admin/add-lab/add-lab.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { ConfirmBookingComponent } from './book-appointment/confirm-booking/confirm-booking.component';
import { authInterceptorProviders } from './helper/auth-intercepter';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
// import Http module
import { HttpModule} from '@angular/http';
// import ReactiveFormsModule for reactive form
import { ReactiveFormsModule} from '@angular/forms';
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
import { HospitalAdminComponent } from './hospital-admin/hospital-admin.component';
import { PatientComponent } from './patient/patient.component';
import { AddMemberComponent } from './hospital-admin/add-member/add-member.component';
import { PhysicianComponent } from './physician/physician.component';
import { AppointmentComponent } from './physician/appointment/appointment.component';
import {MatTableModule} from '@angular/material/table';
import { RecordComponent } from './physician/record/record.component';
import { AddPharmacyComponent } from './hospital-admin/add-pharmacy/add-pharmacy.component';
import { MedicineComponent } from './pharmacy/medicine/medicine.component';


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
    MedicineComponent
  ],
  imports: [
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
    BrowserAnimationsModule,
    MatTableModule,

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
        path : 'patient/confirm-booking/:adminId',
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
      }
    ]),

    BrowserAnimationsModule
  ],
  providers: [
    AdminService, authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// @Pipe({name: 'convertFrom24To12Format'})
// export class TimeFormat implements PipeTransform {
//      transform(time: any): any {
//          let hour = (time.split(':'))[0]
//          let min = (time.split(':'))[1]
//          let part = hour > 12 ? 'pm' : 'am';
//          min = (min+'').length == 1 ? `0${min}` : min;
//          hour = hour > 12 ? hour - 12 : hour;
//          hour = (hour+'').length == 1 ? `0${hour}` : hour;
//          return `${hour}:${min} ${part}`
//        }
//    }

