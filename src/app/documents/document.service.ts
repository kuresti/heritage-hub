/**************************
 * Imports
 **************************/
import { Injectable, Output, EventEmitter } from '@angular/core';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  // Properties
  documents: Document[] = [];
   @Output() selectedDocumentEvent = new EventEmitter<Document>();

  // Methods
  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice()
  }

  getDocument(id: string) {
     for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }
}
