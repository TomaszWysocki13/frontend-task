import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { AddContactComponent } from './add-contact/add-contact.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/contact-list',
    pathMatch: 'full',
  },
  {
    path: 'contact-list',
    component: ContactListComponent,
  },
  {
    path: 'details',
    component: ContactDetailsComponent,
  },
  {
    path: 'add-contact',
    component: AddContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
