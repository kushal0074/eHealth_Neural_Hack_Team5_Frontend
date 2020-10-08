import { Time } from '@angular/common';

export class Appointment {

    appointmentId: string;
    physicianId: string;
    patientId: string;
    date: Date;
    startTime: Time;
    endTime: Time;
}

