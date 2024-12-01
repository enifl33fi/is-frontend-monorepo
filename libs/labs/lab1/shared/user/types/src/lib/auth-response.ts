import type {Tokens} from './tokens';
import type {User} from './user';

export interface AuthResponse {
  tokens: Tokens;
  user: User;
}
