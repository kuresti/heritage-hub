/*****************************
*Required resources
******************************/
const mongoose = require('mongoose');

// Define the schema for a sequence
const sequenceSchema = mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: {type: Number, required: true }
});
// Export the model so it can be used in other files
module.exports = mongoose.model('Sequence', sequenceSchema);
