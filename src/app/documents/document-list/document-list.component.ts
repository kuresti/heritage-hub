/********************************
 * Imports
 ********************************/
import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { Document } from '../document.model'
import { DocumentService } from '../document.service';


@Component({
  selector: 'heritage-hub-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  // Properties
  documents: Document[] = []

  // Methods
  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments()
  }

  onSelectedDocument(document: Document){
    this.documentService.selectedDocumentEvent.emit(document);
  }
}
