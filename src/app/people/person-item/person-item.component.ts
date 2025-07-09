/************************************
 * Imports
 ************************************/
import { Component, Input } from '@angular/core';

import { Person } from '../person.model';

@Component({
  selector: 'heritage-hub-person-item',
  standalone: false,
  templateUrl: './person-item.component.html',
  styleUrl: './person-item.component.css'
})
export class PersonItemComponent {
  // Properties
  @Input() person: Person;
 

  
}
