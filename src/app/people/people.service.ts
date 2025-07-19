/***************************
 * Imports
 ***************************/
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Person } from './person.model';


/***************************
 * Decorators
 ***************************/
@Injectable({
  providedIn: 'root'
})

/****************************
 * Class
 ****************************/
export class PeopleService {
  // Properties
  private people: Person[] = [];;
  peopleListChangedEvent = new Subject<Person[]>();
  private maxPersonId: number;

 // Methods
  constructor(private http: HttpClient) {
    // Initializes the people array with an empty array
      this.maxPersonId = this.getMaxId();
    
  }

   private sortAndSend() {
    // Sorts people by name
    this.people.sort((a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName));
    // Emits a copy of the array to subscribers
    this.peopleListChangedEvent.next(this.people.slice());
   }
    // Retrieves the people array from the server
    // and updates the maxPersonId
    getPeople() {
      this.http.get<{ message: string; people: Person[] }>('http://localhost:3000/people')
        .subscribe({
          next: (response) => {
            this.people = response.people;
            this.maxPersonId = this.getMaxId();
            this.sortAndSend();
          }
        });
   }

   getPerson(id: string): Person | null {
    return this.people.find(p => p.id === id) || null;
   } 

   deletePerson(person: Person) {
   // Checks if person exists
    if(!person) {
      return;
    }
    // Finds the index of the person in the array
    // If not found, returns
    const pos = this.people.findIndex(p => p.id === person.id);
    if (pos < 0) {
      return;
    }
    // Remove the person from the database
    this.http.delete(`http://localhost:3000/people/${person.id}`)
      .subscribe(
        () => {
          this.people.splice(pos, 1);
          // Emit the update people array
          this.sortAndSend();
        }
      );
  }

   getMaxId(): number {
    let maxId = 0;

    for (let person of this.people) {
      const currentId = parseInt(person.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
   }

    addPerson(newPerson: Person){ 
      // Checks if newPerson exists
    if (!newPerson) {
      return;
    }
    // Make sure the is id not set and backend will set it
    newPerson.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Sends a POST request to the server to add the new person
    this.http.post<{ message: string, person: Person }>('http://localhost:3000/people',
      newPerson,
      { headers: headers })
      .subscribe(
        (response) => {
          // add new person to people array
          this.people.push(response.person);
          // Emit the update people array
          this.sortAndSend();
        }
      );
    }
    
   updatePerson(originalPerson: Person, newPerson: Person) {
    if (!originalPerson || !newPerson) {
      return;
    }

    const pos = this.people.findIndex(p => p.id === originalPerson.id);
      if (pos < 0) {
      return;
    }
    // Set the id of the new person to the id of the original person
    newPerson.id = originalPerson.id;

    // Sends a PUT request to the server to update the person
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Updates the person on the server
    this.http.put(`http://localhost:3000/people/${originalPerson.id}`,
      newPerson, { headers: headers })
      .subscribe({
         next: () => {
          // Update the person in the people array
          // Find the index of the original person
          this.people[pos] = newPerson;
          // Emit the updated people array
          this.sortAndSend();
        },
        error: (error) => {
          console.error('Error updating person:', error);
        }
    });
   }

  

  }
   


  

 

 

