/**************************************
 * Imports
 **************************************/
import { Component, OnInit, ViewChild, ElementRef, viewChild } from '@angular/core';
import { NgForm }from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Person } from '../person.model';
import { PeopleService } from '../people.service'

/***************************************
 * Component
 ***************************************/
@Component({
  selector: 'heritage-hub-person-edit',
  standalone: false,
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.css'
})
export class PersonEditComponent implements OnInit{
  // Properties
  originalPerson: Person; // Original, unedited Person
  person: Person = new Person('', '', '', '', '', '', '', '', '', '', '', []); // Edited version of Person
  child: Person;
  editMode: boolean = false; // Indicates existing Person to be edited, or a new Person being created
  id: string;
  children: Person[] = [];
  people: Person[] =[];
  invalidChild: boolean = false;
  childDropListId = 'peronEditList';  // The childDropListId is used to identify the drop list for dragging and dropping children into the children array.
  childrenDropListId = 'childrenPersonList'
  @ViewChild('firstName') firstNameRef:ElementRef;
  @ViewChild('middleName') middleNameRef:ElementRef;
  @ViewChild('lastName') lastNameRef:ElementRef;
  @ViewChild('birthDate') birthDateRef:ElementRef;
  @ViewChild('birthPlace') birthPlaceRef:ElementRef;
  @ViewChild('christeningDate') christeningDateRef:ElementRef;
  @ViewChild('marriageDate') marriageDateRef:ElementRef;
  @ViewChild('deathDate') deathDateRef:ElementRef;
  @ViewChild('burialPlace') burialPlaceRef:ElementRef;
  


  // Methods
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

      // gets the original person
      this.originalPerson = this.peopleService.getPerson(id);

      if (!this.originalPerson) {
        // no person found with that id
        return;
      }

      // Editing mode
      this.editMode = true;

      // Makes a copy so the original isn't modified
      this.person = JSON.parse(JSON.stringify(this.originalPerson));

      if(this.person.children) {
        this.children = this.person.children.slice();
      }
      this.peopleService.getPeople();
    });
  }

  onCancel() {
    this.router.navigate(['/people']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newPerson = new Person(value.id, 
                                 value.firstName, 
                                 value.middleName, 
                                 value.lastName, 
                                 value.birthDate, 
                                 value.birthPlace,
                                 value.christeningDate, 
                                 value.marriageDate, 
                                 value.deathDate, 
                                 value.burialPlace, 
                                 value.notes,
                                 this.children)
    if (this.editMode) {
      this.peopleService.updatePerson(this.originalPerson, newPerson)
    } else {
      this.peopleService.addPerson(newPerson)
    }
    this.router.navigate(['/people'], {relativeTo: this.route});
  }

  onClear() {
    this.firstNameRef.nativeElement.value = '';
    this.middleNameRef.nativeElement.value = '';
    this.lastNameRef.nativeElement.value = '';
    this.birthDateRef.nativeElement.value = '';
    this.birthPlaceRef.nativeElement.value = '';
    this.christeningDateRef.nativeElement.value = '';
    this.marriageDateRef.nativeElement.value = '';
    this.deathDateRef.nativeElement.value = '';
    this.burialPlaceRef.nativeElement.value = '';
  }

  onDropChild(event: CdkDragDrop<Person[]>) {
    const draggedChild: Person = event.item.data;

    if (this.isInvalidChild(draggedChild)) {
      this.invalidChild = true;
      setTimeout(() => this.invalidChild = false, 2000);
      return;
    }
    this.children.push(draggedChild);
  }

  isInvalidChild(child: Person) {
    if (!child) return true;

    // If the child is the same as the person being edited
    if (this.person && child.id === this.person.id) return true;

    //If the child is already in the children list
    if ( this.children.some(c => c.id === child.id)) {
      return true;
    }
   // Otherwise, it's valid
   return false;
  }

  onRemoveItem(index: number) {
    this.children.splice(index, 1);
  }
  

}
