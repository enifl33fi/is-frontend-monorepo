import {HttpClient} from '@angular/common/http';
import {inject, Injectable, OnDestroy} from '@angular/core';
import {lab1ProductActions} from '@is/labs/lab1/shared/product/store';
import {FormProduct, Product, TableProduct} from '@is/labs/lab1/shared/product/types';
import {EntityQueryParams, PageResponse} from '@is/labs/lab1/shared/types';
import {formHttpParamsFn, WS_URL_TOKEN} from '@is/labs/lab1/shared/utils';
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

  public getAllProducts(
    queryParams: EntityQueryParams,
  ): Observable<PageResponse<TableProduct>> {
    const params = formHttpParamsFn(queryParams);

    return this.http
      .get<
        PageResponse<Product>
      >(`${this.backUrlSubject$.getValue()}/product/all`, {params})
      .pipe(
        map((response) => {
          return {
            ...response,
            content: response.content.map(convertProductToTableProduct),
          };
        }),
      );
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.backUrlSubject$.getValue()}/product/${id}`);
  }

  public onStompMessage() {
    this.store.dispatch(lab1ProductActions.fetchProducts());
  }

  public addProduct(product: FormProduct): Observable<Product> {
    return this.http.post<Product>(`${this.backUrlSubject$.getValue()}/product`, product);
  }

  public updateProduct(product: FormProduct): Observable<Product> {
    return this.http.patch<Product>(
      `${this.backUrlSubject$.getValue()}/product/${product.id}`,
      product,
    );
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.backUrlSubject$.getValue()}/product/${id}`);
  }

  public countOwnerLessThan(ownerId: number): Observable<number> {
    return this.http.get<number>(
      `${this.backUrlSubject$.getValue()}/product/count_owner_less_than/${ownerId}`,
    );
  }

  public findByPartNumber(partNumber: string): Observable<TableProduct[]> {
    return this.http
      .get<
        Product[]
      >(`${this.backUrlSubject$.getValue()}/product/find_by_part_number?partNumber=${partNumber}`)
      .pipe(map((products) => products.map(convertProductToTableProduct)));
  }

  public findRatings(): Observable<number[]> {
    return this.http.get<number[]>(`${this.backUrlSubject$.getValue()}/product/ratings`);
  }

  public decreasePrice(manufactureId: number, percent: number): Observable<void> {
    return this.http.patch<void>(
      `${this.backUrlSubject$.getValue()}/product/decrease-price/${manufactureId}`,
      percent,
    );
  }

  public ngOnDestroy() {
    this.client?.deactivate();
  }
}
