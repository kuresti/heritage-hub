/***************************
 * Imports
 ***************************/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ResearchNote } from './research-note.model';

/**************************
 * Injected Globally
 **************************/
@Injectable({
  providedIn: 'root'
})

/**************************
 * Class
 **************************/
export class ResearchNotesService {
  // Properties
  notes: ResearchNote[] = [];
  noteListChangedEvent = new Subject<ResearchNote[]>();
  maxNoteId: number;
  researchNote: ResearchNote;

  // Methods
  constructor(private http: HttpClient) {
    
   }
  
   private sortAndSend() {
    // Sorts notes by subject
    this.notes.sort((a, b) => a.subject.localeCompare(b.subject));

    // Emits a copy of the array to subscribers
    this.noteListChangedEvent.next(this.notes.slice());
   }

    getResearchNotes() {
    this.http.get<{message: string; researchNotes:ResearchNote[] }>('http://localhost:3000/research-notes')
      .subscribe({
        next: (response)  => {
          this.notes = [];
          this.notes = response.researchNotes;
          this.maxNoteId = this.getMaxId();
          this.sortAndSend();
        }, error: (err) => console.error('Error fetching research-notes:', err)
      });
   }

   getMaxId(): number {
    let maxId = 0;
    if (!Array.isArray(this.notes)) {
      return 0;
    }

    for (let note of this.notes) {
      const currentId = parseInt(note.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
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

     // Make sure the id of the new message is empty
     newNote.id = '';

     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     console.log('Sending newNote:', newNote);
     // Add to database
     this.http.post<{ message: string, researchNote: ResearchNote }>('http://localhost:3000/research-notes', newNote, { headers })
       .subscribe(
          (responseData) => {
            //Add the new note to the database
          this.notes.push(responseData.researchNote);
          console.log("Note saved response:", responseData);
          this.sortAndSend();
          });
   }     

   deleteNote(note: ResearchNote) {
    if (!note) {
      return;
    }

    const pos = this.notes.findIndex(n => n.id === note.id);
    if (pos < 0){
      return;
    }

    // Remove from database
    this.http.delete(`http://localhost:3000/research-notes/${note.id}`)
      .subscribe(
        (response: Response) => {
          this.notes.splice(pos, 1);
          this.sortAndSend();
        }
      )
    
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
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  // Update the note in the database
  this.http.put(`http://localhost:3000/research-notes/${originalNote.id}`, newNote, { headers })
    .subscribe(
      (response: Response) => {
        this.notes[pos] = newNote;
        this.sortAndSend();
      }
    );  
 }
}
