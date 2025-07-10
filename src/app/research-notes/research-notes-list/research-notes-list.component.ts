/**********************************
 * Imports
 **********************************/
import { Component, OnInit } from '@angular/core';

import { ResearchNote } from '../research-note.model';
import { ResearchNotesService } from '../research-notes.service';

@Component({
  selector: 'heritage-hub-research-notes-list',
  standalone: false,
  templateUrl: './research-notes-list.component.html',
  styleUrl: './research-notes-list.component.css'
})
export class ResearchNotesListComponent implements OnInit{
  // Properties
   notes: ResearchNote[] = [];

  // Methods
  constructor(private researchNotesService: ResearchNotesService) {}

  ngOnInit(): void {
    this.notes = this.researchNotesService.getResearchNotes();
    this.researchNotesService.noteChangedEvent.subscribe(
      (notes: ResearchNote[]) => {
        this.notes = notes
      }
    )
  }

  onAddResearchNote(note: ResearchNote) {
    this.notes.push(note);
  }
}
