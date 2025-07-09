/***********************************
 * Imports
 ***********************************/
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'heritage-hub-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Properties
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  // Methods
  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }


}
