import {HttpClient} from '@angular/common/http';
import {inject, Injectable, OnDestroy} from '@angular/core';
import {lab1ProductActions} from '@is/labs/lab1/shared/product/store';
import {Product, TableProduct} from '@is/labs/lab1/shared/product/types';
import {WS_URL_TOKEN} from '@is/labs/lab1/shared/utils';
import {BACK_URL_TOKEN} from '@is/shared/utils';
import {Store} from '@ngrx/store';
import {Client} from '@stomp/stompjs';
import {map, Observable} from 'rxjs';

import {convertProductToTableProduct} from './converters/product.converters';

@Injectable({providedIn: 'root'})
export class ProductService implements OnDestroy {
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
        this.client?.subscribe('/topic/product', () => this.onStompMessage());
      },
    });

    this.client.activate();
  }

  public getAllProducts(): Observable<TableProduct[]> {
    return this.http
      .get<Product[]>(`${this.backUrlSubject$.getValue()}/product/all`)
      .pipe(map((products) => products.map(convertProductToTableProduct)));
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.backUrlSubject$.getValue()}/product/${id}`);
  }

  public onStompMessage() {
    this.store.dispatch(lab1ProductActions.fetchProducts());
  }

  public ngOnDestroy() {
    this.client?.deactivate();
  }
}
