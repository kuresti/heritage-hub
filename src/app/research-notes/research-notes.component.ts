/****************************
 * Imports
 ****************************/
import { Component, OnInit } from '@angular/core';

import { ResearchNotesService } from './research-notes.service';
import { ResearchNote } from './research-note.model';

@Component({
  selector: 'heritage-hub-research-notes',
  standalone: false,
  templateUrl: './research-notes.component.html',
  styleUrl: './research-notes.component.css'
})
export class ResearchNotesComponent implements OnInit {
  // Properties
  selectedNote: ResearchNote;

  // Methods
  constructor(private researchNotesService: ResearchNotesService) {}

  ngOnInit() {
    this.researchNotesService.noteListChangedEvent.subscribe(
      (notes: ResearchNote[]) => {
        this.selectedNote = notes && notes.length > 0 ? notes[0] : null;
      }
    )
  }


}
