import {HttpClient} from '@angular/common/http';
import {inject, Injectable, OnDestroy} from '@angular/core';
import {lab1PersonActions} from '@is/labs/lab1/shared/person/store';
import {Person, TablePerson} from '@is/labs/lab1/shared/person/types';
import {WS_URL_TOKEN} from '@is/labs/lab1/shared/utils';
import {BACK_URL_TOKEN} from '@is/shared/utils';
import {Store} from '@ngrx/store';
import {Client} from '@stomp/stompjs';
import {map, Observable} from 'rxjs';

import {convertPersonToTablePerson} from './converters/person.converters';

@Injectable({providedIn: 'root'})
export class PersonService implements OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly backUrlSubject$ = inject(BACK_URL_TOKEN);
  private readonly wsUrlSubject$ = inject(WS_URL_TOKEN);
  private readonly store = inject(Store);
  private client?: Client;

  public wsConnect(accessToken: string) {
    this.client = new Client({
      brokerURL: this.wsUrlSubject$.getValue(),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        this.client?.subscribe('/topic/person', () => this.onStompMessage());
      },
    });

    this.client.activate();
  }

  public getAllPersons(): Observable<TablePerson[]> {
    return this.http
      .get<Person[]>(`${this.backUrlSubject$.getValue()}/person/all`)
      .pipe(map((persons) => persons.map(convertPersonToTablePerson)));
  }

  public getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.backUrlSubject$.getValue()}/person/${id}`);
  }

  public onStompMessage() {
    this.store.dispatch(lab1PersonActions.fetchPersons());
  }

  public ngOnDestroy() {
    this.client?.deactivate();
  }
}
