/***************************
 * Imports
 ***************************/
import { Injectable, OnInit, EventEmitter } from '@angular/core';

import { ResearchNote } from './research-note.model';
import { MOCKRESEARCHNOTES } from './MOCKRESEARCHNOTES';

@Injectable({
  providedIn: 'root'
})
export class ResearchNotesService implements OnInit{
  // Properties
  notes: ResearchNote[] = [];
  noteChangedEvent = new EventEmitter<ResearchNote[]>();

  // Methods
  constructor() {
    this.notes = MOCKRESEARCHNOTES;
   }

   ngOnInit(): void {
     
   }

   getResearchNotes() {
    return this.notes.slice();
   }

   getResearchNote(id: string) {
     for (let note of this.notes) {
      if (note.id === id) {
        return note;
      }
    }
    return null;
   }

   addNote(note: ResearchNote) {
     this.notes.push(note)
     this.noteChangedEvent.emit(this.notes.slice());
   }
}
