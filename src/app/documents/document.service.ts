/**************************
 * Imports
 **************************/
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Document } from './document.model';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  // Properties
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  private maxDocumentId: number;

  // Methods
  constructor(private http: HttpClient) { 
    
    this.maxDocumentId = this.getMaxId();
  }

  sortAndSend() {
    // Sorts documents by name
    this.documents.sort((a, b) => a.dateAdded.localeCompare(b.dateAdded));
    // Emits a copy of the array to subscribers
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocuments() {
    this.http.get<{ message: string; documents: Document[] }>('http://localhost:3000/documents')
      .subscribe({
        next: (response) => {
          this.documents = response.documents;
          this.maxDocumentId = this.getMaxId();
          this.sortAndSend();
        },
        error: (error) => {
          console.error('Error fetching documents:', error);
        }
      });
  }

  getDocument(id: string): Document | null {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  } 

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    // Remove the document from the database
    this.http.delete(`http://localhost:3000/documents/${document.id}`)
      .subscribe({
        next: (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();    
     }
    });
  }
  
  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    // Make sure the id is not set
    newDocument.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    // Add the new document to the database
    this.http.post<{name: string, document: Document }>('http://localhost:3000/documents', newDocument, { headers })
      .subscribe({
        next: (responseData) => {
          // set the id of the new document
          newDocument.id = responseData.document.id;
          // Add the new document to the documents array
          this.documents.push(newDocument);
          this.sortAndSend();
        }
  });
}   

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

   const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }
    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;

    // Update the document in the database
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    this.http.put(`http://localhost:3000/documents/${originalDocument.id}`, newDocument, {headers: headers})
      .subscribe(
        (response: Response) => {   {
               this.documents[pos] = newDocument;
               this.sortAndSend();
             }
          });
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
