/*************************
 * Imports
 *************************/
import { Component, OnInit } from '@angular/core';

import { ResearchNote } from '../research-note.model'
import { ResearchNotesService } from '../research-notes.service'
import { ActivatedRoute, Router, Params} from '@angular/router';


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
  note: ResearchNote;
  id: string;

  // Methods
  constructor (private researchNotesService: ResearchNotesService,
               private router: Router,
               private route: ActivatedRoute               
  ) {}

  //Refactored 7/23/2025 2:35pm
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.note = this.researchNotesService.getResearchNote(this.id);
      });
  }

  /*ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.note = this.researchNotesService.getResearchNote(id);
    });
     // Looks up person's name
    const person: Person | undefined = this.peopleService.getPerson(this.note.personId);
     // If found, formats the name
    this.personName = person ? person.firstName + '' + person.lastName : 'Unknown Person';
  }*/

   onDelete() {
    this.researchNotesService.deleteNote(this.note)
    this.router.navigate(['/research-notes']);
  }
}
