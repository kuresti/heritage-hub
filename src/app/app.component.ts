/**********************************
 * Imports
 **********************************/
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  //Properties
  title = 'heritage-hub';
  selectedFeature: string = 'people';

  // Methods
  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
