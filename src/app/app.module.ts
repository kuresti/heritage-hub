import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { PeopleComponent } from './people/people.component';
import { PersonListComponent } from './people/person-list/person-list.component';
import { PersonDetailComponent } from './people/person-detail/person-detail.component';
import { PersonEditComponent } from './people/person-edit/person-edit.component';
import { PersonItemComponent } from './people/person-item/person-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { ResearchNotesListComponent } from './research-notes/research-notes-list/research-notes-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailsComponent } from './documents/document-details/document-details.component';
import { ResearchNotesEditComponent } from './research-notes/research-notes-edit/research-notes-edit.component';
import { ResearchNotesItemComponent } from './research-notes/research-notes-item/research-notes-item.component';
import { ResearchNotesDetailsComponent } from './research-notes/research-notes-details/research-notes-details.component';
import { ResearchNotesComponent } from './research-notes/research-notes.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PersonFilterPipePipe } from './people/person-filter.pipe.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PeopleComponent,
    PersonListComponent,
    PersonDetailComponent,
    PersonEditComponent,
    PersonItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentEditComponent,
    ResearchNotesListComponent,
    DocumentItemComponent,
    DocumentDetailsComponent,
    ResearchNotesEditComponent,
    ResearchNotesItemComponent,
    ResearchNotesDetailsComponent,
    ResearchNotesComponent,
    PersonFilterPipePipe,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
