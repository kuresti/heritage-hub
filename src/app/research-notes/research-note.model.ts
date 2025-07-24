/*******************************
 * Research Note Model
 *******************************/
export class ResearchNote {
    constructor(
        
        public id: string,
        public subject: string,
        public text: string,
        public personName: string,
        public author: string
    ) {}
}