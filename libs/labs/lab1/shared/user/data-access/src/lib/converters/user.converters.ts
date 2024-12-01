import type {UserResponseDto} from '@is/labs/lab1/shared/user/dto';
import type {AuthResponse} from '@is/labs/lab1/shared/user/types';

export function convertUserResponseDtoToAuthResponse(dto: UserResponseDto): AuthResponse {
  return {
    tokens: {
      access: dto.accessToken,
      refresh: dto.refreshToken,
    },
    user: {
      username: dto.username,
      isAdmin: dto.isAdmin,
    },
  };
}
