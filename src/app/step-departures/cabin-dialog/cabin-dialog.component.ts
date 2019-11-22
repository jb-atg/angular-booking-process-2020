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
  selector: "app-cabin-dialog",
  templateUrl: "./cabin-dialog.component.html",
  styleUrls: ["./cabin-dialog.component.scss"]
})
export class CabinDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CabinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
