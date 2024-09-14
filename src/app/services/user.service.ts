import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {AuthRequest} from "../models/AuthRequest";
import {AuthResponse} from "../models/AuthResponse";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.API_BASE_URL+'/api/users'
  constructor(private http: HttpClient) { }

  public getAll():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
  public getUsers(page: number, size: number, sortField: string = 'id', sortOrder='desc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sortField},${sortOrder}`);
    return this.http.get<any>(`${this.apiUrl}/page`, { params });
  }
  deleteUser(user: User) {
    return this.http.delete<void>(`${this.apiUrl}/${user.id}`);
  }

  addUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}`, user)
  }
  editUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}/${user.id}`, user)
  }
  changeUserStatus(user: User) {
    return this.http.patch(`${this.apiUrl}/change-status/${user.id}`,{})
  }
  authenticate(request: AuthRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, request)
  }
}
