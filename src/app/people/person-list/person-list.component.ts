/**************************************
 * Imports
 **************************************/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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
export class PersonListComponent implements OnInit, OnDestroy{
  //Properties
  private subscription: Subscription;
  // The people array will hold the list of Person objects;
  people: Person[] = []
  term: string = '';

  // Methods
   constructor( private peopleService: PeopleService) {}
   

  ngOnInit() {
    console.log('Calling getPeople...');
    this.peopleService.getPeople();
    this.subscription = this.peopleService.peopleListChangedEvent.subscribe(
      (personList: Person[]) => {
        console.log('Received personList:', personList)
        this.people = personList;
      });   
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
}
