/*************************************
 * Imports
 *************************************/
import { Component, OnInit } from '@angular/core';

import { Person } from '../people/person.model';
import { PeopleService } from './people.service';

@Component({
  selector: 'heritage-hub-people',
  standalone: false,
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent implements OnInit {
 //Properties
 selectedPerson: Person;

 // Methods
 constructor(private peopleService: PeopleService) {}

 ngOnInit(): void {
   this.peopleService.selectedPersonEvent.subscribe(
    (person: Person) => {
      this.selectedPerson = person;
    }
   )
 }
}
