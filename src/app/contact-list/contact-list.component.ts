import { Component, OnInit } from '@angular/core';
import { CONTACTS } from '../mock-contacts';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contacts = CONTACTS;

  constructor() {}

  ngOnInit(): void {}
}
