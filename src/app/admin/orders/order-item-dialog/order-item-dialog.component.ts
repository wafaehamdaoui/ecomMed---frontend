import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {OrderItem} from "../../../models/OrderItem";
import {OrderItemService} from "../../../services/order-item.service";
import {Product} from "../../../models/Product";
import {ProductService} from "../../../services/product.service";
import {OrderService} from "../../../services/order.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-order-item-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    MatError,
    MatLabel,
    MatFormField
  ],
  templateUrl: './order-item-dialog.component.html',
  styleUrl: './order-item-dialog.component.css'
})
export class OrderItemDialogComponent implements OnInit{

  orderItemForm: FormGroup;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private orderItemService: OrderItemService,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<OrderItemDialogComponent>,
    private productService: ProductService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderItemForm = this.fb.group({
      productResponse: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }
  loadProducts(): void {
    this.productService.getAll().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.orderItemForm.valid) {
      const newOrderItem: OrderItem = {
        orderId : this.data.id,
        ...this.orderItemForm.value
      };
      newOrderItem.productId = newOrderItem.productResponse.id
      this.dialogRef.close(newOrderItem);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loadProducts();
  }
}
