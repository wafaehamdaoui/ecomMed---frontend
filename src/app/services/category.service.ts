import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Category} from "../models/Category";
import {Observable} from "rxjs";
import {Product} from "../models/Product";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.API_BASE_URL+'/api/categories'
  constructor(private http: HttpClient) { }

  public getAll(){
    return this.http.get<any>(`${this.apiUrl}`);
  }
  public getCategories(page: number, size: number, sortField: string = 'id', sortOrder='desc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sortField},${sortOrder}`);
    return this.http.get<any>(`${this.apiUrl}/page`, { params });
  }
  public getCategoryById(id:number): Observable<Category>{
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  editCategory(category: Category) {
    return this.http.post<Category>(`${this.apiUrl}/${category.id}`, category)
  }
  addCategory(category: Category) {
    return this.http.post<Category>(`${this.apiUrl}`, category)
  }
  deleteCategory(categoryId: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${categoryId}`);
  }
}
