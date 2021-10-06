import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
      {
        id: 1,
        nickname: 'Doris :)',
        name: 'Doris',
        surname: 'Diaz',
        email: 'Doris@email.com',
        phone: '570169736 ',
        sex: 'kobieta',
      },
      {
        id: 2,
        nickname: 'syn Wesley',
        name: 'Wesley',
        surname: 'Lewis',
        email: 'Wesley@email.com',
        phone: '450990992 ',
        sex: 'mężczyzna',
      },
      {
        id: 3,
        nickname: 'BF',
        name: 'Mae',
        surname: 'Alvarez',
        email: 'Mae@email.com',
        phone: '868031610 ',
        sex: 'kobieta',
      },
      {
        id: 4,
        nickname: 'Tato',
        name: 'Geoffrey',
        surname: 'Ramirez',
        email: 'Geoffrey@email.com',
        phone: '957419262 ',
        sex: 'mężczyzna',
      },
      {
        id: 5,
        nickname: 'Mama',
        name: 'Aubrey',
        surname: 'Ramirez',
        email: 'Aubrey@email.com',
        phone: '261728329 ',
        sex: 'kobieta',
      },
      {
        id: 6,
        nickname: 'Heather Sanders',
        name: 'Heather',
        surname: 'Sanders',
        email: 'Heather@email.com',
        phone: '551163809 ',
        sex: 'kobieta',
      },
    ];
    return { contacts };
  }

  genId(contacts: Contact[]): number {
    return contacts.length > 0
      ? Math.max(...contacts.map((contact) => contact.id)) + 1
      : 1;
  }
}
