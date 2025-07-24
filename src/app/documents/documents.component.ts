/********************************
 * Imports
 ********************************/
import { Component, OnInit } from '@angular/core';

import { Document } from '../documents/document.model';
import { DocumentService } from  './document.service';

@Component({
  selector: 'heritage-hub-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit{
  // Properties  
  selectedDocument: Document;
  // Methods
  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.selectedDocument = documents && documents.length > 0 ? documents[0] : null;
      }
    );
  }

}
