import {Component, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {User} from "../../../models/User";

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatInput,
    MatLabel,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgForOf,
    MatOption,
    MatSelect,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.css'
})
export class AddUserDialogComponent {

  // Array of roles
  roles = ['Admin', 'Manager'];  // Customize roles as needed

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  // Method to handle form submission
  onSubmit(): void {
    if (this.data.username && this.data.password && this.data.email && this.data.role) {
      // Here, you would typically send the `user` data to your backend service
      console.log('User submitted:', this.data);

      // Close the dialog and pass the user data back
      this.dialogRef.close(this.data);
    } else {
      console.error('Form is invalid');
    }
  }

  // Method to close the dialog without saving
  onCancel(): void {
    this.dialogRef.close();
  }
}
