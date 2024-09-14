import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../models/Order";
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {OrderItemService} from "../../../services/order-item.service";
import {OrderItem} from "../../../models/OrderItem";
import {OrderItemDialogComponent} from "../order-item-dialog/order-item-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-order-details-dialog',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    CurrencyPipe
  ],
  templateUrl: './order-details-dialog.component.html',
  styleUrl: './order-details-dialog.component.css'
})
export class OrderDetailsDialogComponent implements OnInit {
  order: Order | null = null;
  orderItems: OrderItem[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(id).subscribe(
      (data: Order) => {
        this.order = data;
        this.fetchOrderItemsDetails();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching order details:', error);
        this.error = 'Failed to load order details';
      }
    );
  }

  fetchOrderItemsDetails(): void {
    if (this.order && this.order.orderItemResponses) {
      this.order.orderItemResponses.map(item =>
        this.orderItemService.getOrderItem(item.id).subscribe(
          (result: OrderItem)=>{
            this.orderItems.push(result);
            this.isLoading=false
          }
        )
      );
    }
  }
  removeOrderItem(item: OrderItem): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove',
        message: `Are you sure you want to remove item ${item.productResponse.code}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the service to remove the item from the backend
        this.orderService.removeOrderItem(item.id, this.order?.id).subscribe(
          () => {
            this.orderItems = this.orderItems.filter(i => i.id !== item.id);
            this.toastr.success(`Item ${item.productResponse.code} removed successfully!`, 'Success');
          },
          (error) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      }
    });
  }

  addItem(order: Order) {
    const dialogRef = this.dialog.open(OrderItemDialogComponent, {
      // width: '400px',
      data: order
    });

    dialogRef.afterClosed().subscribe((newItem: OrderItem) => {
      if (newItem) {
        this.orderService.addOrderItem(newItem).subscribe(
          (order) => {
            this.orderItems = []
            this.getOrderDetails()
            this.toastr.success('Item added successfully!', 'Success');
          },
          (error) => this.toastr.error(error.error.message, error)
        );

      }
    })
  }
}
//this.orderService.addOrderItem(newOrderItem).subscribe(
//         (item) => {
//           this.dialogRef.close(item);
//           this.toastr.success('Item added successfully!', 'Success');
//           },
//         (error) => this.toastr.error(error.error.message, error)
//       );
