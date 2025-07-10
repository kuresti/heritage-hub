/**************************************
 * Imports
 **************************************/
import { Component, OnInit } from '@angular/core';

import { Person } from '../person.model';
import { PeopleService } from '../people.service';

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
export class PersonListComponent implements OnInit{
  //Properties
  
  // The people array will hold the list of Person objects;
  people: Person[] = []

  // Methods
  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.people = this.peopleService.getPeople();
  }
}
