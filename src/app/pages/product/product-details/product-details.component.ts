import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../models/Product";
import {CurrencyPipe} from "@angular/common";
import {CartService} from "../../../services/cart.service";
import {CartItem} from "../../../models/CartItem";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product: any

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cartService: CartService
              ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.product = JSON.parse(params['product']);
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
