import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Order} from "../../../models/Order";
import {OrderService} from "../../../services/order.service";
import {OrderStatus} from "../../../models/OrderStatus";
import {Product} from "../../../models/Product";
import {Client} from "../../../models/Client";
import {ClientService} from "../../../services/client.service";
import {ProductService} from "../../../services/product.service";
import {OrderItem} from "../../../models/OrderItem";


@Component({
  selector: 'app-add-order-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatLabel,
    MatFormField,
    FormsModule,
    MatOption,
    MatSelect,
    NgForOf,
    MatDialogContent,
    MatButton,
    MatDialogClose,
    MatInput,
    MatDialogTitle,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-order-dialog.component.html',
  styleUrl: './add-order-dialog.component.css'
})
export class AddOrderDialogComponent implements OnInit{

  // Arrays for dropdown options
  clients:Client[] = [];

  statuses = [OrderStatus.PENDING, OrderStatus.SHIPPED,
    OrderStatus.CONFIRMED, OrderStatus.CANCELLED,
    OrderStatus.RETURNED, OrderStatus.PAID
  ];

  items: Product[] = [];
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private clientService: ClientService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<AddOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {
    this.orderForm = this.fb.group({
      clientId: [this.data ? this.data.clientId : null, Validators.required],
      status: [this.data? this.data.status : '', Validators.required],
      address: [this.data? this.data.address : [], Validators.required],
    });
  }


  // Method to handle form submission
  onSubmit(): void {
    console.log('Order submitted:', this.orderForm.value);
    if (this.orderForm.valid) {
      this.data = {
        ...this.data,
        ...this.orderForm.value
      };
      // Close the dialog and pass the order data back
      this.dialogRef.close(this.data);
      console.log('Order submitted:', this.data);
    } else {
      console.error('Form is invalid');
    }
  }

  // Method to close the dialog without saving
  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getProducts()
    this.getClients()
    console.log("form=",this.orderForm.value)
  }
  getClients(){
    this.clientService.getAll().subscribe((result:Client[])=>{
      this.clients = result;
    })
  }
  getProducts(){
    this.productService.getAll().subscribe((result:Product[])=>{
      this.items = result;
    })
  }
}
