import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/Product";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.API_BASE_URL+'/api/products'
  constructor(private http: HttpClient) { }

  public getAll(){
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getProducts(page: number, size: number, sortField: string = 'id', sortOrder='desc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sortField},${sortOrder}`);
    return this.http.get<any>(`${this.apiUrl}/page`, { params });
  }

  public getNewest(){
    return this.http.get<any>(`${this.apiUrl}/newest`);
  }
  deleteProduct(product: Product) {
    return this.http.delete<void>(`${this.apiUrl}/${product.id}`);
  }

  addProduct(product: Product) {
    return this.http.post<Product>(`${this.apiUrl}`, product)
  }
  editProduct(product: Product) {
    return this.http.post<Product>(`${this.apiUrl}/${product.id}`, product)
  }
}
