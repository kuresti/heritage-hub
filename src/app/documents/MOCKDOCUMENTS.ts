import { Document } from './document.model';

export const MOCKDOCUMENTS: Document[] = [
    {
         id: '1', 
         type: 'Birth Certificate',
         description: 'Official birth certificate of John Doe', 
         docFile: 'assets/dummy.pdf', 
         personId: '1',
         dateAdded: '7/9/2025',
         children: [] 
    },
    {
         id: '2',
         type: 'Marriage Certificate',
         description: 'Marriage cerficate of John and Jane Doe',
         docFile: 'assets/dummy.pdf',
         personId: '2',
         dateAdded: '7/9/2025',
         children:  []
    }
]