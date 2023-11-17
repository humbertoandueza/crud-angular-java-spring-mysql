import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ClientComponent } from './modules/client/client.component';
import { ClientListComponent } from './modules/client-list/client-list.component';
import { ClientResolver } from './client-resolver';

const routes: Routes = [
  {path: 'header', component: HeaderComponent},
  {path: 'client', component: ClientComponent, resolve: {client: ClientResolver} },
  {path: 'client-list', component: ClientListComponent},
  { path: '', redirectTo: '/client', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
