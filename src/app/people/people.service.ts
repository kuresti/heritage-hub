/***************************
 * Imports
 ***************************/
import { EventEmitter, Injectable} from '@angular/core';

import { Person } from './person.model';
import { MOCKPERSON } from './MOCKPERSON';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  // Properties
  people: Person[] = [];
  

 // Methods
  constructor() {
      this.people = MOCKPERSON;
   }

   getPeople(): Person[] {
      return this.people.slice();
   }

   getPerson(id: string) {
    for (let person of this.people) {
      if (person.id === id) {
        return person;
      }
    }
    return null;
   }
}
