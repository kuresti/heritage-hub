/************************************
 * Imports
 ************************************/
import { Component, OnInit, Input } from '@angular/core';

import { ResearchNote } from '../research-note.model';
import { PeopleService } from '../../people/people.service';
import { Person } from '../../people/person.model';



@Component({
  selector: 'heritage-hub-research-notes-item',
  standalone: false,
  templateUrl: './research-notes-item.component.html',
  styleUrl: './research-notes-item.component.css'
})

export class ResearchNotesItemComponent implements OnInit{
  // Properties
   @Input() note: ResearchNote;
   personName: string = 'Unknown Person';

  // Methods
  constructor(private peopleService: PeopleService) {} 

  ngOnInit() {
    // Looks up person's name
    const person: Person | undefined = this.peopleService.getPerson(this.note.personId);
    console.log(`ResearchNotesItemComponent initialize for : ${this.note?.id}`)
    // If found, formats the name
    this.personName = person ? person.firstName + '' + person.lastName : 'Unknown Person';
  }
  

}
