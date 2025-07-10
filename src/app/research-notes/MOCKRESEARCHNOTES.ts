import { ResearchNote } from "./research-note.model";

export const MOCKRESEARCHNOTES: ResearchNote[] = [
    {
       id: '1', 
       subject: 'Diary', 
       text: 'Amy kept a detailed diary about the family.', 
       personId: '2', 
       author: 'Martin Uresti' 
    },
    {  
       id: '2', 
       subject: 'Military Service', 
       text: "Find out about John's military service.", 
       personId: '3', 
       author: 'Carol Uresti'
    },
    {
       id: '3',
       subject: 'Pioneer Trek', 
       text: "Find out which company great grandma Clayton came with.",  
       personId: '1', 
       author: 'Kim Uresti'
    }

]