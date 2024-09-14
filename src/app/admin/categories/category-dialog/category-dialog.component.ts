import {Component, Inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {Product} from "../../../models/Product";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/Category";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatLabel,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    MatInput
  ],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.css'
})
export class CategoryDialogComponent {

  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Category,
  ) {}
  onSubmit(): void {
    if (this.data) {
      // Send the product data to the server or parent component
      console.log('Product added:', this.data);
      this.dialogRef.close(this.data);
    }
  }
}
