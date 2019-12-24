import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-submit-confirm-dialog',
  templateUrl: './submit-confirm-dialog.component.html',
  styleUrls: ['./submit-confirm-dialog.component.css']
})
export class SubmitConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SubmitConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit() {
  }

  public cancel(){
    this.dialogRef.close(false);
  }

  public confirm(){
    this.dialogRef.close(true);
  }
}
