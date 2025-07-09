/************************************
 * Imports
 ************************************/
import { Component, Input } from '@angular/core';

@Component({
  selector: 'heritage-hub-research-notes-item',
  standalone: false,
  templateUrl: './research-notes-item.component.html',
  styleUrl: './research-notes-item.component.css'
})

export class ResearchNotesItemComponent {
  // Properties
   @Input() researchNote: { subject: string; text: string };

}
