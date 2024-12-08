import type {Entity} from './entity';

export interface TableEntity extends Entity, Record<string, unknown> {}
