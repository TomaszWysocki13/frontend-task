import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../contact';
import { ContactListComponent } from '../contact-list/contact-list.component';

@Component({
  selector: 'app-dialog-delete-contact',
  templateUrl: './dialog-delete-contact.component.html',
  styleUrls: ['./dialog-delete-contact.component.scss'],
})
export class DialogDeleteContactComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Contact,
    private readonly contactListComponent: ContactListComponent
  ) {}
  public confirm(): void {
    this.contactListComponent.delete(this.data);
  }
}
