/**************************************
 * Imports
 **************************************/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Person } from '../person.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'heritage-hub-person-detail',
  standalone: false,
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css'
})
export class PersonDetailComponent implements OnInit {
 // Properties
 person: Person;
 parent: Person;
 child: Person;
 id: string;
 

 //Methods
 constructor(private route: ActivatedRoute,
             private peopleService: PeopleService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.person = this.peopleService.getPerson(this.id);
      });
    }
  
 
   addChildToParent(parent: Person, child: Person) {
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(child);
  }

  onDelete() {}
}
