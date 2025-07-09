export class Document {
    constructor (
        public id: string,
        public type: string,
        public description: string,
        public docFile: string,
        public personId: string, //links a person to the document
        public dateAdded: string,
        public children: Document[] = []
    ) {}
}