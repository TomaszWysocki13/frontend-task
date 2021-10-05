import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact | undefined;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

  getContact(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.contactService
      .getContact(id)
      .subscribe((contact) => (this.contact = contact));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.contact) {
      this.contactService
        .updateContact(this.contact)
        .subscribe(() => this.goBack());
    }
  }
}
