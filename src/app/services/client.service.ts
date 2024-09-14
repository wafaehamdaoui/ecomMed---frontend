import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../models/Client";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.API_BASE_URL+'/api/clients'
  constructor(private http: HttpClient) { }

  public getAll():Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiUrl}`);
  }
  public getClients(page: number, size: number, sortField: string = 'id', sortOrder='desc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sortField},${sortOrder}`);
    return this.http.get<any>(`${this.apiUrl}/page`, { params });
  }
  deleteClient(client: Client) {
    return this.http.delete<void>(`${this.apiUrl}/${client.id}`);
  }

  addClient(client: Client) {
    return this.http.post<Client>(`${this.apiUrl}`, client)
  }
  editClient(client: Client) {
    return this.http.post<Client>(`${this.apiUrl}/${client.id}`, client)
  }

  getCount() {
    return this.http.get<number>(`${this.apiUrl}/count`)
  }
}
