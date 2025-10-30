import {HttpClient} from '@angular/common/http';
import {inject, Injectable, OnDestroy} from '@angular/core';
import {lab1AddressActions} from '@is/labs/lab1/shared/address/store';
import {Address, FormAddress, TableAddress} from '@is/labs/lab1/shared/address/types';
import {EntityQueryParams, PageResponse} from '@is/labs/lab1/shared/types';
import {formHttpParamsFn, WS_URL_TOKEN} from '@is/labs/lab1/shared/utils';
import {BACK_URL_TOKEN} from '@is/shared/utils';
import {Store} from '@ngrx/store';
import {Client} from '@stomp/stompjs';
import {map, Observable} from 'rxjs';

import {convertAddressToTableAddress} from './converters/address.converters';

@Injectable({providedIn: 'root'})
export class AddressService implements OnDestroy {
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
        this.client?.subscribe('/topic/address', () => this.onStompMessage());
      },
    });

    this.client.activate();
  }

  public getAllAddresses(
    queryParams: EntityQueryParams,
  ): Observable<PageResponse<TableAddress>> {
    const params = formHttpParamsFn(queryParams);

    return this.http
      .get<
        PageResponse<Address>
      >(`${this.backUrlSubject$.getValue()}/address/all`, {params})
      .pipe(
        map((response) => {
          return {
            ...response,
            content: response.content.map(convertAddressToTableAddress),
          };
        }),
      );
  }

  public getAddress(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.backUrlSubject$.getValue()}/address/${id}`);
  }

  public onStompMessage() {
    this.store.dispatch(lab1AddressActions.fetchAddresses());
  }

  public addAddress(address: FormAddress): Observable<Address> {
    return this.http.post<Address>(`${this.backUrlSubject$.getValue()}/address`, address);
  }

  public updateAddress(address: FormAddress): Observable<Address> {
    return this.http.patch<Address>(
      `${this.backUrlSubject$.getValue()}/address/${address.id}`,
      address,
    );
  }

  public deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.backUrlSubject$.getValue()}/address/${id}`);
  }

  public getOwnIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.backUrlSubject$.getValue()}/address/own`);
  }

  public ngOnDestroy() {
    this.client?.deactivate();
  }
}
