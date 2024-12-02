import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {
  UserRegisterRequestDto,
  UserRequestDto,
  UserResponseDto,
} from '@is/labs/lab1/shared/user/dto';
import {AuthResponse, Tokens, User} from '@is/labs/lab1/shared/user/types';
import {BACK_URL_TOKEN, LOCAL_STORAGE_TOKEN} from '@is/shared/utils';
import {map, Observable} from 'rxjs';

import {convertUserResponseDtoToAuthResponse} from './converters/user.converters';

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly backUrlSubject$ = inject(BACK_URL_TOKEN);
  private readonly localStorage = inject(LOCAL_STORAGE_TOKEN);
  private readonly accessTokenKey: string = 'access_token';
  private readonly refreshTokenKey: string = 'refresh_token';
  private readonly userKey: string = 'user';

  public registerUser(user: UserRegisterRequestDto): Observable<AuthResponse> {
    return this.http
      .post<UserResponseDto>(`${this.backUrlSubject$.getValue()}/auth/register`, user)
      .pipe(map((dto: UserResponseDto) => convertUserResponseDtoToAuthResponse(dto)));
  }

  public loginUser(user: UserRequestDto): Observable<AuthResponse> {
    return this.http
      .post<UserResponseDto>(`${this.backUrlSubject$.getValue()}/auth/login`, user)
      .pipe(map((dto: UserResponseDto) => convertUserResponseDtoToAuthResponse(dto)));
  }

  public registerAdmin(user: UserRegisterRequestDto): Observable<void> {
    return this.http.post<void>(`${this.backUrlSubject$.getValue()}/auth/register`, user);
  }

  public getAccessToken(): string | null {
    return this.localStorage.getItem(this.accessTokenKey);
  }

  public getRefreshToken(): string | null {
    return this.localStorage.getItem(this.refreshTokenKey);
  }

  public getTokens(): Tokens | null {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return null;
    }

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  public getUser(): User | null {
    try {
      const data = this.localStorage.getItem(this.userKey);

      if (data) {
        return JSON.parse(data) as User;
      }

      return null;
    } catch {
      return null;
    }
  }

  public storeTokens(tokens: Tokens): void {
    this.localStorage.setItem(this.accessTokenKey, tokens.access);
    this.localStorage.setItem(this.refreshTokenKey, tokens.refresh);
  }

  public storeUser(user: User) {
    this.localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  public removeTokens(): void {
    this.localStorage.removeItem(this.accessTokenKey);
    this.localStorage.removeItem(this.refreshTokenKey);
  }

  public removeUser() {
    this.localStorage.removeItem(this.userKey);
  }
}
