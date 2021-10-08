import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteContactComponent } from '../dialog-delete-contact/dialog-delete-contact.component';
import { DialogAddContactComponent } from '../dialog-add-contact/dialog-add-contact.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  displayedColumns: string[] = [
    'nickname',
    'name',
    'surname',
    'email',
    'phone',
    'sex',
    'operations',
  ];

  constructor(
    private contactService: ContactService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService
      .getContacts()
      .subscribe((contacts) => (this.contacts = contacts));
  }

  delete(contact: Contact): void {
    this.contacts = this.contacts.filter((c) => c !== contact);
    this.contactService.deleteContact(contact.id).subscribe();
  }

  openDelDialog(contacts: Contact): void {
    const dialogRef = this.dialog.open(DialogDeleteContactComponent, {
      data: contacts,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getContacts();
    });
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddContactComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      this.getContacts();
    });
  }
}
