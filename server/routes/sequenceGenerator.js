/****************************
 * Required Resources
 ****************************/

//Refactored 7/23/25 8:04pm
// server/routes/sequenceGenerator.js
const Sequence = require('../models/sequence');

/**
 * Returns the next sequence number for a given type.
 * Each type is tracked as a separate document in the sequences collection.
 * 
 * @param {string} type - A unique name like 'noteId', documentId, etc.
 * @returns {Promise<number>} - The next incremented ID value.
 */

async function nextId(type) {
    try {
        const sequence = await Sequence.findOneAndUpdate(
            { _id: type },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        return sequence.sequence_value;
    } catch (err) {
        console.error(`SequenceGenerator error for type [${type}]:`, err);
        return NaN
    }
}

module.exports = { nextId };


/*const Sequence = require('../models/sequence.js');

let maxDocumentId;
let maxNoteId;
let maxPersonId;
let sequenceId = null;
let initialized = false;

// Initialize the counters immediately when this module loads
async function initializeCounters() {
   try {
    const sequence = await Sequence.findOne({ _id: 'main'.trim()});
    if(!sequence) {
        throw new Error('Sequence not found');
    }
    sequenceId = sequence._id;
    maxDocumentId = sequence.maxDocumentId;
    maxNoteId = sequence.maxNoteId;
    maxPersonId = sequence.maxPersonId;
    initialized = true;

    console.log('SequenceGenerator initialized:', {
        maxNoteId,
        maxDocumentId,
        maxPersonId
    });
    } catch (err) {
        console.error('Error initializing SequenceGenerator: ', err);
    }
}

async function nextId(collectionType) {
    if (!initialized){
        throw new Error("SequenceGenerator not initialized yet");
    }

    let updateObject = {};
    let nextId;

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
            throw new Error(`Unknown collectionType: ${collectionType}`);
    }

    try {
        await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
    } catch (err) {
        console.error("Error updating Sequence", err);
        throw err;
    }
    return nextId;
}


module.exports = { nextId, initializeCounters };*/