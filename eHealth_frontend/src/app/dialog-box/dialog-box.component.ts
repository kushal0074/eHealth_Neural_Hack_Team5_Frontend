import { TestDetails } from './../classes/test-details';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UsersData {
  name: string;
  id: number;
}
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  testFormGroup = new FormGroup({
    username : new FormControl('' , Validators.required),
});

  testDetails= new TestDetails();
  action: string;
  local_data: any;

  constructor(
    @Optional()

    public dialogRef: MatDialogRef<DialogBoxComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log('data object '+ data.name);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }
  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
    console.log('data name '+this.local_data.name);
    console.log('data name '+this.local_data.local_data);
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
