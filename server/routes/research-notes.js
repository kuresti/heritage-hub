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
        const maxNoteId = sequenceGenerator.nextId('notes');

        const researchNote = new ResearchNote({
            id: maxNoteId,
            subject: req.body.subject,
            text: req.body.text,
            personId: req.body.personId,
            author: req.body.author
        });

        const createdResearchNote = await researchNote.save();

        res.status(201).json({
            message: 'Research note added successfully',
            researchNote: createdResearchNote
        });
    } catch (err) {
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
        const researchNote = await ResearchNote.findById(req.params.id).exec();

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
        const researchNote = await ResearchNote.findById(req.params.id).exec();

        if (!researchNote) {
            return res.status(404).json({
                message: 'Research note not found',
                error: { researchNote: 'Research note not found' }
            });
        }

        // Update the research note
        researchNote.subject = req.body.subject;
        researchNote.text = req.body.text;
        researchNote.personId = req.body.personId;
        researchNote.author = req.body.author;

        await researchNote.updateOne({ id: req.params.id }, researchNote);

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
router.delete('/:id', async (req, res, next) => {
    try {
        // Check if the research note exists
        const researchNote = await ResearchNote.findById(req.params.id).exec();

        if (!researchNote) {
            return res.status(404).json({
                message: 'Research note not found',
                error: { researchNote: 'Research note not found' }
            });
        }

        //Delete the research note
        await ResearchNote.deleteOne({ id: req.params.id });

        // Return success response
        res.status(200).json({
            message: 'Research note deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while deleting the research note.',
            error: err
        });
    }
});

/**********************************
 * Export the router
 **********************************/
module.exports = router;
// This router handles all CRUD operations for research notes, including fetching all notes, adding a new
// note, fetching a note by ID, updating an existing note, and deleting a note. It uses the ResearchNote model
// to interact with the MongoDB database and the sequenceGenerator to generate unique IDs for new notes