/*************************************
 * Imports
 *************************************/
import { Component } from '@angular/core';

import { Person } from '../people/person.model';

@Component({
  selector: 'heritage-hub-people',
  standalone: false,
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {
 //Properties
 selectedPerson: Person;
}
