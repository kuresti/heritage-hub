/**********************************
 * Imports
 **********************************/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from './person.model';

/**********************************
 * Decorators
 **********************************/
@Injectable({
  providedIn: 'root'
})

/**********************************
 * Class
 **********************************/
export class FamilyRelationService {
  // Properties
  private  parentSource = new BehaviorSubject<Person | null>(null);
  private childSource = new BehaviorSubject<Person | null>(null);

  parent$ = this.parentSource.asObservable();
  child$ = this.childSource.asObservable();


// Methods
  setParent(parent: Person) {
    this.parentSource.next(parent);
  }
  
  setChild(child: Person) {
    this.childSource.next(child);
  }

  clear() {
    this.parentSource.next(null);
    this.childSource.next(null);
  }

  constructor() { }
}
