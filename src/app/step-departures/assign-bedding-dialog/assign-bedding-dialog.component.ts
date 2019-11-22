import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-assign-bedding-dialog',
  templateUrl: './assign-bedding-dialog.component.html',
  styleUrls: ['./assign-bedding-dialog.component.scss']
})

export class AssignBeddingDialogComponent implements OnInit {

   constructor(
    public dialogRef: MatDialogRef<AssignBeddingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}