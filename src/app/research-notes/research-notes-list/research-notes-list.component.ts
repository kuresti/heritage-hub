/**********************************
 * Imports
 **********************************/
import { Component } from '@angular/core';

import { ResearchNote } from '../research-note.model';

@Component({
  selector: 'heritage-hub-research-notes-list',
  standalone: false,
  templateUrl: './research-notes-list.component.html',
  styleUrl: './research-notes-list.component.css'
})
export class ResearchNotesListComponent {
  // Properties
   notes: ResearchNote[] = [
    new ResearchNote( '1', 'Diary', 'Amy kept a detailed diary about the family.', '1', 'Martin Uresti'),
    new ResearchNote( '2', 'Military Service', "Find out about John's military service.", '2', 'Carol Uresti'),
    new ResearchNote( '3','Pioneer Trek', "Find out which company great grandma Clayton came with.",  '3', 'Kim Uresti')
   ];

  // Methods
  onAddResearchNote(note: ResearchNote) {
    this.notes.push(note);
  }
}
