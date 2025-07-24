/***********************************
 * Imports
 ***********************************/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
   id: string;

  // Methods
  constructor(private route: ActivatedRoute,
              private documentService: DocumentService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id= params['id']
        this.document = this.documentService.getDocument(this.id);
      });
  }
  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
