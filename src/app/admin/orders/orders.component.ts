import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {FooterComponent} from "../footer/footer.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/Order";
import {MatDialog} from "@angular/material/dialog";
import {OrderStatusDialogComponent} from "./order-status-dialog/order-status-dialog.component";
import {Router, RouterLink} from "@angular/router";
import {AddOrderDialogComponent} from "./add-order-dialog/add-order-dialog.component";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {ToastrService} from "ngx-toastr";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-orders',
  standalone: true,
    imports: [
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        NgForOf,
        NgClass,
        FormsModule,
        MatPaginator,
        MatPaginatorModule,
        NgIf,
        RouterLink
    ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders: Order[] = []; // Array to store the orders
  totalItems =-1;
  pageSize: number = 10;
  currentPage: number = 0;
  filteredOrders: Order[] = []; // This will store the filtered results
  searchQuery: string = '';

  constructor(private orderService: OrderService,
              private router: Router,
              private dialog: MatDialog,
              private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(pageIndex: number = 0, pageSize: number = this.pageSize): void {
    this.orderService.getOrders(pageIndex, pageSize).subscribe(response => {
      this.totalItems = response.totalElements;
      this.orders = response.content;
      this.filteredOrders = response.content;
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOrders(this.currentPage, this.pageSize);
  }

  deleteOrder(order: Order): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      //width: '300px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this order?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.deleteOrder(order.id).subscribe(() => {
          this.filteredOrders = this.filteredOrders.filter(i => i.id !== order.id);
          this.orders = this.orders.filter(i => i.id !== order.id);
          this.toastr.success('Order deleted successfully!', 'Success');
        }, error => {
          this.toastr.error(error.error.message, 'Error');
        });
      }
    });
  }

  // getOrderList(): void {
  //   this.orderService.getAll()
  //     .subscribe((data: Order[]) => {
  //       this.orders = data.sort();
  //       this.filteredOrders = this.orders;
  //       console.log('Order items:', this.orders);
  //   },
  //   (error) => {
  //     console.error('Error fetching order details:', error);
  //   }
  // );
  //}


  // Method to handle search functionality
  searchOrders(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredOrders = this.orders; // If the search query is empty, show all orders
    } else {
      this.filteredOrders = this.orders.filter(order =>
        order.address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.total_amount?.toString().includes(this.searchQuery)||
        order.id?.toString().includes(this.searchQuery)
      );
    }
  }

  // Method to open the add order dialog
  openAddOrderDialog(): void {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.addOrder(result).subscribe(newOrder=>{
            this.orders.push(newOrder);
          this.toastr.success('Order added successfully!', 'Success');
        }, error => {
          // Show error toast message
          this.toastr.error(error.error.message, 'Error');
        })
      }
    });
  }

  // Method to edit an existing order
  editOrder(order: Order): void {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      data: order
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.id) {
        this.orderService.updateOrder(result).subscribe(updatedOrder => {
          const index = this.orders.findIndex(o => o.id === updatedOrder.id);
          if (index !== -1) {
            this.orders[index] = updatedOrder; // Update the order in the list
            this.toastr.success('Order updated successfully!', 'Success');
          }
        }, error => {
          // Show error toast message
          this.toastr.error(error.error.message, 'Error');
        })
      }
    });
  }

  // Method to delete an order
  // deleteOrder(order: Order): void {
  //   this.orderService.deleteOrder(order.id).subscribe(() => {
  //     // Remove the deleted order from the list
  //     this.orders = this.orders.filter(o => o.id !== order.id);
  //     console.log(`Order with ID: ${order.id} deleted`);
  //   }, error => {
  //     console.error('Error deleting order:', error);
  //   });
  // }
  openStatusModal(order: any): void {
    const dialogRef = this.dialog.open(OrderStatusDialogComponent, {
      data: { order }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.changeStatus(order, result).subscribe(()=>{
          order.status = result
          this.toastr.success('Order status updated successfully!', 'Success');
        }, error => {
          // Show error toast message
          this.toastr.error(error.error.message, 'Error');
        })
      }
    });
  }

  showOrderDetails(order: Order) {
    this.router.navigate(['/admin/orders', order.id])
      .then(() => {
        console.log('Navigation successful');
      })
      .catch((error) => {
        console.error('Navigation error:', error);
      });
  }

}
