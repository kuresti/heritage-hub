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
// Refactored 7/22/2025 1:20pm
export class PersonDetailComponent implements OnInit {
  //Properties
  person: Person;
  parent: Person;
  child: Person;
  children: Person[] = [];
  id: string;
  personNotes: ResearchNote[] = [];

  //Methods
  constructor(private route: ActivatedRoute,
              private peopleService: PeopleService,
              private router: Router,
              private researchNotesService: ResearchNotesService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        console.log('ID from route: ', this.id);
        this.person = new Person(this.peopleService.getPerson(this.id));
        
        console.log('Person found: ', this.person);
        if (!this.person) return;

        this.resolveChildren();
        //this.resolveNotes();
      });
  }

  resolveChildren() {
    if (this.person.children?.length) {
      this.children = this.person.getPopulatedChildren();
    }
  }

  //Refactored 7/22/25 8:11pm
  // resolveNotes() {
  //   this.researchNotesService.noteListChangedEvent.subscribe(notes => {
  //     console.log('RAW emitted notes:', notes);
  //     console.log('Received notes:', notes);
  //     console.log('Target person ID:', this.person?.id);
  //     if (!this.person) return;
  //     this.personNotes = notes.filter(note => {
  //       console.log(`Comparing note.personId="${note.personId}" with person.id="${this.person?.id}"`)
  //         return String(note.personId).trim() === String(this.person.id).trim()
  //       });
        
        
  //     });
  //     console.log('Filtered notes:', this.personNotes);
  

  //   this.researchNotesService.getResearchNotes();
  // }

  //Original resolveNotes
  // resolveNotes() {
  //   const notes = this.researchNotesService.getResearchNotes();
  //   if (Array.isArray(notes)) {
  //     this.personNotes = notes.filter( note => note.personId === this.person.id);
  //   }

  //   this.researchNotesService.getResearchNotes();
  //   console.log('All notes:', notes);
  //   console.log('Filtering for person ID:', this.person?.id);
  //   console.log('Filtered notes:', this.personNotes);

  // }

  addChildToParent(parent: Person, child: Person) {
    if (!parent || !child)return;

    if (!parent.children) {
      parent.children = [];
    }

    const childId = typeof child === 'string' ? child : child.id;

    if (!parent.children.includes(childId)) {
      parent.children.push(childId);
      this.peopleService.updatePerson(parent, parent);
      this.resolveChildren(); //Updates the UI
    }
  }

  onDelete() {
    this.peopleService.deletePerson(this.person);
    this.router.navigate(['/people']);
  }

   onCancel() {
    this.router.navigate(['/people']);
  } 
}


/**************************************
 *  Original Class
 **************************************/
/*export class PersonDetailComponent implements OnInit {
 // Properties
 person: Person;
 parent: Person;
 child: Person;
 children: Person[] = [];
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
        console.log('ID from route: ', this.id);
        this.person = this.peopleService.getPerson(this.id);
        console.log('Person found: ', this.person);
        if (!this.person) return;

        this.resolveChildren();
        this.resolveNotes();
      });
    }

    resolveChildren() {
      if (this.person.children?.length) {
        this.children = this.person.children
        .map(id => this.peopleService.getPerson(id))
        .filter((p): p is Person => !!p);
      }
    }

    resolveNotes() {
      const notes = this.researchNotesService.getResearchNotes();
      if (Array.isArray(notes)) {
        this.researchNotes = notes.filter( note => note.personId === this.person.id);
      }
    }

    //   // Get all notes and filter for this person
    //   const notes = this.researchNotesService.getResearchNotes();
    //   if (Array.isArray(notes)) {
    //     this.researchNotes = notes.filter(note => note.personId === this.person.id);
    //   } else {
    //     this.researchNotes = [];
    //   }
    // }
  
 
   addChildToParent(parent: Person, child: Person) {
    if (!parent || !child) return;

    if (!parent.children) {
      parent.children = [];
    }

    if (!parent.children.includes(child.id)) {
      parent.children.push(child.id);
      this.peopleService.updatePerson(parent, parent);
      this.resolveChildren(); //Updates the UI
    }
    // if (!parent.children) {
    //   parent.children = [];
    // }
    // parent.children.push(child.id);
  }

  onDelete() {
    this.peopleService.deletePerson(this.person)
    this.router.navigate(['/people']);
  }
}*/
