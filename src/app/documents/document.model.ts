/************************
 * Docuemnt Model
 ************************/
export class Document {
    constructor (
        public id: string,
        public type: string,
        public description: string,
        public docFile: string,        
        public dateAdded: string       
    ) {}
}