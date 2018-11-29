import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"]
})
export class ConfirmationDialogComponent implements OnInit {
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) { }

  ngOnInit() { }

  public confirm = async () => {
    try {
      this.isLoading = true;
      await this.data.confirmationAction();
      
      this.isLoading = false;
      this.close(true);
    } catch (error) {
      throw error;
    }
  };

  private close = (value: boolean): void => {
    this.dialogRef.close(value);
  };
}

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmationAction: () => Promise<any>;
}
