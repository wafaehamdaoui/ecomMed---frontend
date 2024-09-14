import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/Product";
import {ActivatedRoute, Router} from "@angular/router";
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
import {Category} from "../../../models/Category";
import {CartItem} from "../../../models/CartItem";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-category-products',
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
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit {

  category: any = null;

  constructor(private route: ActivatedRoute,private router: Router, private cartService: CartService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = JSON.parse(params['category']);
    });
  }
  productDetails(product: Product) {
    this.router.navigate(['/product-details'], {
      queryParams: {
        product: JSON.stringify(product)
      }
    }).then(() => {
      console.log('Navigation successful');
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
