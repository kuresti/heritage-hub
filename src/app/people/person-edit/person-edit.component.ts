/**************************************
 * Imports
 **************************************/
import { Component, OnInit } from '@angular/core';
import { NgForm }from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Person } from '../person.model';
import { PeopleService } from '../people.service'
import { ResearchNote } from '../../research-notes/research-note.model'
import { ResearchNotesService } from '../../research-notes/research-notes.service'

/***************************************
 * Component
 ***************************************/
@Component({
  selector: 'heritage-hub-person-edit',
  standalone: false,
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.css'
})
/***************************************
 * Class
 ***************************************/
export class PersonEditComponent implements OnInit{
  // Properties  
  // person: Person = new Person({
  //   id: '',
  //   firstName: '',
  //   middleName: '',
  //   lastName: '',
  //   birthDate: '',
  //   birthPlace: '',
  //   christeningDate: '',
  //   marriageDate: '',
  //   deathDate: '',
  //   burialPlace: '',
  //   notes: '',
  //   children: []
  // }); // Edited version of Person

  person: Person = new Person({}); //Added change 7/22/25 3:00pm
  originalPerson: Person; // Original, unedited Person
  editMode: boolean = false; // Indicates existing Person to be edited, or a new Person being created
  id: string;
  children: Person[] = [];
  people: Person[] =[];
  invalidChild: boolean = false;
  childDropListId = 'personEditList';  // The childDropListId is used to identify the drop list for dragging and dropping children into the children array.
  childrenDropListId = 'childrenPersonList'
  child: Person;
  notes: ResearchNote[] = [];
  
   constructor(private peopleService: PeopleService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id']; // get the id from the URL

      // Determines if this is a new person
      if (!id) {
        this.editMode = false;
        return;
      }
     
      this.peopleService.getPeople();

        this.originalPerson = this.peopleService.getPerson(id);
        if (!this.originalPerson) return;

        this.editMode = true

        //this.person = JSON.parse(JSON.stringify(this.originalPerson)); -Commented out 7/23/25 11:50pm
        //Added the following 7/23/25 11:51am
        this.person = new Person(this.originalPerson);

        //Refactored 7/22/25 3:02pm
        if (Array.isArray(this.person.children) && this.person.children.length > 0) {
          this.children = this.person.getPopulatedChildren();
        }

        // //Refactored 7/22/25 1:55pm
        // if (Array.isArray(this.person.children)) {
        //   this.children = this.person.children.map(child =>
        //     typeof child === 'object' && child !== null ? child : this.people.find(p => p.id === child)
        //   ).filter((c): c is Person => !!c);
        // }

        
        //Replaced 7/22/2025
        // if (Array.isArray(this.person.children) && this.person.children.length > 0) {
        //   this.children = this.person.children
        //   .map(childId => this.people.find(p => p.id === childId))
        //   .filter((child): child is Person => !!child);
        // }
      });
  
}

   onSubmit(form: NgForm) {
    const value = form.value;
    const newPerson = new Person({
      id: value.id,
      firstName: value.firstName,
      middleName: value.middleName,
      lastName: value.lastName,
      birthDate: value.birthDate,
      birthPlace: value.birthPlace,
      christeningDate: value.christeningDate,
      marriageDate: value.marriageDate,
      deathDate: value.deathDate,
      burialPlace: value.burialPlace,
      notes: value.notes,
      children: this.children.map(child => child._id)
    });

    if (this.editMode) {
      console.log('Saving person: ', JSON.stringify(newPerson));
      this.peopleService.updatePerson(this.originalPerson, newPerson)
    } else {
      this.peopleService.addPerson(newPerson)
    }
    this.router.navigate(['/people'], {relativeTo: this.route});
  }


  onCancel() {
    this.router.navigate(['/people']);
  }

  onRemoveItem(index: number) {
    this.children.splice(index, 1);
  }
  

 
  // onClear() {
  //   this.firstNameRef.nativeElement.value = '';
  //   this.middleNameRef.nativeElement.value = '';
  //   this.lastNameRef.nativeElement.value = '';
  //   this.birthDateRef.nativeElement.value = '';
  //   this.birthPlaceRef.nativeElement.value = '';
  //   this.christeningDateRef.nativeElement.value = '';
  //   this.marriageDateRef.nativeElement.value = '';
  //   this.deathDateRef.nativeElement.value = '';
  //   this.burialPlaceRef.nativeElement.value = '';
  // }

  onDropChild(event: CdkDragDrop<Person[]>) {
    const draggedChild: Person = event.item.data;
    // Check if the dragged child is invalid
    if (this.isInvalidChild(draggedChild)) {
      this.invalidChild = true;
      setTimeout(() => this.invalidChild = false, 20000); // Reset invalidChild after 2 seconds
      return;
    }

    this.children.push(draggedChild);
  }

  isInvalidChild(child: Person) {
    if (!child) return true;
    if (child.id === this.child?.id) return true;
    return this.children.some((c) => c.id === child.id);

  //   // If the child is the same as the person being edited
  //   if (this.person && child.id === this.person.id) return true;

  //   //If the child is already in the children list
  //   if ( this.children.some(c => c.id === child.id)) {
  //     return true;
  //   }
  //  // Otherwise, it's valid
  //  return false;
  }

  loadNotes() {
    // if (!this.person?.id) return;

    // this.researchNotesService.getNotesByPersonId(this.person.id).subscribe(notes => {
    //   this.notes = notes;
    // }); // 7/23/2025 -Decided not to show notes inside of person-edit (would like to fix this to work later)
  }
  

}
