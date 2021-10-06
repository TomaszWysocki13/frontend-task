import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Contact } from '../contact';
import { ContactService } from '../contact.service';

import { Sex } from '../sex';

import { ToastrService } from 'ngx-toastr';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit {
  contact: Contact | undefined;
  sexes: Sex[] = [
    { value: 'female', viewValue: 'kobieta' },
    { value: 'male', viewValue: 'mężczyzna' },
    { value: 'other', viewValue: 'inna' },
  ];

  formControlNickname = new FormControl('', [Validators.required]);
  formControlSex = new FormControl('', [Validators.required]);
  formControlName = new FormControl('', [Validators.required]);
  formControlSurname = new FormControl('', [Validators.required]);
  formControlPhone = new FormControl('', [Validators.required]);
  formControlEmail = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location,
    private toastr: ToastrService
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
      this.contact.nickname = this.contact.nickname.trim();
      this.contact.name = this.contact.name.trim();
      this.contact.surname = this.contact.surname.trim();
      this.contact.phone = this.contact.phone;
      this.contact.email = this.contact.email.trim();

      if (
        !this.contact.nickname ||
        !this.contact.name ||
        !this.contact.surname ||
        !this.contact.phone ||
        !this.contact.email
      ) {
        this.toastr.error('Nie wypełniono wymaganych pól!');
        return;
      } else {
        this.contactService
          .updateContact(this.contact)
          .subscribe(() => this.goBack());
      }
    }
  }
}
