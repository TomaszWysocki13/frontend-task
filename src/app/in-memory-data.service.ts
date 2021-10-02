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
        nickname: 'TomWys',
        name: 'Tomek',
        surname: 'Wysocki',
        email: 'tomek@email.com',
        phone: 697697697,
        sex: 'mężczyzna',
      },
      {
        id: 2,
        nickname: 'AnnKwi',
        name: 'Anna',
        surname: 'Kwiatkowska',
        email: 'ania@email.com',
        phone: 147852369,
        sex: 'kobieta',
      },
      {
        id: 3,
        nickname: 'JanKow',
        name: 'Jan',
        surname: 'Kowalski',
        email: 'janek@email.com',
        phone: 794568468,
        sex: 'mężczyzna',
      },
    ];
    return { contacts };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(contacts: Contact[]): number {
    return contacts.length > 0
      ? Math.max(...contacts.map((contact) => contact.id)) + 1
      : 1;
  }
}
