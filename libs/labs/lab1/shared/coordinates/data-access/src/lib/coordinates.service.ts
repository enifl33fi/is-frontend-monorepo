import {HttpClient} from '@angular/common/http';
import {inject, Injectable, OnDestroy} from '@angular/core';
import {lab1CoordinatesActions} from '@is/labs/lab1/shared/coordinates/store';
import {Coordinates} from '@is/labs/lab1/shared/coordinates/types';
import {WS_URL_TOKEN} from '@is/labs/lab1/shared/utils';
import {BACK_URL_TOKEN} from '@is/shared/utils';
import {Store} from '@ngrx/store';
import {Client} from '@stomp/stompjs';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CoordinatesService implements OnDestroy {
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
        this.client?.subscribe('/topic/coordinates', () => this.onStompMessage());
      },
    });

    this.client.activate();
  }

  public getAllCoordinates(): Observable<Coordinates[]> {
    return this.http.get<Coordinates[]>(
      `${this.backUrlSubject$.getValue()}/coordinates/all`,
    );
  }

  public getCoordinates(id: number): Observable<Coordinates> {
    return this.http.get<Coordinates>(
      `${this.backUrlSubject$.getValue()}/coordinates/${id}`,
    );
  }

  public onStompMessage() {
    this.store.dispatch(lab1CoordinatesActions.fetchCoordinates());
  }

  public ngOnDestroy() {
    this.client?.deactivate();
  }
}
