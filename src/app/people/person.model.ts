/*********************************
 * Required Resources
 *********************************/
import { ResearchNote } from "../research-notes/research-note.model";


/**********************************
 * Person Model
 **********************************/
// Refactored 7/22/2025
export class Person {
    _id?: string; // MongoDB ObjectId Added 7/22/25 2:47pm
    id: string;
    firstName?: string;
    middleName?: string;
    lastName: string;
    birthDate?: string;
    birthPlace?: string;
    christeningDate?: string;
    marriageDate?: string;
    deathDate?: string;
    burialPlace?: string;
    notes?: ResearchNote[];

    /**
     * Support both:
     * -children as string[] (IDs from frontend)
     * -OR populated Person[] (from backend .populate())
     */
    children: (string | Person)[] = [];

    constructor(data: Partial<Person>) {
        Object.assign(this, data);

       // Normalize children to just IDs
       if (Array.isArray(this.children)) {
        this.children = this.children.map(child => {
            if (typeof child === 'string') return child;
            if (child && typeof child === 'object' && 'id' in child) return new Person(child);
            return '';
        }).filter(Boolean);
       } else {
        this.children = [];
       }
    }

    /**
     * Utility to get populated children as Person[]
     */
    // Refactored 7/23/25 4:17pm
    // getPopulatedChildren(allPeople: Person[]): Person[] {
    //     return this.children
    //         .map(child => {
    //             if (typeof child === 'object' && 'id' in child) return child as Person;
    //             if (typeof child === 'string') {
    //                 return allPeople.find(p => p.id === child) || null;
    //             }
    //             return null;
    //         })
    //         .filter((c): c is Person => !!c);
    // }
    getPopulatedChildren(): Person[] {
        return (this.children || []).filter(
            (c): c is Person => typeof c === 'object' && c !== null && 'firstName' in c
        );
    }

    /**
     * Utility to get just child IDs
     */
    getChildIds(): string[] {
        return (this.children || []).map(child =>
            typeof child === 'string' ? child: child.id
        );
    }

}
/**********************************
 * Original Person model
 **********************************/
/*export class Person {

    constructor ( public id: string,
                  public firstName: string,
                  public middleName: string,
                  public lastName: string,
                  public birthDate: string,
                  public birthPlace: string,
                  public christeningDate: string,
                  public marriageDate: string,
                  public deathDate: string,
                  public burialPlace: string,
                  public notes: string,
                  public children: string[],
                  public _id?: string

    ) {}
}*/