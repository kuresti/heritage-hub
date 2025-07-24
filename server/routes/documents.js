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
console.log('GET /documents triggered');
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
        const maxDocumentId = sequenceGenerator.nextId('documents');
        console.log('Generated Document ID', maxDocumentId);

        if (!maxDocumentId) {
            return res.status(500).json({
                message: 'Failed to generate note ID'
            });
        }

        const document = new Document({
            id: maxDocumentId.toString(),
            type: req.body.type,
            description: req.body.description,
            docFile: req.body.docFile,           
            dateAdded: req.body.dateAdded           
        });

        const createdDocument = await document.save();
        res.status(201).json({
            message: 'Document added successfully',
            document: createdDocument
        });
    } catch (err) {
        console.log('Error saving document:', err);
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
            const { id } = req.params;
        // const documentId = req.params.id;
        // const document = await Document.findOne({ id: documentId }).exec();

        // if (!document) {
        //     return res.status(404).json({
        //         message: 'Document not found',
        //         error: { message: 'No document found with the provided ID.' }
        //     });
        // }

        //Check if id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid ID format',
                error: { id }
            })
        }
        
        const document = await Document.findById(id)

        if (!document) {
            return res. status(404).json({
                message: 'Document not found'
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
        document.dateAdded = req.body.dateAdded;
        

       // await Document.updateOne({ id: req.params.id }, document);
        await document.save();

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
    const id = req.params.id.toString();
    console.log('Attempting to delete document with id:', id);

    try {
          // Check if the document exists
          const document = await Document.findOne({ id: id });

          if (!document) {
            console.warn('Document not found in DB for id:', id);
            // return res. status(404).json({
            //     message: 'Document not fount',
            //     error: { message: 'Document not fount' }
            // });
          }

          const result = await Document.deleteOne({ id: id });
          console.log('Delete result:', result);

        //   // Delete the document
        //   await Document.deleteOne({ id: req.params.id });

          // Return success response
          res.status(200).json({
            message: 'Document deleted successfully',
            document: document
          });
         } catch (err) {
            console.log('OUTER ERROR:', err.stack || err);
            res. status(500).json({
                message: 'An error occurred while deleting the document.',
                error: err
            });
         }
    });

    // Export the router so it can be used in other files
    module.exports = router;
    // Note: The 'children' field is included to maintain consistency with the Person model,
