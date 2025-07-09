/**************************************
 * Imports
 **************************************/
import { Component, Input } from '@angular/core';

import { Person } from '../person.model';
@Component({
  selector: 'heritage-hub-person-detail',
  standalone: false,
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css'
})
export class PersonDetailComponent {
 // Properties
 @Input() person: Person;
 parent: Person;
 child: Person;
 

 //Methods
   addChildToParent(parent: Person, child: Person) {
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(child);
  }

  onDelete() {}
}
