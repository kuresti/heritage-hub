/***********************************
 * Imports
 ***********************************/
import { Component, Input } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'heritage-hub-document-item',
  standalone: false,
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
 // Properties
 @Input() document: Document;
}
