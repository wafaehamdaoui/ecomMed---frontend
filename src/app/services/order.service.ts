import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "../models/Order";
import {Observable} from "rxjs";
import {OrderItem} from "../models/OrderItem";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.API_BASE_URL+'/api/orders'
  constructor(private http: HttpClient) { }

  public getAll(){
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getOrders(page: number, size: number, sortField: string = 'id', sortOrder='desc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sortField},${sortOrder}`);
    return this.http.get<any>(`${this.apiUrl}/page`, { params });
  }


  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }


  // Method to delete an order by ID
  deleteOrder(orderId: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }
  addOrderItem(item: OrderItem) {
    return this.http.post<Order>(`${this.apiUrl}/add-item`, item)
  }

  removeOrderItem(itemId: number | undefined, orderId: number | undefined) {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}/${itemId}`);
  }

  changeStatus(order: Order, result: String) {
    return this.http.patch<void>(`${this.apiUrl}/${order.id}`,result);
  }

  addOrder(order: Order) {
    return this.http.post<any>(`${this.apiUrl}`, order)
  }

  updateOrder(order: Order) {
    return this.http.post<Order>(`${this.apiUrl}/${order.id}`, order)
  }

  countSales() {
    return this.http.get<number>(`${this.apiUrl}/count-sales`)
  }
  countPending() {
    return this.http.get<number>(`${this.apiUrl}/count-pending`)
  }
  //orders-monthly
  ordersMonthly(year: number) {
    const params = new HttpParams().set('year', year.toString());
    return this.http.get<Map<string, number>>(`${this.apiUrl}/orders-monthly`, { params });
  }
}
