import {HttpClient} from '@angular/common/http';
import {inject, Injectable, OnDestroy} from '@angular/core';
import {lab1OrganizationActions} from '@is/labs/lab1/shared/organization/store';
import {Organization, TableOrganization} from '@is/labs/lab1/shared/organization/types';
import {WS_URL_TOKEN} from '@is/labs/lab1/shared/utils';
import {BACK_URL_TOKEN} from '@is/shared/utils';
import {Store} from '@ngrx/store';
import {Client} from '@stomp/stompjs';
import {map, Observable} from 'rxjs';

import {convertOrganizationToOrganizationTable} from './converters/organization.converters';

@Injectable({providedIn: 'root'})
export class OrganizationService implements OnDestroy {
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
        this.client?.subscribe('/topic/organization', () => this.onStompMessage());
      },
    });

    this.client.activate();
  }

  public getAllOrganizations(): Observable<TableOrganization[]> {
    return this.http
      .get<Organization[]>(`${this.backUrlSubject$.getValue()}/organization/all`)
      .pipe(
        map((organizations) => organizations.map(convertOrganizationToOrganizationTable)),
      );
  }

  public getOrganization(id: number): Observable<Organization> {
    return this.http.get<Organization>(
      `${this.backUrlSubject$.getValue()}/organization/${id}`,
    );
  }

  public onStompMessage() {
    this.store.dispatch(lab1OrganizationActions.fetchOrganizations());
  }

  public ngOnDestroy() {
    this.client?.deactivate();
  }
}
