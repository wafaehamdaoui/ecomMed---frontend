import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {FooterComponent} from "../footer/footer.component";
import {AddProductDialogComponent} from "./add-product-dialog/add-product-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Product} from "../../models/Product";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ProductService} from "../../services/product.service";
import {FormsModule} from "@angular/forms";
import {Category} from "../../models/Category";
import {CategoryService} from "../../services/category.service";
import {ToastrService} from "ngx-toastr";
import {RouterLink} from "@angular/router";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    MatPaginator,
    NgOptimizedImage,
    FormsModule,
    RouterLink
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categoryMap: Map<number, string> = new Map();
  totalProducts: number = 0;
  pageSize: number = 5;
  currentPage: number =0;
  searchQuery = '';

  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    public dialog: MatDialog,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories()
  }
  private loadProducts(pageIndex: number = 0, pageSize: number = this.pageSize) {
    this.productService.getProducts(pageIndex,pageSize).subscribe(response=>{
      this.totalProducts = response.totalElements
      this.products = response.content
      this.filteredProducts = response.content
    })
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      // Populate the map with categoryId as key and categoryName as value
      categories.forEach(category => {
        if(category.id){
          this.categoryMap.set(category.id, category.name);
        }
      });
    });
  }

  searchProduct(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = this.products; // If the search query is empty, show all orders
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.price?.toString().includes(this.searchQuery)||
        product.stock_quantity.toString().includes(this.searchQuery)
      );
    }
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data:{}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("result= ",result)
        this.productService.addProduct(result).subscribe(product=>{
          this.products.push(product)
          this.toastr.success('Product added successfully!', 'Success');
        }, error => {
          // Show error toast message
          this.toastr.error(error.error.message, 'Error');
        })
      }
    });
  }
  editProduct(product: Product) {

    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data:product
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.editProduct(result).subscribe(updatedProduct=>{
          const index = this.products.findIndex(o => o.id === updatedProduct.id);
          if (index !== -1) {
            this.products[index] = updatedProduct; // Update the order in the list
            this.toastr.success('Product updated successfully!', 'Success');
          }
        }, error => {
          // Show error toast message
          this.toastr.error(error.error.message, 'Error');
        })
      }
    });
  }

  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this product?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(product).subscribe(() => {
          this.filteredProducts = this.filteredProducts.filter(i => i.id !== product.id);
          this.products = this.products.filter(i => i.id !== product.id);
          this.toastr.success('Product deleted successfully!', 'Success');
        }, error => {
          this.toastr.error(error.error.message, 'Error');
        });
      }
    });
  }


  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts(this.currentPage, this.pageSize);
  }


}
