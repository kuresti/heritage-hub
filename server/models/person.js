/***************************
 * Required Resources
 ***************************/
const mongoose = require('mongoose');

//Define the schema for a person
const personSchema = mongoose.Schema({
    id: { type: String, required: true },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String, required: true },
    birthDate: { type: String },
    birthPlace: { type: String },
    christeningDate: { type: String },
    marriageDate: { type: String },
    deathDate: { type: String },
    burialPlace: { type: String },
    notes: { type: String },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }]
});

// Export the model so it can be used in other files
module.exports = mongoose.model('Person', personSchema);
