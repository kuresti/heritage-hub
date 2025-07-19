/*******************************
 * Required resource
 *******************************/
var express = require('express');
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
router.post('/', async (req, res, next) => {
    try {
        const maxPersonId = sequenceGenerator.nextId('people');

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
            notes: req.body.notes,
            children: req.body.children
        });

        const createdPerson = await person.save();

        res.status(201).json({
            message: 'Person added successfully',
            person: createdPerson
        });
    } catch(err) {
        res.status(500).json({
            message: 'An error occurred',
            error: err
        });
    }
});

/***********************************
 * PUT updating an existing person
 ***********************************/
router.put('/:id', async (req, res, next) => {
    try {
        // Check if the person exists
        const person = await Person.findOne({ id: req.params.id });

        if (!person) {
            return res.status(500).json({
                message: 'Person not found',
                error: { message: 'Person not found' }
            });
        }

        // Update the person
        person.firstName = req.body.firstName;
        person.middleName = req.body.middleName;
        person.lastName = req.body.lastName;
        person.birthDate = req.body.birthDate;
        person.birthPlace = req.body.birthPlace;
        person.christeningDate = req.body.christeningDate;
        person.marriageDate = req.body.marriageDate;
        person.deathDate = req.body.deathDate;
        person.burialPlace = req.body.burialPlace;
        person.notes = req.body.notes;
        person.children = req.body.children;

        await Person.updateOne({ id: req.params.id }, person);

        // Return success response
        res.status(200).json({
            message: 'Person update successfully',
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while updating the person.',
            error: err
        });
    }
});

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