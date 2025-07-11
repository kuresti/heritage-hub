/********************************
 * Imports
 ********************************/
import { Component } from '@angular/core';

import { Document } from '../documents/document.model';
import { DocumentService } from  './document.service';

@Component({
  selector: 'heritage-hub-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  // Properties  

  // Methods
  constructor(private documentService: DocumentService) {}

  

}
