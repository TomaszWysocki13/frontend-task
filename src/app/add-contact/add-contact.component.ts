import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Sex } from '../sex';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
  providers: [ContactDetailsComponent],
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  contacts: Contact[] = [];

  selectedValue: string = '';

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
    private contactService: ContactService,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<AddContactComponent>
  ) {}

  ngOnInit(): void {}

  add(
    nickname: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    sex: string
  ): void {
    nickname = nickname.trim();
    name = name.trim();
    surname = surname.trim();
    phone = phone.trim();
    email = email.trim();

    if (!nickname || !sex || !name || !surname || !email || !phone) {
      this.toastr.error('Nie wypełniono wymaganych pól!');
      return;
    }
    this.contactService
      .addContact({ nickname, name, surname, email, phone, sex } as Contact)
      .subscribe((contact) => {
        this.contacts.push(contact);
        if (this.router.url == '/contact-list') {
          this.dialogRef.close();
        }
        this.router.navigate(['/']);
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
