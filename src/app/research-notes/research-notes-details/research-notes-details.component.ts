/*************************
 * Imports
 *************************/
import { Component, OnInit } from '@angular/core';

import { ResearchNote } from '../research-note.model'
import { ResearchNotesService } from '../research-notes.service'
import { ActivatedRoute, Router, Params} from '@angular/router';
import { PeopleService } from '../../people/people.service';
import { Person } from '../../people/person.model';

/**************************
 * Component
 **************************/
@Component({
  selector: 'heritage-hub-research-notes-details',
  standalone: false,
  templateUrl: './research-notes-details.component.html',
  styleUrl: './research-notes-details.component.css'
})

/***************************
 * Class
 ***************************/
export class ResearchNotesDetailsComponent implements OnInit {
  // Properties
  note: ResearchNote
  id: string
  personName: string = 'Unknown Person'

  // Methods
  constructor (private researchNotesService: ResearchNotesService,
               private router: Router,
               private route: ActivatedRoute,
               private peopleService: PeopleService
  ) {}

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.note = this.researchNotesService.getResearchNote(id);
    });
     // Looks up person's name
    const person: Person | undefined = this.peopleService.getPerson(this.note.personId);
     // If found, formats the name
    this.personName = person ? person.firstName + '' + person.lastName : 'Unknown Person';
  }

   onDelete() {
    this.researchNotesService.deleteNote(this.note)
    this.router.navigate(['/researchNotes']);
  }
}
