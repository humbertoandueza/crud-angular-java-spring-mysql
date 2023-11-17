import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  api = "http://localhost:8092/api"

  public saveClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(`${this.api}/client/create`, client);
  }

  public getClients(pageNumber:number,pageSize:number): Observable<Client[]> {
      return this.httpClient.get<Client[]>(`${this.api}/clients?page=${pageNumber}&size=${pageSize}`);
  }

  public deleteClient(clientId: number) {
    return this.httpClient.delete(`${this.api}/client/${clientId}`);
  }

  public getClient(clientId: number) {
    return this.httpClient.get<Client>(`${this.api}/client/${clientId}`);
  }

  public updateClient(client: Client) {
    return this.httpClient.put<Client>(`${this.api}/client/update/${client.clientId}`, client);
  }

}
