import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-popin-confirmation',
  templateUrl: './popin-confirmation.component.html',
  styleUrls: ['./popin-confirmation.component.css']
})
export class PopinConfirmationComponent {

  @Output()
  onSubmit:EventEmitter<boolean>;

  constructor(public dialogRef: MatDialogRef<PopinConfirmationComponent>) {
    this.onSubmit = new EventEmitter<boolean>();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.onSubmit.emit(true);
    this.dialogRef.close();
  }

}
