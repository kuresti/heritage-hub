/*********************************
 * Imports
 *********************************/
import { Component, OnInit } from '@angular/core';
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
  //personId: string;
  //originalNote?: ResearchNote;
  //note: ResearchNote = new ResearchNote({}); //Added change 7/22/25 8:43pm
  originalNote: ResearchNote;
  note: ResearchNote = new ResearchNote('', '', '', '', ''); // Added to fix property error
  
  editMode: boolean = false;
  id: string;

  // Methods
  constructor(private researchNotesService: ResearchNotesService,
              private route: ActivatedRoute,
              private router: Router,
  ) {}

  //Refactored Again 7/23/25 12:33 to simplify and separate from people component
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }

        this.originalNote = this.researchNotesService.getResearchNote(id);
        if(!this.originalNote) {
          return;
        }

        this.editMode = true;
        this.note = JSON.parse(JSON.stringify(this.originalNote));
      }
    );
  }

 /* //Refactored 7/23/2025 8:41am
  ngOnInit() {
    // Get personId from the URL (query param)
    this.route.queryParams.subscribe(params => {
      this.personId = params['personId'] ?? null;
      console.log('Captured personId from query params:', this.personId);
    });

    //Initialize form
    this.form = this.fb.group({
      subject: ['', Validators.required],
      text: ['', Validators.required],
      author: ['', Validators.required]
    });

    //Determine edit mode (route params)
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) return;

      this.originalNote = this.researchNotesService.getResearchNote(id);
      if (!this.originalNote) return;

      this.editMode = true;
      this.id = id;
      this.note = { ...this.originalNote };

      this.form.patchValue({
        subject: this.note.subject,
        text: this.note.text,
        author: this.note.author
      });
    });
  }*/
 /* ngOnInit(): void {
    // Initialize the form
    this.form = this.fb.group({
      subject: ['', Validators.required],
      text: ['', Validators.required],
      author: ['', Validators.required]
    });

    // Get the personId from the query parameters
    this.route.queryParams.subscribe(params => {
      this.personId = params['personId'] || null;
      console.log('personId fom query params:', this.personId);
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
  }*/

    //Refactored 7/23/2025 1:05pm
    onSubmit(form: NgForm) {
      const value = form.value;
      const newNote = new ResearchNote(value.id, value.subject, value.text, value.personName, value.author);
      if (this.editMode) {
        this.researchNotesService.updateNote(this.originalNote, newNote)
      } else {
        this.researchNotesService.addNote(newNote)
      }
      this.router.navigate(['../'], {relativeTo: this.route});      
    }

  /*onSubmit() {
    if (this.form.invalid) return;
    
    const formValues = this.form.value;
    const newNote = new ResearchNote({
      id: this.editMode ? this.id : '',
      subject: formValues.subject,
      text: formValues.text,
      personId: this.personId,
      author: formValues.author
    });
      console.log('this.personId')
      console.log('newNote Object:', newNote);
    if (this.editMode) {
      this.researchNotesService.updateNote(this.originalNote, newNote);
    } else {
      this.researchNotesService.addNote(newNote);
    }
    this.router.navigate(['/research-notes']);
    }*/
    
  onCancel() {
    this.router.navigate(['/research-notes']);
  } 

  // onClear() {
  //     this.form.reset();
  // }
   
}
