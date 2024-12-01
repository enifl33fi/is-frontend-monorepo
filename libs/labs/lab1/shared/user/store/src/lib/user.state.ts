import type {Tokens, User} from '@is/labs/lab1/shared/user/types';

export interface UserState {
  rawUsername: string;
  user: User | null;
  tokens: Tokens | null;
}
