import type {Person, TablePerson} from '@is/labs/lab1/shared/person/types';

export function convertPersonToTablePerson(person: Person): TablePerson {
  return {
    id: person.id,
    hasAccess: person.hasAccess,
    locationId: person.location?.id ?? null,
    name: person.name,
    eyeColor: person.eyeColor,
    hairColor: person.hairColor,
    weight: person.weight,
    nationality: person.nationality,
    creationDate: person.creationDate,
  };
}
