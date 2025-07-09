/**************************************
 * Imports
 **************************************/
import { Component, Output, EventEmitter } from '@angular/core';

import { Person } from '../person.model';

/***************************************
 * Component Decorator
 ***************************************/
@Component({
  selector: 'heritage-hub-person-list',
  standalone: false,
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})

/****************************************
 * PersonalListComponent 
 ****************************************/
export class PersonListComponent {
  //Properties
  @Output() selectedPersonEvent =   new EventEmitter<Person>();
  // The people array will hold the list of Person objects;
  people: Person[] = [
    new Person(
      '1',
      'Christopher',
      'John',
      'Uresti',
      '12/07/1973',
      'Boise, Id',
      'NA',
      'Living',
      'NA',
      'Very Handsome Man',
      []
    ),
    new Person(
      '2',
      'Kimberly',
      'Lynn',
      'Uresti',
      '12/07/1973',
      'Salt Lake City, UT',
      'NA',
      'Living',
      'NA',
      'Spouse of Christopher',
      []
    ),
    new Person(
      '3',
      'Haydon',
      'Duke',
      'Uresti',
      '06/24/2000',
      'Salt Lake City, Ut',
      'NA',
      'Living',
      'NA',
      'Sweet Son',
      []
    )
  ]

  // Methods
  onSelected(person: Person) {
    this.selectedPersonEvent.emit(person);
  }
}
