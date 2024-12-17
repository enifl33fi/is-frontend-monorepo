import {HttpClient} from '@angular/common/http';
import {inject, Injectable, OnDestroy} from '@angular/core';
import {lab1AddressActions} from '@is/labs/lab1/shared/address/store';
import {Address, TableAddress} from '@is/labs/lab1/shared/address/types';
import {WS_URL_TOKEN} from '@is/labs/lab1/shared/utils';
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

  public getAllAddresses(): Observable<TableAddress[]> {
    return this.http
      .get<Address[]>(`${this.backUrlSubject$.getValue()}/address/all`)
      .pipe(map((addresses) => addresses.map(convertAddressToTableAddress)));
  }

  public getAddress(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.backUrlSubject$.getValue()}/address/${id}`);
  }

  public onStompMessage() {
    this.store.dispatch(lab1AddressActions.fetchAddresses());
  }

  public ngOnDestroy() {
    this.client?.deactivate();
  }
}
