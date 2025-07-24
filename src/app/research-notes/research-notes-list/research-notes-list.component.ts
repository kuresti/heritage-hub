/**********************************
 * Imports
 **********************************/
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';  

import { ResearchNote } from '../research-note.model';
import { ResearchNotesService } from '../research-notes.service';

import { Person } from '../../people/person.model';
import { PeopleService } from '../../people/people.service';

@Component({
  selector: 'heritage-hub-research-notes-list',
  standalone: false,
  templateUrl: './research-notes-list.component.html',
  styleUrl: './research-notes-list.component.css'
})
export class ResearchNotesListComponent implements OnInit, OnDestroy{
  // Properties
   notes: ResearchNote[] = [];
   @Input() person: Person;
   subscription: Subscription;
   term: string = '';

  // Methods
  constructor(private researchNotesService: ResearchNotesService,
              private peopleService: PeopleService
  ) {}

  ngOnInit(): void {
    this.researchNotesService.getResearchNotes();
    console.log('Initial notes', this.notes);
    this.subscription = this.researchNotesService.noteListChangedEvent.subscribe(
      (notes: ResearchNote[]) => {
        this.notes = notes.filter(n => n && typeof n === 'object' && 'id' in n);
        console.log('Notes received in list:', this.notes);
      }
    );
    
  }

  search(value: string) {
    this.term = value
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPersonName(personId: string): string {
    if (!personId) return 'Unknown';
    const person = this.peopleService.getPerson(personId);
    console.log('')
    return person ? `${person.firstName} ${person.lastName}` : 'Unknown';
  }

  onAddResearchNote(note: ResearchNote) {
    this.notes.push(note);
  }
}
