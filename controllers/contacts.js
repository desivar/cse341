const mongodb = require('../data/database');
const Objectid=require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const contactId = new Objectid(req.params.id);
  const result = await mongodb.getDatabase().collection('contacts').findOne({ _id: contactId });
  if (result) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb.getDatabase().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response.insertedId); // Respond with the ID of the newly created contact
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  const contactId = new Objectid(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb.getDatabase().collection('contacts').updateOne({ _id: contactId }, { $set: contact }); // Use updateOne with $set to update specific fields
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Could not update contact or contact not found.');
  }
};


const deleteContact = async (req, res) => {
  const contactId = new Objectid(req.params.id);
  const response = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Contact not found or could not be deleted.');
  }
};

  

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
} 