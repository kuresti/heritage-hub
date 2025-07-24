/**********************************
 * Required resources
 **********************************/
var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const ResearchNote = require('../models/research-notes');

/***********************************
 * GET all research notes
 ***********************************/
console.log('GET /research-notes triggered');
router.get('/', async (req, res, next) => {
    try {
        const researchNotes = await ResearchNote.find().exec();
        res.status(200).json({
            message: 'Research notes fetched successfully!',
            researchNotes: researchNotes
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while fetching research notes.',
            error: err
        });
    }
});

/*************************************
 * POST a new research note
 *************************************/
router.post('/', async (req, res, next) => {
    try {
        const maxNoteId = await sequenceGenerator.nextId('notes');
        console.log('Generated note ID:', maxNoteId);


        if (!maxNoteId) {
            return res.status(500).json({
                message: 'Failed to generate note ID'
            });
        }


        const researchNote = new ResearchNote({
            id: maxNoteId.toString(),
            subject: req.body.subject,
            text: req.body.text,
            personName: req.body.personName,
            author: req.body.author
        });

        const createdResearchNote = await researchNote.save();

        res.status(201).json({
            message: 'Research note added successfully',
            researchNote: createdResearchNote
        });
    } catch (err) {
        console.log('Error saving research note:', err);
        res.status(500).json({
            message: 'An error occurred while adding the research note.',
            error: err
        });
    }
});

/************************************
 * GET a research note by ID
 ************************************/
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        //Check if id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid ID format',
                error: { id }
            })
        }

        const researchNote = await ResearchNote.findById(id)

        if (!researchNote) {
            return res. status(404).json({
                message: 'Research note not found'
             });

        }
        res.status(200).json({
            message: 'Research note fetched successfully',
            researchNote: researchNote
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while fetching the research note.',
            error: err
        });        
    }
});

/***********************************
 * PUT updating an existing research note
 ***********************************/
router.put('/:id', async (req, res, next) => {
    try {
        // check if the research note exists
        const researchNote = await ResearchNote.findOne({ id: req.params.id });

        if (!researchNote) {
            return res.status(404).json({
                message: 'Research note not found',
                error: { researchNote: 'Research note not found' }
            });
        }

        // Update the research note
        researchNote.subject = req.body.subject;
        researchNote.text = req.body.text;
        researchNote.personName = req.body.personName;
        researchNote.author = req.body.author;

        //await researchNote.updateOne({ id: req.params.id }, researchNote);
        await researchNote.save();

        // return success response
        res.status(200).json({
            message: 'Research note updated successfully'        
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while updating the research note.',
            error: err
        });
    }
});

/*********************************
 * DELETE an existing research note
 *********************************/
//Refactored 7/23/25 to fix mixed ids
router.delete('/:id', async (req, res) => {
    const id = req.params.id.toString(); //ensure string
    console.log('Attempting to delete research note with id:', id);

    try {
        const note = await ResearchNote.findOne({ id: id });

        if (!note) {
            console.warn('Note not found in DB for id:', id);
        }

        const result = await ResearchNote.deleteOne({ id: id });
        console.log('Delete result:', result);

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        console.log('OUTER ERROR:', err.stack || err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
/*router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
        console.log('Attempting to delete research note with id:', id);
    
    try {
            let note;

        try{
        // Check if the research note exists
           note = await ResearchNote.findById({id: id.toString() });
           console.log('Note found:', note);
        } catch (err) {
            console.error('FIND ERROR:', err);
            return res.status(500).json({ message: 'DB find error', error: err.message });
        }

        if (!note) {
            console.warn('Note not found in DB for id:', id)
            return res.status(404).json({
                message: 'Research note not found',
                error: { id }
            });
        }

        //Delete the research note
        const deleteResult = await ResearchNote.deleteOne({ _id: id });
        console.log('Delete result: ', deleteResult);

        // Return success response
        res.status(200).json({
            message: 'Research note deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while deleting the research note.',
            error: err.message
        });
    }
});*/

/**********************************
 * Export the router
 **********************************/
module.exports = router;
// This router handles all CRUD operations for research notes, including fetching all notes, adding a new
// note, fetching a note by ID, updating an existing note, and deleting a note. It uses the ResearchNote model
// to interact with the MongoDB database and the sequenceGenerator to generate unique IDs for new notes