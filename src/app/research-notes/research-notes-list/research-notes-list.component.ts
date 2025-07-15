/**********************************
 * Imports
 **********************************/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';  

import { ResearchNote } from '../research-note.model';
import { ResearchNotesService } from '../research-notes.service';

@Component({
  selector: 'heritage-hub-research-notes-list',
  standalone: false,
  templateUrl: './research-notes-list.component.html',
  styleUrl: './research-notes-list.component.css'
})
export class ResearchNotesListComponent implements OnInit, OnDestroy{
  // Properties
   notes: ResearchNote[] = [];
   subscription: Subscription;

  // Methods
  constructor(private researchNotesService: ResearchNotesService) {}

  ngOnInit(): void {
    this.notes = this.researchNotesService.getResearchNotes();
    this.subscription = this.researchNotesService.noteChangedEvent.subscribe(
      (notes: ResearchNote[]) => {
        this.notes = notes
      }
    );
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddResearchNote(note: ResearchNote) {
    this.notes.push(note);
  }
}
