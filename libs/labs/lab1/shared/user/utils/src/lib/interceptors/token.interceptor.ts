import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UserService} from '@is/labs/lab1/shared/user/data-access';
import {
  lab1UserActions,
  selectAccessToken,
  selectRefreshToken,
} from '@is/labs/lab1/shared/user/store';
import {BACK_URL_TOKEN} from '@is/shared/utils';
import {Store} from '@ngrx/store';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly store = inject(Store);
  private readonly userService = inject(UserService);
  private readonly backUrl = inject(BACK_URL_TOKEN);

  private readonly accessTokenSignal = this.store.selectSignal(selectAccessToken);
  private readonly refreshTokenSignal = this.store.selectSignal(selectRefreshToken);

  private readonly refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  private isRefreshing = false;

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (!req.url.includes(`${this.backUrl.getValue()}/auth`)) {
      return next.handle(req);
    }

    const accessToken = this.accessTokenSignal();

    if (accessToken) {
      req = this.addToken(req, accessToken);
    }

    return next.handle(req).pipe(
      catchError((err: unknown) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handle401Error(req, next);
        }

        return throwError(() => err);
      }),
    );
  }

  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.refreshTokenSignal();

      return this.userService.refreshTokens({refreshToken}).pipe(
        switchMap((response) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.tokens.refresh);
          this.store.dispatch(lab1UserActions.authResponseFetched({response}));

          return next.handle(this.addToken(request, response.tokens.refresh));
        }),
        catchError((err: unknown) => {
          this.isRefreshing = false;
          this.store.dispatch(lab1UserActions.logout());

          return throwError(() => err);
        }),
      );
    }

    return this.refreshTokenSubject.pipe(
      filter((accessToken) => !!accessToken),
      take(1),
      switchMap((accessToken) =>
        next.handle(this.addToken(request, accessToken as string)),
      ),
    );
  }

  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
