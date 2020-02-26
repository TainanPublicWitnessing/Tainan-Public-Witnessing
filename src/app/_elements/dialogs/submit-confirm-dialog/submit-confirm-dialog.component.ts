import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export class ConfirmDialogData{

  constructor(title: string, message: string, fields: any){
    this.title = title;
    this.message = message;
    this.fields = fields;
  }

  /** variables */
  title: string;
  message: string;
  fields: any;
  
}

@Component({
  selector: 'app-submit-confirm-dialog',
  templateUrl: './submit-confirm-dialog.component.html',
  styleUrls: ['./submit-confirm-dialog.component.css']
})
export class SubmitConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SubmitConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ){}

  ngOnInit(){}

  /** functions */

  cancel(){
    this.dialogRef.close(false);  //return result as flase
  }

  confirm(){
    this.dialogRef.close(true);  //return result as true
  }
}
