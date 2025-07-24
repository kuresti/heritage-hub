/************************************
 * Imports
 ************************************/
import { Component, Input } from '@angular/core';

import { ResearchNote } from '../research-note.model';




@Component({
  selector: 'heritage-hub-research-notes-item',
  standalone: false,
  templateUrl: './research-notes-item.component.html',
  styleUrl: './research-notes-item.component.css'
})

export class ResearchNotesItemComponent{
  // Properties
   @Input() note: ResearchNote; 
}
