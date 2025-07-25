/************************
 * Imports
 ************************/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { ResearchNotesListComponent } from './research-notes/research-notes-list/research-notes-list.component';
import { DocumentsComponent } from './documents/documents.component';
import { PersonEditComponent } from './people/person-edit/person-edit.component';
import { PersonDetailComponent } from './people/person-detail/person-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailsComponent } from './documents/document-details/document-details.component';
import { ResearchNotesComponent } from './research-notes/research-notes.component';
import { ResearchNotesEditComponent } from './research-notes/research-notes-edit/research-notes-edit.component';
import { ResearchNotesDetailsComponent } from './research-notes/research-notes-details/research-notes-details.component';

/***************************
 * Routes Definition
 ***************************/
const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people', component: PeopleComponent, children: [
    { path: 'new', component: PersonEditComponent },
    { path: ':id', component: PersonDetailComponent },
    { path: ':id/edit', component: PersonEditComponent }
  ] },
  { path: 'research-notes', component: ResearchNotesComponent, children: [
    { path: 'new', component: ResearchNotesEditComponent },
    { path: ':id', component: ResearchNotesDetailsComponent },
    { path: ':id/edit', component: ResearchNotesEditComponent }
  ] },
  { path: 'documents', component: DocumentsComponent, children: [
    { path: 'new', component: DocumentEditComponent },
    { path: ':id', component: DocumentDetailsComponent }, 
    { path: ':id/edit', component: DocumentEditComponent }
  ] }  
];

/***************************
 * Module
 ***************************/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
