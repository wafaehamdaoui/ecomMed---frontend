import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../models/Client";
import {Order} from "../models/Order";
import {Cart} from "../models/Cart";
import {CartItem} from "../models/CartItem";
import {Product} from "../models/Product";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.API_BASE_URL+'/api/cart'

  constructor(private http: HttpClient) {}

  public getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}`);
  }

  public addCartItem(cartItem: CartItem): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}`, cartItem);
  }

  public removeCartItem(productId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/${productId}`);
  }

  public clearCart(): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}`);
  }

  public makeOrder(client: Client, address: string): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/order/${address}`, client);
  }

  decreaseQuantity(product: Product) {
    return this.http.post<Cart>(`${this.apiUrl}/decrease/${product.id}`, {});
  }
}
