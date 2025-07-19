/****************************
 * Required Resources
 ****************************/
const Sequence = require('../models/sequence.js');

let maxDocumentId;
let maxNoteId;
let maxPersonId;
let sequenceId = null;

// Initialize the counters immediately when this module loads
async function initializeCounters() {
    const sequence = await Sequence.findOne();
    if(!sequence) {
        throw new Error('Sequence not found');
    }
    sequenceId = sequence._id;
    maxDocumentId = sequence.maxDocumentId;
    maxNoteId = sequence.maxNoteId;
    maxPersonId = sequence.maxPersonId;
}

// run initialization
initializeCounters().catch((err) => {
    console.error('Error initializing SequenceGenerator: ', err);
})

function nextId(collectionType) {
    var updateObject = {};
    var nextId;

    switch (collectionType) {
        case 'documents':
            maxDocumentId++;
            updateObject = {maxDocumentId: maxDocumentId};
            nextId = maxDocumentId;
            break;
        case 'notes':
            maxNoteId++;
            updateObject = {maxNoteId: maxNoteId};
            nextId = maxNoteId;
            break;
        case 'people':
            maxPersonId++;
            updateObject = {maxPersonId: maxPersonId};
            nextId = maxPersonId;
            break;
        default:
            return -1;
    }

Sequence.updateOne({_id: sequenceId}, {$set: updateObject})
    .catch(err => {
        console.error("nextId err = ", err);
    });
    return nextId;
}

module.exports = { nextId };