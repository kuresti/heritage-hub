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
//Refactored because each time I would restart the app it would crash 7/23/25 3:08pm
export class PeopleService {
  //Properties
  private people: Person[] = [];
  private maxPersonId = 0;
  peopleListChangedEvent = new Subject<Person[]>();

  //Methods

  constructor(private http: HttpClient) {}
  // Fetch people from server and emit sorted list
  getPeople() {
    this.http.get<{ message: string; people: Person[] }>('http://localhost:3000/people')
      .subscribe({
        next: (response) => {
          console.log('API response received: ', response)
          this.people = response.people.map(p => new Person(p));
          console.log('People array after mapping:', this.people);
          //this.maxPersonId = this.getMaxId();
          this.sortAndSend();
        },
        error: (err) => {
          console.error('Error fetching people:', err);
          this.people = [];
          this.sortAndSend();
        }
      });
  }

  // Return a copy of all people
  getPeopleList(): Person[] {
    return [ ...this.people];
  }

  //Return a specific person by ID
  getPerson(id: string): Person | null {
    const found = this.people.find(p => p.id === id);
    return found ? new Person(found) : null;
  }

  //Add a new person by POST and update local store
  addPerson(newPerson: Person) {
    if (!newPerson) return;

    newPerson.id = ''; //Let backend assign id
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json' });

    this.http.post<{ message: String, person: Person}>('http://localhost:3000/people', newPerson, {headers})
      .subscribe({
        next: (res) => {
          this.people.push(new Person(res.person));
          this.sortAndSend();
        },
        error: (err) => console.error('Error posting new person:', err)
      });
  }

  //Update existing person by PUT
  updatePerson(originalPerson: Person, updatedPerson: Person) {
    if (!originalPerson || !updatedPerson) return;

    updatedPerson.id = originalPerson.id;
    const index = this.people.findIndex(p => p.id === originalPerson.id);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(`http://localhost:3000/people/${originalPerson.id}`, updatedPerson, { headers })
      .subscribe({
        next: () => {
          this.people[index] = new Person(updatedPerson);
          this.sortAndSend();
        },
      });
  }

  //Delete a person by DELETE
  deletePerson(person: Person) {
    if (!person) return;

    const index = this.people.findIndex(p => p.id === person.id);
    if (index < 0) return;

    this.http.delete(`http://localhost:3000/people/${person.id}`)
      .subscribe({
        next: () => {
          this.people.splice(index, 1);
          this.sortAndSend();
        },
        error: (err) => console.error("Delete error", err)
      });
  }

  //Emit sorted people list to all subscribers
  private sortAndSend() {
    console.log('Sorting people and emitting update');
    this.people.sort((a, b) =>
    (a.lastName || '').localeCompare(b.lastName || '') ||
    (a.firstName || '').localeCompare(b.firstName || '')
  );
  this.peopleListChangedEvent.next([...this.people]);
  }

  //Find the highest numeric ID
  private getMaxId(): number{
    if (!Array.isArray(this.people) || this.people.length === 0) return 0;
    return this.people.reduce((max, p) => Math.max(max, +p.id || 0), 0);
  }
  }

/*export class PeopleService {
  // Properties
  private people: Person[] = [];;
  peopleListChangedEvent = new Subject<Person[]>();
  private maxPersonId = 0;

 // Methods
  constructor(private http: HttpClient) {
    // Initializes the people array with an empty array
     // this.maxPersonId = this.getMaxId(); - Changed on 7/23/2025 11:17am
    
  }

   private sortAndSend() {
    // Sorts people by name
   this.people.sort((a, b) =>
    (a.lastName || '').localeCompare(b.lastName || '') ||
    (a.firstName || '').localeCompare(b.firstName || '')
  );
    // Emits a copy of the array to subscribers
    this.peopleListChangedEvent.next(this.people.slice());
   }
    // Retrieves the people array from the server
    // and updates the maxPersonId
    getPeople() {
      this.http.get<{ message: string; people: Person[] }>('http://localhost:3000/people')
        .subscribe({
          next: (response) => {
            this.people = response.people.map(p => new Person(p)); // Added .map(p => new Person(p)) 7/22/25 2:29pm
            this.maxPersonId = this.getMaxId();
            this.sortAndSend();
          }
        });
   }

    
   getPerson(id: string): Person | null {
    //return this.people.find(p => p.id === id) || null; - Changed 7/23/2025 11:19am
    const found = this.people.find(p => p.id === id);
    return found ? new Person(found) : null;
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
          this.people.push(new Person(response.person)); // Added wrap of new Person so that json from backend is converted to a new Person instance 7/22/25 2:30pm
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
          this.people[pos] = new Person(newPerson); //Overwrites the local person after a PUT Added 7/22/25 2:31pm
          // Emit the updated people array
          this.sortAndSend();
        },
        error: (error) => {
          console.error('Error updating person:', error);
        }
    });
   }

  

  }*/
   


  

 

 

