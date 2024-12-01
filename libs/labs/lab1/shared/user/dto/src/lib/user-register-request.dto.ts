import type {Role} from '@is/labs/lab1/shared/user/types';

import type {UserRequestDto} from './user-request.dto';

export interface UserRegisterRequestDto extends UserRequestDto {
  role: Role;
}
