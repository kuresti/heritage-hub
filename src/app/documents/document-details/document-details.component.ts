/***********************************
 * Imports
 ***********************************/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service'

@Component({
  selector: 'heritage-hub-document-details',
  standalone: false,
  templateUrl: './document-details.component.html',
  styleUrl: './document-details.component.css'
})
export class DocumentDetailsComponent implements OnInit {
  // Properties
   document: Document;

  // Methods
  constructor(private route: ActivatedRoute,
              private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id']
        this.document = this.documentService.getDocument(id);
      });
  }
  onDelete() {}
}
