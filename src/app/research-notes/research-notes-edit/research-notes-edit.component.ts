/*********************************
 * Imports
 *********************************/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  form: FormGroup;
  personId: string;
  originalNote?: ResearchNote;
  note: ResearchNote = new ResearchNote('', '', '', '', '');
  editMode: boolean = false;
  id: string;

  // Methods
  constructor(private fb: FormBuilder,
              private researchNotesService: ResearchNotesService,
              private route: ActivatedRoute,
              private router: Router,
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.form = this.fb.group({
      subject: ['', Validators.required],
      text: ['', Validators.required],
      author: ['', Validators.required]
    });

    // Get the personId from the query parameters
    this.route.queryParams.subscribe(params => {
      this.personId = params['personId'] || null;
    });
    // Determine if we are in edit mode or not
    this.route.params.subscribe((params: Params) => {
      // Get the id from the URL
      const id = params['id'];
      if (!id) return;
     

      // Try to get the original research note
      this.originalNote = this.researchNotesService.getResearchNote(id);

      if (!this.originalNote) return;

      // Editing Mode
      this.editMode = true;
      this.id = id;
      this.note = { ...this.originalNote }; // Spread operator to create a shallow copy

      // Patch form with original note values
      this.form.patchValue({
        subject: this.note.subject,
        text: this.note.text,
        personId: this.note.personId,
        author: this.note.author
      });      
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    
    const formValues = this.form.value;
    const newNote = new ResearchNote(
      this.editMode ? this.id : '',
      formValues.subject,
      formValues.text,
      this.personId,
      formValues.author
    );

    if (this.editMode) {
      this.researchNotesService.updateNote(this.originalNote, newNote);
    } else {
      this.researchNotesService.addNote(newNote);
    }
    this.router.navigate(['/research-notes']);
    }
    
  onCancel() {
    this.router.navigate(['/research-notes']);
  } 

  onClear() {
      this.form.reset();
  }
   
}
