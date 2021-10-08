import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactsUrl = 'api/contacts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private toastr: ToastrService
  ) {}

  private handleError<T>(operation = 'Operacja', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} nieudana: ${error.message}.`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ContactService: ${message}.`);
    this.toastr.success(message);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl).pipe(
      tap((_) => this.log('Pobrano listę kontaktów.')),
      catchError(this.handleError<Contact[]>('getContacts, []'))
    );
  }

  getContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap((_) => {
        this.log(`Pobrano dane kontaktu o id ${id}.`);
      }),
      catchError(
        this.handleError<Contact>(
          `Nie udało się pobrać danych kontaktu o id ${id}.`
        )
      )
    );
  }

  updateContact(contact: Contact): Observable<any> {
    return this.http.put(this.contactsUrl, contact, this.httpOptions).pipe(
      tap((_) => this.log(`Zaktualizowano kontakt o id ${contact.id}.`)),
      catchError(this.handleError<any>('Nie udało się zaktualizować kontaktu.'))
    );
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http
      .post<Contact>(this.contactsUrl, contact, this.httpOptions)
      .pipe(
        tap((newContact: Contact) =>
          this.log(`Dodano kontakt o id ${newContact.id}.`)
        ),
        catchError(this.handleError<Contact>('Nie można było dodać kontaktu.'))
      );
  }

  deleteContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;

    return this.http.delete<Contact>(url, this.httpOptions).pipe(
      tap((_) => this.log(`Usunięto kontakt o id=${id}`)),
      catchError(
        this.handleError<Contact>('Nie udało się usunąć kontaktu o id=${id}.')
      )
    );
  }
}
