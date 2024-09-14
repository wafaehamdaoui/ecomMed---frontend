import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

interface Client {
  name: string;
  email: string;
  phone: string;
  address: string;
}
@Component({
  selector: 'app-add-client-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatLabel,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatInput,
    MatDialogTitle,
    MatDialogContent,
    NgIf,
  ],
  templateUrl: './add-client-dialog.component.html',
  styleUrl: './add-client-dialog.component.css'
})

export class AddClientDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddClientDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onSubmit(): void {
    console.log('New client added:', this.data);
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
