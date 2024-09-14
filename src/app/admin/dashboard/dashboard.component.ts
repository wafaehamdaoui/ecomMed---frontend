import {Component, OnInit} from '@angular/core';
import {Chart, ChartType} from "chart.js/auto";
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {OrderService} from "../../services/order.service";
import {ClientService} from "../../services/client.service";
import {Order} from "../../models/Order";
import {NgClass, NgForOf} from "@angular/common";
import {OrderStatusDialogComponent} from "../orders/order-status-dialog/order-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  sales: number = 0;
  newOrders: number = 0;
  clients: number = 0;
  orderData: Map<string,number> = new Map<string, number>();
  chart?: Chart<ChartType, number[], string>;
  orders: Order[] =[];
  constructor(private orderService: OrderService,
              private clientService: ClientService,
              private dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.loadData(currentYear)
    this.getSalesCount()
    this.getClientsCount()
    this.getPendingCount()
    this.loadOrders()
  }
  loadData(year: number) {
    this.orderService.ordersMonthly(year).subscribe(result => {
      Object.entries(result).forEach(item=>{
      this.orderData.set(item[0],item[1])
      });
      this.createChart(year);
    });
  }

  createChart(year :number): void {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }
    // Predefine all the months
    const allLabels = [year+'-01', year+'-02', year+'-03', year+'-04', year+'-05', year+'-06', year+'-07', year+'-08', year+'-09', year+'-10', year+'-11', year+'-12'];

    // Initialize data array with zeros
    const data: number[] = new Array(allLabels.length).fill(0);

    // Map the order data to the correct month
    allLabels.forEach((label, index) => {
      // Fetch the value from the Map for the corresponding month
      const monthValue = this.orderData.get(label) || 0;
      data[index] = monthValue ;
    });

    // Create the chart
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: allLabels,
        datasets: [{
          label: 'Sales',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  getSalesCount(){
    this.orderService.countSales().subscribe(result=>{
      this.sales = result
    })
  }
  getPendingCount(){
    this.orderService.countPending().subscribe(result=>{
      this.newOrders = result
    })
  }
  getClientsCount(){
    this.clientService.getCount().subscribe(result=>{
      this.clients = result
    })
  }

  loadOrders(pageIndex: number = 0, pageSize: number = 10): void {
    this.orderService.getOrders(pageIndex, pageSize).subscribe(response => {
      this.orders = response.content;
    });
  }
  openStatusModal(order: any): void {
    const dialogRef = this.dialog.open(OrderStatusDialogComponent, {
      data: { order }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.changeStatus(order, result).subscribe(()=>{
            order.status = result
            console.log(`Updated status: ${result}`);
          }
        )
      }
    });
  }

}
