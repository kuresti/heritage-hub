export class ResearchNotes {
    constructor(
        public id: string,
        public subject: string,
        public text: string,
        public personId: string,
        public author: string
    ) {}
}