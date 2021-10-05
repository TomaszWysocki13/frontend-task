import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  providers: [ContactDetailsComponent],
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService,
    private contactDetails: ContactDetailsComponent,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  add(name: string, nickname: string, surname: string): void {
    name = name.trim();

    if (!name && !nickname) {
      this.toastr.error('Musisz podać pseudonim!');
      return;
    }
    this.contactService
      .addContact({ name, nickname, surname } as Contact)
      .subscribe((contact) => {
        this.contacts.push(contact);
        this.contactDetails.goBack();
      });
  }
}
