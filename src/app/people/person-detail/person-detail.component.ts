/**************************************
 * Imports
 **************************************/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Person } from '../person.model';
import { PeopleService } from '../people.service';
import { ResearchNote } from '../../research-notes/research-note.model';
import { ResearchNotesService } from '../../research-notes/research-notes.service';

/**************************************
 * Component
 **************************************/
@Component({
  selector: 'heritage-hub-person-detail',
  standalone: false,
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css'
})

/**************************************
 * Class
 **************************************/
export class PersonDetailComponent implements OnInit {
 // Properties
 person: Person;
 parent: Person;
 child: Person;
 id: string;
 researchNotes: ResearchNote[] = [];
 

 //Methods
 constructor(private route: ActivatedRoute,
             private peopleService: PeopleService,
             private router: Router,
             private researchNotesService: ResearchNotesService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.person = this.peopleService.getPerson(this.id);
      });

      // Get all notes and filter for this person
      const notes = this.researchNotesService.getResearchNotes();
      if (Array.isArray(notes)) {
        this.researchNotes = notes.filter(note => note.personId === this.person.id);
      } else {
        this.researchNotes = [];
      }
    }
  
 
   addChildToParent(parent: Person, child: Person) {
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(child.id);
  }

  onDelete() {
    this.peopleService.deletePerson(this.person)
    this.router.navigate(['/people']);
  }
}
