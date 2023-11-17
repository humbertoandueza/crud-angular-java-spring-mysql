import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../client.service';
import { Client, Pageable } from '../../client.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
 

  dataSource: Client[] = [];

  displayedColumns: string[] = ['clientId', 'firstName', 'lastName', 'phone', 'address', 'email', 'edit', 'delete'];
  pageable: Pageable = {
    "pageNumber": 0,
    "pageSize": 5,
    "sort": {
        "empty": false,
        "sorted": true,
        "unsorted": false
    },
    "offset": 0,
    "unpaged": false,
    "paged": true
  }; 
  totalElements: number | undefined;

  constructor(private clientService: ClientService,
    private router: Router) {
    this.getClientList();
  }

  ngOnInit(): void {
    
  }

  updateClient(clientId: number): void {
    this.router.navigate(['/client', {clientId: clientId}]);
  }

  deleteClient(clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe(
      {
        next: (res) => {
          this.getClientList();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  getClientList(): void {
    this.clientService.getClients(this.pageable.pageNumber, this.pageable.pageSize).subscribe(
      {
        next: (res:any ) => {
          this.dataSource = res?.object?.content;
          this.pageable = res?.object?.pageable;
          this.totalElements = res?.object?.totalElements;
        },
        error: (err: HttpErrorResponse)=> {
          console.log(err);
        }
      }
    );
  }

  onPageChange(event: any) {
    this.pageable.pageNumber = event.pageIndex;
    this.pageable.pageSize = event.pageSize;
    this.getClientList();
  }

}
