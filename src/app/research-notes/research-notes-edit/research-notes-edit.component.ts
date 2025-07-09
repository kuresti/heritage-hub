/*********************************
 * Imports
 *********************************/
import { Component } from '@angular/core';

@Component({
  selector: 'heritage-hub-research-notes-edit',
  standalone: false,
  templateUrl: './research-notes-edit.component.html',
  styleUrl: './research-notes-edit.component.css'
})

export class ResearchNotesEditComponent {
 // Properties
  subject: string;
  text: string;

  // Methods
  onSubmit() {}

  onClear() {}
}
