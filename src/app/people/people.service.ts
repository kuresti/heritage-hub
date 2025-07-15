/***************************
 * Imports
 ***************************/
import { EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';

import { Person } from './person.model';
import { MOCKPERSON } from './MOCKPERSON';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  // Properties
  people: Person[] = [];
  peopleChangedEvent = new EventEmitter<Person[]>();
  peopleListChangedEvent = new Subject<Person[]>();
  maxPersonId: number;
 // Methods
  constructor() {
      this.people = MOCKPERSON;
      this.maxPersonId = this.getMaxId();
   }

   getMaxId(): number {
    let maxId = 0;

    for (let person of this.people) {
      const currentId = parseInt(person.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
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

   deletePerson(person: Person) {
    if(!person) {
      return;
    }

    const pos = this.people.indexOf(person);
    if (pos < 0) {
      return;
    }

    this.people.splice(pos, 1);
    const peopleListClone = this.people.slice();
    this.peopleListChangedEvent.next(peopleListClone);
  }

  addPerson(newPerson: Person){ 
    if (!newPerson) {
      return;
    }

    this.maxPersonId++;
    newPerson.id = this.maxPersonId.toString();

    this.people.push(newPerson);

    const peopleListClone = this.people.slice();
    this.peopleListChangedEvent.next(peopleListClone);
  }

  updatePerson(originalPerson: Person, newPerson: Person) {
    if (!originalPerson || !newPerson) {
      return;
    }

    const pos = this.people.indexOf(originalPerson);
    if (pos < 0) {
      return;
    }

    const personListClone = this.people.slice();
    this.peopleListChangedEvent.next(personListClone);
  }
}
