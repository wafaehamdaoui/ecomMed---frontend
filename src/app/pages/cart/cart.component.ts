import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {CartItem} from "../../models/CartItem";
import {Cart} from "../../models/Cart";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Client} from "../../models/Client";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cart: Cart = new Cart();
  formGroup: FormGroup;

  constructor(private cartService: CartService,
              private router: Router,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    // Initialize formGroup inside the constructor
    this.formGroup = this.fb.group({
      clientName: ['', Validators.required],
      clientPhone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      clientAddress: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCart();
  }


  getCart() {
    this.cartService.getCart().subscribe(result => {
      this.cart = result;
    });
  }

  increaseQuantity(item: CartItem) {
    this.cartService.addCartItem(item).subscribe(result => {
      this.cart = result;
    });
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.decreaseQuantity(item.product).subscribe(result => {
        this.cart = result;
      });
    }
  }

  removeItem(item: CartItem) {
    if (item.product.id) {
      this.cartService.removeCartItem(item.product.id).subscribe(result => {
        this.cart = result;
      });
    }
  }

  proceedToCheckout() {
    if (this.formGroup.valid) {
      const client = new Client(this.formGroup.get('clientName')?.value, this.formGroup.get('clientPhone')?.value);
      // Proceed with the order creation logic here
      this.cartService.makeOrder(client,this.formGroup.get('clientAddress')?.value).subscribe(result => {
          this.cartService.clearCart().subscribe(result=>{
            this.toastr.success('Order placed successfully!', 'Success');
            this.cart = result
          })
        },
        error => {
          // Show error toast message
          this.toastr.error('Failed to place order. Please try again.', 'Error');
        }
      );
    }
  }
  // cart.component.ts
  clearCart() {
    this.cartService.clearCart().subscribe(result=>{
      this.cart = result
    })
  }

  continueShopping() {
    this.router.navigate(['/product-list']); // Redirect to product listing
  }

}
