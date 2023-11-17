import { Component, OnInit } from '@angular/core';
import { Client } from '../../client.model';
import { NgForm } from '@angular/forms';
import { ClientService } from '../../client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  isCreateClient: boolean = true;

  client: any;

  skills: string[] = [];

  constructor(private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.client = this.activatedRoute.snapshot.data['client'].object;

    if (this.client && this.client.clientId > 0) {
      this.isCreateClient = false;
    } else {
      this.isCreateClient = true;
    }

  }

  saveClient(clientForm: NgForm): void {

    if (this.isCreateClient) {
      this.clientService.saveClient(this.client).subscribe(
        {
          next: (res: Client) => {
            clientForm.reset();
            this.router.navigate(["/client-list"]);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      );
    } else {
      this.clientService.updateClient(this.client).subscribe(
        {
          next: (res: Client) => {
            this.router.navigate(["/client-list"]);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      );
    }
  }
}
