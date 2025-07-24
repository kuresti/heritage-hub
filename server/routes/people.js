/*******************************
 * Required resource
 *******************************/
var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator.js');
const Person = require('../models/person');

/*******************************
 * GET all people
 *******************************/
router.get('/', async (req, res, next) => {
    console.log('People fetched successfully!');
    try {
        const people = await Person.find().populate('children');
        
        res.status(200).json({
            message: 'People fetched!',
            people: people
        });            
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while fetching people.',
            error: err
        });
      }
});


/*********************************
 * POST a new person
 *********************************/
// Refactored 7/22/2025
router.post('/', async (req, res) => {
    try {
        const maxPersonId = await sequenceGenerator.nextId('people');
        const person = new Person({
            id: maxPersonId,
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            birthPlace: req.body.birthPlace,
            christeningDate: req.body.christeningDate,
            marriageDate: req.body.marriageDate,
            deathDate: req.body.deathDate,
            burialPlace: req.body.burialPlace,
            note: req.body.notes,
            children: req.body.children.map(id => mongoose.Types.ObjectId(id))
        });

        const createdPerson = await person.save();
        const populatedPerson = await Person.findById(createdPerson._id).populate('children');

        res.status(201).json({
            message: 'Person added successfully',
            person: populatedPerson
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating person.', error: err });
    }
});

/****************************
 * Original POST new person
 ****************************/
// router.post('/', async (req, res, next) => {
//     try {
//         const maxPersonId = sequenceGenerator.nextId('people');

//         const person = new Person({
//             id: maxPersonId,
//             firstName: req.body.firstName,
//             middleName: req.body.middleName,
//             lastName: req.body.lastName,
//             birthDate: req.body.birthDate,
//             birthPlace: req.body.birthPlace,
//             christeningDate: req.body.christeningDate,
//             marriageDate: req.body.marriageDate,
//             deathDate: req.body.deathDate,
//             burialPlace: req.body.burialPlace,
//             notes: req.body.notes,
//             children: req.body.children
//         });

//         const createdPerson = await person.save();

//         res.status(201).json({
//             message: 'Person added successfully',
//             person: createdPerson
//         });
//     } catch(err) {
//         res.status(500).json({
//             message: 'An error occurred',
//             error: err
//         });
//     }
// });

/***********************************
 * PUT updating an existing person
 ***********************************/
// Refactored 7/22/25 11:55pm
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`PUT /people/${id}` );
        console.log('Incoming data:', req.body);

        //Find person
        const person = await Person.findOne({ id });
        if (!person) {
            console.warn('Person not found');
            return res.status(404).json({ message: 'Person not found' });
        }

        // Update fields
        const fields = [
            'firstName', 'middleName','lastName', 'birthDate', 'birthPlace',
            'christeningDate', 'marriageDate', 'deathDate', 'burialPlace', 'notes'
        ];

        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                person[field] = req.body[field];
            }
        });

        // Validate & convert children
        if (Array.isArray(req.body.children)) {
            person.children = req.body.children
            .filter(id => !!id && typeof id === 'string')
            .map(id => new mongoose.Types.ObjectId(id));
        } else {
            person.children = [];
        }

        // Save & populate
        const updated = await person.save();
        const populated = await Person.findById(updated._id).populate('children');

        res.status(200).json({
            message: 'Person updated successfully',
            person: populated
        });
    } catch (err) {
        console.error('Error updating person:', err);
        res.status(500).json({
            message: 'Internal server error',
            error: err.message || err
        });
    }
});

// // Refactored 7/22/25
// router.put('/:id', async (req, res) => {
//     try {
//         const person = await Person.findOne({ id: req.params.id });
        
//         if (!person) {
//             return res.status(404).json({ message: 'Person not found' });
//         }

//         Object.assign(person, {
//             firstName: req.body.firstName,
//             middleName: req.body.middleName,
//             lastName: req.body.lastName,
//             birthDate: req.body.birthDate,
//             birthPlace: req.body.birthPlace,
//             christeningDate: req.body.christeningDate,
//             marriageDate: req.body.marriageDate,
//             deathDate: req.body.deathDate,
//             burialPlace: req.body.burialPlace,
//             notes: req.body.notes,
//             children: req.body.children.map(id => mongoose.Types.ObjectId(id))
//         });

//         await person.save();
//         const updatedPerson = await Person.findById(person._id).populate('children');

//         res.status(200).json({
//             message: 'Person updated successfully.',
//             person: updatedPerson
//         });
//     } catch (err) {
//         res.status(500).json({ message: 'Error updating person.', error: err });
//     }
// });

/*************************
 * Original PUT update person
 *************************/
// router.put('/:id', async (req, res, next) => {
//     try {
//         // Check if the person exists
//         const person = await Person.findOne({ id: req.params.id });

//         if (!person) {
//             return res.status(500).json({
//                 message: 'Person not found',
//                 error: { message: 'Person not found' }
//             });
//         }

//         // Update the person
//         person.firstName = req.body.firstName;
//         person.middleName = req.body.middleName;
//         person.lastName = req.body.lastName;
//         person.birthDate = req.body.birthDate;
//         person.birthPlace = req.body.birthPlace;
//         person.christeningDate = req.body.christeningDate;
//         person.marriageDate = req.body.marriageDate;
//         person.deathDate = req.body.deathDate;
//         person.burialPlace = req.body.burialPlace;
//         person.notes = req.body.notes;

//         // Convert children IDs to ObjectIds
//         person.children = req.body.children.map(id => {
//             try {
//                 return new mongoose.Types.ObjectId(id);
//             } catch(err) {
//                 console.error('Invalid child ID: ', id);
//                 return null;
//             }
//         }).filter(id => id !== null);
//         // if (Array.isArray(req.body.children)) {
//         //     person.children = req.body.children.map(id => mongoose.Types.ObjectId(id));
//         // }
//         //person.children = req.body.children;

//         //await Person.updateOne({ id: req.params.id }, person);
//         console.log('Final children', person.children);
//         await person.save()
//         // Return success response
//         res.status(200).json({
//             message: 'Person update successfully',
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: 'An error occurred while updating the person.',
//             error: err
//         });
//     }
// });

/***********************************
 * DELETE a person
 ***********************************/
router.delete('/:id', async (req, res, next) => {
    try {
        // Check if the person exists
        const person = await Person.findOne({ id: req.params.id });

        if(!person) {
            return res.status(500).json({
                message: 'Person not found',
                error: { message: 'Person not found' }
            });
        }

        // Delete the person
        await Person.deleteOne({ id: req.params.id });
        
        // Return success response
        res.status(200).json({
            message: 'Person deleted successfully',
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred whiled deleting the person.',
            error: err
        });
    }
});

/***********************************
 * Exports the router
 ***********************************/
module.exports = router;