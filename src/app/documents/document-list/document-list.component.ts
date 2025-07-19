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
  private subscription: Subscription;

  // Methods
  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.getDocuments()
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentList: Document[]) => {
        this.documents = documentList;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
