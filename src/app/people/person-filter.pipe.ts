/********************************
 * Imports
 ********************************/
import { Pipe, PipeTransform } from '@angular/core';

import { Person } from './person.model';

/********************************
 * Decorations
 ********************************/
@Pipe({
  name: 'personFilterPipe',
  standalone: false
})

/*********************************
 * Class
 *********************************/
export class PersonFilterPipePipe implements PipeTransform {

  //Method
  transform(people: Person[], term: string): Person[] {
    if (!people || !term) return people;

    const filteredPeople = people.filter(person =>
      `${person.firstName} ${person.middleName ?? ''} ${person.lastName}`.toLowerCase().includes(term.toLowerCase())
    );

    return filteredPeople.length > 0 ? filteredPeople : people;
  }

}
