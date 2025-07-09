/********************************
 * Imports
 ********************************/
import { Component, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model'

@Component({
  selector: 'heritage-hub-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  // Properties
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document( '1', 
                  'Birth Certificate',
                  'Official birth certificate of John Doe', 
                  'assets/dummy.pdf', 
                  '1',
                  '7/9/2025',
                   [] 
      ),
    new Document( '2',
                  'Marriage Certificate',
                  'Marriage cerficate of John and Jane Doe',
                  'assets/dummy.pdf',
                  '2',
                  '7/9/2025',
                  []
    )
  ]

  // Methods
  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
}
