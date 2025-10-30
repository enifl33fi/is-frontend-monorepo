import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable, OnDestroy} from '@angular/core';
import {convertPersonToTablePerson} from '@is/labs/lab1/shared/person/data-access';
import {Person, TablePerson} from '@is/labs/lab1/shared/person/types';
import {lab1ProductActions} from '@is/labs/lab1/shared/product/store';
import {
  FormProduct,
  Product,
  TableProduct,
  UnitOfMeasure,
} from '@is/labs/lab1/shared/product/types';
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

  public getAverageRating(): Observable<number> {
    return this.http.get<number>(
      `${this.backUrlSubject$.getValue()}/product/average-rating`,
    );
  }

  public countByRating(rating: number): Observable<number> {
    return this.http.get<number>(
      `${this.backUrlSubject$.getValue()}/product/count-by-rating/${rating}`,
    );
  }

  public getDistinctOwners(): Observable<TablePerson[]> {
    return this.http
      .get<Person[]>(`${this.backUrlSubject$.getValue()}/product/distinct-owners`)
      .pipe(
        map((persons) => persons.map((person) => convertPersonToTablePerson(person))),
      );
  }

  public getProductsByUnitOfMeasure(
    unitOfMeasures: UnitOfMeasure[],
  ): Observable<TableProduct[]> {
    let params = new HttpParams();

    unitOfMeasures.forEach((unit) => {
      params = params.append('unitOfMeasures', unit);
    });

    return this.http
      .get<
        Product[]
      >(`${this.backUrlSubject$.getValue()}/product/by-unit-of-measure`, {params})
      .pipe(map((products) => products.map(convertProductToTableProduct)));
  }

  public decreaseAllPrices(percent: number): Observable<void> {
    return this.http.patch<void>(
      `${this.backUrlSubject$.getValue()}/product/decrease-all-prices`,
      percent,
    );
  }

  public ngOnDestroy() {
    this.client?.deactivate();
  }
}
