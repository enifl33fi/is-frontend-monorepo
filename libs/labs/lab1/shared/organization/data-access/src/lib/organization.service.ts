import {HttpClient} from '@angular/common/http';
import {inject, Injectable, OnDestroy} from '@angular/core';
import {lab1OrganizationActions} from '@is/labs/lab1/shared/organization/store';
import {
  FormOrganization,
  Organization,
  TableOrganization,
} from '@is/labs/lab1/shared/organization/types';
import {EntityQueryParams, PageResponse} from '@is/labs/lab1/shared/types';
import {formHttpParamsFn, WS_URL_TOKEN} from '@is/labs/lab1/shared/utils';
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

  public getAllOrganizations(
    queryParams: EntityQueryParams,
  ): Observable<PageResponse<TableOrganization>> {
    const params = formHttpParamsFn(queryParams);

    return this.http
      .get<
        PageResponse<Organization>
      >(`${this.backUrlSubject$.getValue()}/organization/all`, {params})
      .pipe(
        map((response) => {
          return {
            ...response,
            content: response.content.map(convertOrganizationToOrganizationTable),
          };
        }),
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

  public addOrganization(organization: FormOrganization): Observable<Organization> {
    return this.http.post<Organization>(
      `${this.backUrlSubject$.getValue()}/organization`,
      organization,
    );
  }

  public updateOrganization(organization: FormOrganization): Observable<Organization> {
    return this.http.patch<Organization>(
      `${this.backUrlSubject$.getValue()}/organization/${organization.id}`,
      organization,
    );
  }

  public deleteOrganization(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.backUrlSubject$.getValue()}/organization/${id}`,
    );
  }

  public getOwnIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.backUrlSubject$.getValue()}/organization/own`);
  }

  public ngOnDestroy() {
    this.client?.deactivate();
  }
}
