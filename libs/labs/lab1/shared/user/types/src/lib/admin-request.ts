import type {User} from './user';

export type AdminRequest = Omit<User, 'isAdmin'>;
