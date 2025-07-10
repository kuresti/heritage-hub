/************************
 * Imports
 ************************/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { ResearchNotesListComponent } from './research-notes/research-notes-list/research-notes-list.component';
import { DocumentsComponent } from './documents/documents.component';

/***************************
 * Routes Definition
 ***************************/
const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people', component: PeopleComponent },
  { path: 'research-notes', component: ResearchNotesListComponent },
  { path: 'documents', component: DocumentsComponent }  
];

/***************************
 * Module
 ***************************/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
