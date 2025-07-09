/*********************************
 * Imports
 *********************************/
import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { ResearchNote } from '../research-note.model';  

@Component({
  selector: 'heritage-hub-research-notes-edit',
  standalone: false,
  templateUrl: './research-notes-edit.component.html',
  styleUrl: './research-notes-edit.component.css'
})

export class ResearchNotesEditComponent {
 // Properties
 @Output() addNoteEvent = new EventEmitter<ResearchNote>();
  subject: string;
  text: string;
  personId: string;
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('noteText') noteTextRef: ElementRef;
  @ViewChild('noteAuthor') noteAuthorRef: ElementRef;
  

  // Methods
  onSubmit() {}

  onSendNote() {
    const id = '100';
     const subject = this.subjectInputRef.nativeElement.value;
     const noteText = this.noteTextRef.nativeElement.value;
     const noteAuthor = this.noteAuthorRef.nativeElement.value;

     const newNote = new ResearchNote(id, subject, noteText, this.personId, noteAuthor);
        this.addNoteEvent.emit(newNote)
  }
  

  onSave() {
   
  }

  onClear() {
      this.subjectInputRef.nativeElement.value = '';
      this.noteTextRef.nativeElement.value = '';
      this.noteAuthorRef.nativeElement.value = '';
  }
   
}
