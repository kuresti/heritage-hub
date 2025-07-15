/**************************
 * Imports
 **************************/
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Document } from '../document.model'
import { DocumentService } from '../document.service'

/**************************
 * Component
 **************************/
@Component({
  selector: 'heritage-hub-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})

/**************************
 * Class
 **************************/
export class DocumentEditComponent implements OnInit{
  // Properties
    originalDocument: Document| null = null;
    document: Document = new Document('', '', '', '', '', '', []);
    editMode: boolean = false;
    id: string;
    @ViewChild('type') typeRef:ElementRef;
    @ViewChild('description') descriptionRef:ElementRef;
    @ViewChild('docFile') docFileRef:ElementRef;
    @ViewChild('dateAdded') dateAddedRef:ElementRef;

  // Methods
  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // Get the id from the URL
      const id = params['id'];

      if (!id) {
        // No ID, creating a new document
        this.editMode = false;
      }

      // Try to get the original document
      this.originalDocument = this.documentService.getDocument(id);

      if (!this.originalDocument) {
        //No document found with that id
        return;
      }

      // Editing Mode
      this.editMode = true;

      // Make a deep copy so original is not modified
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

   onClear() {
    this.typeRef.nativeElement.value = '';
    this.descriptionRef.nativeElement.value = '';
    this.docFileRef.nativeElement.value = '';
    this.dateAddedRef.nativeElement.value = '';
   }
   
   onCancel() {
    this.router.navigate(['/documents']);
   }

    onSubmit(form: NgForm) {
      const value = form.value;
      const newDocument = new Document(value.id, value.type, value.description, value.docFile, value.personId, value.dateAdded, value.this.children);
      if (this.editMode) {
        this.documentService.updateDocument(this.originalDocument, newDocument)
      } else {
        this.documentService.addDocument(newDocument)
      }
      this.router.navigate(['/documents'], {relativeTo: this.route});
    }  
}
