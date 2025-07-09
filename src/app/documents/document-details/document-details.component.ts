/***********************************
 * Imports
 ***********************************/
import { Component, Input } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'heritage-hub-document-details',
  standalone: false,
  templateUrl: './document-details.component.html',
  styleUrl: './document-details.component.css'
})
export class DocumentDetailsComponent {
  // Properties
  @Input() document: Document;

  // Methods
  onDelete() {}
}
