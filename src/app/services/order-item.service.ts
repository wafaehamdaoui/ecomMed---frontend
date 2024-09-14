import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderItem} from "../models/OrderItem";
import {Observable} from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private apiUrl = environment.API_BASE_URL+'/api/order-items'
  constructor(private http: HttpClient) { }

  // Get OrderItem by ID
  getOrderItem(id: number | undefined): Observable<OrderItem> {
    return this.http.get<OrderItem>(`${this.apiUrl}/${id}`);
  }

  deleteOrderItem(id: number | undefined) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  updateOrderItem(item: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.apiUrl}/${item.id}`, item)
  }

  addOrderItem(item: OrderItem) {
    console.log("new order service= ",item)
    return this.http.post<OrderItem>(`${this.apiUrl}`, item)
  }
}
