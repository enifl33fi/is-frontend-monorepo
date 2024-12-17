import {inject, Injectable, OnDestroy} from '@angular/core';
import {lab1UserActions} from '@is/labs/lab1/shared/user/store';
import {WS_URL_TOKEN} from '@is/labs/lab1/shared/utils';
import {Store} from '@ngrx/store';
import {Client} from '@stomp/stompjs';

@Injectable({providedIn: 'root'})
export class UserWsService implements OnDestroy {
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
        this.client?.subscribe('/topic/adminRequests', () => this.onStompMessage());
      },
    });

    this.client.activate();
  }

  public onStompMessage() {
    this.store.dispatch(lab1UserActions.fetchAdminRequests());
  }

  public ngOnDestroy() {
    this.client?.deactivate();
  }
}
