/********************************
 * Imports
 ********************************/
import { Component, Input } from '@angular/core';

import { Document } from '../documents/document.model';

@Component({
  selector: 'heritage-hub-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  // Properties
  @Input() document: Document;
  selectedDocument: Document;

}
