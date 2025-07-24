/********************************
 * Imports
 ********************************/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Document } from '../document.model'
import { DocumentService } from '../document.service';


@Component({
  selector: 'heritage-hub-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {
  // Properties
  documents: Document[] = []
  subscription: Subscription;

  // Methods
  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.getDocuments()
    console.log('Initial documents', this.documents);
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentList: Document[]) => {
        this.documents = documentList.filter(d => d && typeof d === 'object' && 'id' in d);
        console.log('Documents received in list:', this.documents);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddDocument(document: Document) {
    this.documents.push(document);
  }

}
