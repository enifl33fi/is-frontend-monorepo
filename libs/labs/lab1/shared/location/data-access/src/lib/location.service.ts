import {HttpClient} from '@angular/common/http';
import {inject, Injectable, OnDestroy} from '@angular/core';
import {lab1LocationActions} from '@is/labs/lab1/shared/location/store';
import {FormLocation, Location} from '@is/labs/lab1/shared/location/types';
import {WS_URL_TOKEN} from '@is/labs/lab1/shared/utils';
import {BACK_URL_TOKEN} from '@is/shared/utils';
import {Store} from '@ngrx/store';
import {Client} from '@stomp/stompjs';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LocationService implements OnDestroy {
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
        this.client?.subscribe('/topic/location', () => this.onStompMessage());
      },
    });

    this.client.activate();
  }

  public getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.backUrlSubject$.getValue()}/location/all`);
  }

  public getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.backUrlSubject$.getValue()}/location/${id}`);
  }

  public onStompMessage() {
    this.store.dispatch(lab1LocationActions.fetchLocations());
  }

  public addLocation(location: FormLocation): Observable<Location> {
    return this.http.post<Location>(
      `${this.backUrlSubject$.getValue()}/location`,
      location,
    );
  }

  public updateLocation(location: FormLocation): Observable<Location> {
    return this.http.patch<Location>(
      `${this.backUrlSubject$.getValue()}/location/${location.id}`,
      location,
    );
  }

  public deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.backUrlSubject$.getValue()}/location/${id}`);
  }

  public getOwnIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.backUrlSubject$.getValue()}/location/own`);
  }

  public ngOnDestroy() {
    this.client?.deactivate();
  }
}
