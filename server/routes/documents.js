/*************************
 * Required Resources
 *************************/
const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator.js');
const Document = require('../models/document.js');

/*************************
 * GET all documents
 *************************/
router.get('/', async (req, res, next) => {
    try {
        const documents = await Document.find().exec();
        res.status(200).json({
            message: 'Documents fetched successfully!',
            documents: documents
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while fetching documents.',
            error: err
        });
    }
});

/***************************
 * POST a new document
 ***************************/
router.post('/', async (req, res, next) => {
    try{
        const maxDocumentId = sequenceGenerator.nextId(documents);

        const document = new Document({
            id: maxDocumentId,
            type: req.body.type,
            description: req.body.description,
            docFile: req.body.docFile,
            personId: req.body.personId,
            dateAdded: req.body.dateAdded,
            children: req.body.children || []
        });

        const createdDocument = await document.save();
        res.status(201).json({
            message: 'Document added successfully',
            document: createdDocument
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while adding the document.',
            error: err
        });
    }
});

/***************************
 * GET a document by ID
 ***************************/
router.get('/:id', async (req, res, next) => {
    try {
        const documentId = req.params.id;
        const document = await Document.findOne({ id: documentId }).exec();

        if (!document) {
            return res.status(404).json({
                message: 'Document not found',
                error: { message: 'No document found with the provided ID.' }
            });
        }

        res.status(200).json({
            message: 'Document fetched successfully',
            document: document
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while fetching the document.',
            error: err
        });
    }
});

/*****************************
 * PUT updating an existing document
 *****************************/
router.put('/:id', async (req, res, next) => {
    try {

        // Check if the document exists
        const document = await Document.findOne({ id: req.params.id });

        if (!document) {
            return res. status(404).json({
                message: 'Document not found',
                error: { document: 'Document not found' }
            });
        }

        // Update the document 
        document.type = req.body.type;
        document.description = req.body.description;
        document.docFile = req.body.docFile;
        document.personId = req.body.personId;
        document.dateAdded = req.body.dateAdded;
        document.children = req.body.children || [];

       // await Document.updateOne({ id: req.params.id }, document);
       const updatedDocument = await document.save();

        // Return success response
        res.status(200).json({
            message: 'Document update successfully',
            document: document
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while updating the document.',
            error: err
        });
    }
});

/*****************************
 * DELETE a document
 *****************************/
router.delete('/:id', async (req, res, next) => {
    try {
          // Check if the document exists
          const document = await Document.findOne({ id: req.params.id });

          if (!document) {
            return res. status(404).json({
                message: 'Document not fount',
                error: { message: 'Document not fount' }
            });
          }

          // Delete the document
          await Document.deleteOne({ id: req.params.id });

          // Return success response
          res.status(200).json({
            message: 'Document deleted successfully',
            document: document
          });
         } catch (err) {
            res. status(500).json({
                message: 'An error occurred while deleting the document.',
                error: err
            });
         }
    });

    // Export the router so it can be used in other files
    module.exports = router;
    // Note: The 'children' field is included to maintain consistency with the Person model,
