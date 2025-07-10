/************************************
 * Imports
 ************************************/
import { Component, Input, OnInit } from '@angular/core';

import { ResearchNote } from '../research-note.model';
import { PeopleService } from '../../people/people.service';



@Component({
  selector: 'heritage-hub-research-notes-item',
  standalone: false,
  templateUrl: './research-notes-item.component.html',
  styleUrl: './research-notes-item.component.css'
})

export class ResearchNotesItemComponent {
  // Properties
   @Input() note: ResearchNote;
   personName: string;

  // Methods
  constructor(private peopleService: PeopleService) {} 

  ngOnInit() {
    const person = this.peopleService.getPerson(this.note.personId);
    this.personName = person ? person.firstName + '' + person.lastName : 'Unknown Person';
  }
  

}
