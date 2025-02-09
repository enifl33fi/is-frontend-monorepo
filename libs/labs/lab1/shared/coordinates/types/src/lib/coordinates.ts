import type {Entity, FormEntity} from '@is/labs/lab1/shared/types';

export interface CoordinatesData {
  x: number;
  y: number;
}

export interface Coordinates extends Entity, CoordinatesData {}

export interface FormCoordinates
  extends FormEntity,
    CoordinatesData,
    Partial<Omit<Entity, 'hasAccess'>> {}
