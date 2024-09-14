import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {ProductService} from "../../services/product.service";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {CartItem} from "../../models/CartItem";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    NgForOf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  products:Product[] = [];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router
              ) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  private loadProducts() {
    this.productService.getAll().subscribe(response=>{
      this.products = response
    })
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
