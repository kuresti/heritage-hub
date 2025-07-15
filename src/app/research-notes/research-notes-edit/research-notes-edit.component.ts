/*********************************
 * Imports
 *********************************/
import { Component, ViewChild, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ResearchNote } from '../research-note.model';  
import { ResearchNotesService } from '../research-notes.service'; 

@Component({
  selector: 'heritage-hub-research-notes-edit',
  standalone: false,
  templateUrl: './research-notes-edit.component.html',
  styleUrl: './research-notes-edit.component.css'
})

export class ResearchNotesEditComponent implements OnInit {
 // Properties
  text: string;
  author: string;
  personId: string;
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('noteText') noteTextRef: ElementRef;
  @ViewChild('noteAuthor') noteAuthorRef: ElementRef;
  originalNote: ResearchNote;
  note: ResearchNote = new ResearchNote('', '', '', '', '');
  editMode: boolean = false;
  id: string;

  // Methods
  constructor(private researchNotesService: ResearchNotesService,
              private route: ActivatedRoute,
              private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.personId = params['personId'] || null;
    });

    this.route.params.subscribe((params: Params) => {
      // Get the id from the URL
      const id = params['id'];

      if (!id) {
        // No ID: creating a new research note
        this.editMode = false;
        return;
      }

      // Try to get the original research note
      this.originalNote = this.researchNotesService.getResearchNote(id);

      if (!this.originalNote) {
        // No note found with that id
        return;
      }

      // Editing Mode
      this.editMode = true;

      // Deep copy so original isn't modified
      this.note = JSON.parse(JSON.stringify(this.originalNote));
    });
  }

  onSubmit(form: NgForm ) {
    const value = form.value;
    const newNote = new ResearchNote(value.id, value.subject, value.text, value.personId, value.author);
    if (this.editMode) {
      this.researchNotesService.updateNote(this.originalNote, newNote)
    } else {
      this.researchNotesService.addNote(newNote)
    }
    this.router.navigate(['/research-notes'], {relativeTo: this.route});
  }
  
  onCancel() {
    this.router.navigate(['/research-notes']);
  }
  
  onSendNote() {
    const id = '100';
     const subject = this.subjectInputRef.nativeElement.value;
     const noteText = this.noteTextRef.nativeElement.value;
     const noteAuthor = this.noteAuthorRef.nativeElement.value;

     const newNote = new ResearchNote(id, subject, noteText, this.personId, noteAuthor);
        this.researchNotesService.addNote(newNote);
  }
  

  onSave() {
   
  }

  onClear() {
      this.subjectInputRef.nativeElement.value = '';
      this.noteTextRef.nativeElement.value = '';
      this.noteAuthorRef.nativeElement.value = '';
  }
   
}
