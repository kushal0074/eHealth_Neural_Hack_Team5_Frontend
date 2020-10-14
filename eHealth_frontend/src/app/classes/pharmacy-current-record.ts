import { Time } from '@angular/common';
export class PharmacyCurrentRecord {
  id: string;
  patientId: string;
  physicianId: string;
  prescription: string;
  date: Date;
  medicine: string;
  time: Time;

}
