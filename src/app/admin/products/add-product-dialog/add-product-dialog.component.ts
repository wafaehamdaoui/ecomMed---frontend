import {Component, Inject, OnInit} from '@angular/core';
import {MatOption} from "@angular/material/core";
import {MatFormField, MatLabel, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Product} from "../../../models/Product";
import {Category} from "../../../models/Category";
import {CategoryService} from "../../../services/category.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [
    MatOption,
    MatSelect,
    MatLabel,
    MatFormField,
    FormsModule,
    NgForOf,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent,
    MatInput,
    MatDialogTitle,
    MatIcon,
  ],
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.css'
})
export class AddProductDialogComponent implements OnInit{

  categories:Category[] = [];
  fileName: string = '';
  selectedFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<AddProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              private categoryService: CategoryService
              ) {}

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.categoryService.getAll().subscribe(results=>{
      this.categories = results
    })
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.data.image_url = file.name;
    }
  }
  onSubmit(): void {
    if (this.data) {
      // Send the product data to the server or parent component
      console.log('Product added:', this.data);
      this.dialogRef.close(this.data);
    }
  }

}
