/***************************
 * Required Resources
 ***************************/
const mongoose = require('mongoose');

// Define the schema for a document
const documentSchema  = mongoose.Schema({
    id: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    docFile: { type: String, required: true },
    personId: { type: String, required: true },
    dateAdded: { type: String, required: true },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }]
});

// Export the model so it can be used in other files
module.exports = mongoose.model('Document', documentSchema);
// Note: The 'children' field is included to maintain consistency with the Person model, but it may not be necessary for documents.