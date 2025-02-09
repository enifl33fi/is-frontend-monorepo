import type {Entity, FormEntity} from '@is/labs/lab1/shared/types';

export interface LocationData {
  x: number;
  y: number;
  z: number;
  name: string;
}

export interface Location extends Entity, LocationData {}

export interface FormLocation
  extends FormEntity,
    LocationData,
    Partial<Omit<Entity, 'hasAccess'>> {}
