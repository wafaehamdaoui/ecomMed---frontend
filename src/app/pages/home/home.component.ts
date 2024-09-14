import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {Category} from "../../models/Category";
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";
import {MenubarComponent} from "../menubar/menubar.component";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatAnchor, MatButton} from "@angular/material/button";
import {CartItem} from "../../models/CartItem";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenubarComponent,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    CurrencyPipe,
    MatCard,
    NgForOf,
    MatButton,
    MatCardImage,
    MatAnchor
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  featuredProducts:Product[] = [];
  categories:Category[] = [];

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private cartService: CartService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories()
  }
  private loadProducts() {
    this.productService.getNewest().subscribe(response=>{
      this.featuredProducts = response
    })
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories
    });
  }
  isSidenavOpen = false;

  closeSidenav() {
    this.isSidenavOpen = false;
  }
  productDetails(product: Product) {
    this.router.navigate(['/product-details'], {
      queryParams: {
        product: JSON.stringify(product)
      }
    }).then(() => {
      console.log('Navigation successful');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }).catch((error) => {
      console.error('Navigation error:', error);
    });
  }
  addToCart(product: Product) {
    const cartItem: CartItem = {product: product, quantity:1, price:product.price}
    this.cartService.addCartItem(cartItem).subscribe(result=>{
      this.router.navigate(["/cart"])
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }
}
