import type {HttpErrorResponse} from '@angular/common/http';
import type {UserRegisterRequestDto, UserRequestDto} from '@is/labs/lab1/shared/user/dto';
import type {AdminRequest, AuthResponse} from '@is/labs/lab1/shared/user/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const userFeatureKey = 'user';

export const lab1UserActions = createActionGroup({
  source: userFeatureKey,
  events: {
    rawUsernameFetched: props<{
      username: string;
    }>(),
    register: props<{user: UserRegisterRequestDto}>(),
    login: props<{user: UserRequestDto}>(),
    authResponseFetched: props<{response: AuthResponse}>(),
    authResponseSavedFetched: props<{response: AuthResponse}>(),
    adminRequestSentSuccessfully: emptyProps(),
    requestFailed: props<{error: HttpErrorResponse}>(),
    logout: emptyProps(),
    fetchAdminRequests: emptyProps(),
    adminRequestsFetched: props<{requests: AdminRequest[]}>(),
    showRequests: emptyProps(),
    approveRequest: props<{request: AdminRequest}>(),
    rejectRequest: props<{request: AdminRequest}>(),
    approveRequestCompleted: emptyProps(),
    rejectRequestCompleted: emptyProps(),
  },
});
