/***************************
 * Imports
 ***************************/
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { ResearchNote } from './research-note.model';
import { MOCKRESEARCHNOTES } from './MOCKRESEARCHNOTES';

/**************************
 * Injected Globally
 **************************/
@Injectable({
  providedIn: 'root'
})

/**************************
 * Class
 **************************/
export class ResearchNotesService implements OnInit{
  // Properties
  notes: ResearchNote[] = [];
  noteChangedEvent = new EventEmitter<ResearchNote[]>();
  noteListChangedEvent = new Subject<ResearchNote[]>();
  maxNoteId: number;

  // Methods
  constructor() {
    this.notes = MOCKRESEARCHNOTES;
    this.maxNoteId = this.getMaxId();
   }

   ngOnInit(): void {
     
   }

   getMaxId(): number {
    let maxId = 0;

    for (let note of this.notes) {
      const currentId = parseInt(note.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
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

   addNote(newNote: ResearchNote) {
     if (!newNote) {
      return;
     }

     this.maxNoteId++;
     newNote.id = this.maxNoteId.toString();

     this.notes.push(newNote);

     const notesListClone = this.notes.slice();
     this.noteChangedEvent.next(notesListClone);
   }

   deleteNote(note: ResearchNote) {
    if (!note) {
      return;
    }
    const pos = this.notes.indexOf(note);
    if (pos < 0){
      return;
    }
    this.notes.slice(pos, 1);
    const notesListClone = this.notes.slice();
    this.noteChangedEvent.next(notesListClone);
 }

 updateNote(originalNote: ResearchNote, newNote: ResearchNote) {
  if (!originalNote || !newNote) {
    return;
  }

  const pos = this.notes.indexOf(originalNote);
  if (pos < 0) {
    return;
  }

  newNote.id = originalNote.id;
  this.notes[pos] = newNote;

  const notesListClone = this.notes.slice();
  this.noteListChangedEvent.next(notesListClone);
 }
}
