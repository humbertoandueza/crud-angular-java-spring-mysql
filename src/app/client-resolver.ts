import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ClientService } from "./client.service";
import { inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { Client } from "./client.model";

export const ClientResolver: ResolveFn<any> = 
    (route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        clientService: ClientService = inject(ClientService)) :Observable<any> => {


            const clientId = route.paramMap.get("clientId");
            if(clientId) {
                return clientService.getClient(Number(clientId));
            } else {
                const client: Client = {
                    clientId: 0,
                    firstName: '',
                    lastName: '',
                    phone: '',
                    address: '',
                    email: ''
                }
                const object = {
                    object:client
                }
                return of(object);

            }

        }