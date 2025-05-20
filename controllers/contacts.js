const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => { // Added 'next' for consistent error handling
  try {
    console.log("Database connection:", mongodb.getDatabase()); // Debugging line

    const result = await mongodb.getDatabase().collection('contacts').find();
    const contacts = await result.toArray(); // Await directly for consistency
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error in getAll:", error);
    next(error); // Pass error to next middleware
  }
};

const getSingle = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('contacts').findOne({ _id: contactId });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    // Catch invalid ObjectId format or other database errors
    if (error.name === 'BSONTypeError' || error.name === 'CastError') { // BSONTypeError for Node.js driver, CastError for Mongoose
      return res.status(400).json({ message: 'Invalid Contact ID format' });
    }
    console.error("Error in getSingle:", error);
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
      // Return 201 Created and the ID of the new contact
      res.status(201).json({ id: response.insertedId, message: 'Contact created successfully' });
    } else {
      res.status(500).json({ message: 'Error creating contact' });
    }
  } catch (error) {
    console.error("Error in createContact:", error);
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().collection('contacts').replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send(); // No Content
    } else if (response.matchedCount === 0) {
      res.status(404).json({ message: 'Contact not found' }); // If ID didn't match
    } else {
      // If matchedCount > 0 but modifiedCount is 0, it means the data was identical
      res.status(200).json({ message: 'Contact found but no changes applied (data was identical)' });
    }
  } catch (error) {
    if (error.name === 'BSONTypeError' || error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Contact ID format' });
    }
    console.error("Error in updateContact:", error);
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: 'Contact not found' }); // If ID didn't match
    }
  } catch (error) {
    if (error.name === 'BSONTypeError' || error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Contact ID format' });
    }
    console.error("Error in deleteContact:", error);
    next(error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};