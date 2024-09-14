import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {Category} from "../../models/Category";
import {CategoryDialogComponent} from "./category-dialog/category-dialog.component";
import {ToastrService} from "ngx-toastr";
import {RouterLink} from "@angular/router";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatPaginator,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  totalCategories: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;
  searchQuery = '';


  constructor(private categoryService: CategoryService,
              private toastr: ToastrService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadCategories()
  }

  private loadCategories(pageIndex: number = 0, pageSize: number = this.pageSize) {
    this.categoryService.getCategories(pageIndex, pageSize).subscribe(response => {
      this.totalCategories = response.totalElements
      this.categories = response.content
      this.filteredCategories = response.content
    })
  }

  searchCategory(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredCategories = this.categories; // If the search query is empty, show all orders
    } else {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        category.description?.toLowerCase().includes(this.searchQuery)
      );
    }
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.addCategory(result).subscribe(category => {
          this.categories.push(category)
          this.toastr.success('Category added successfully!', 'Success');
        }, error => {
          // Show error toast message
          this.toastr.error(error.error.message, 'Error');
        })
      }
    });
  }

  editCategory(category: Category) {

    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: category
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.editCategory(result).subscribe(updatedCategory => {
          const index = this.categories.findIndex(o => o.id === updatedCategory.id);
          if (index !== -1) {
            this.categories[index] = updatedCategory;
            this.toastr.success('Category updated successfully!', 'Success');
          }
         }, error => {
          // Show error toast message
          this.toastr.error(error.error.message, 'Error');
        })
      }
    });
  }

  deleteCategory(category: Category): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete the category ${category.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategory(category.id).subscribe(() => {
          this.filteredCategories = this.filteredCategories.filter(i => i.id !== category.id);
          this.categories = this.categories.filter(i => i.id !== category.id);
          this.toastr.success('Category deleted successfully!', 'Success');
        }, error => {
          this.toastr.error(error.error.message, 'Error');
        });
      }
    });
  }


  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCategories(this.currentPage, this.pageSize);
  }
}
