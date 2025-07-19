/******************************
 * Required resources
 ******************************/
const mongoose = require('mongoose');

// Define the schema for a research note
const researchNoteSchema = mongoose.Schema({
    id: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' }, 
    author: { type: String, required: true }
});

// Export the model so it can be used in other files
module.exports = mongoose.model('ResearchNote', researchNoteSchema);
// Note: The 'personId' field is used to link the research note to a specific person.
// The 'author' field is included to identify who wrote the note, which can be useful