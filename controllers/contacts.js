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
    "firstName": "Lala",
    "lastName": "Bond",
     "email": "lala@example.com",
    "favoriteColor": "violet",
    "birthday":"1990-01-01"
  };
  const response = await mongodb.getDatabase().(db).collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: 'Error creating contact' });
  }
};
const updateContact = async (req, res) => {
  const contactId = new Objectid(req.params.id);
  const contact = {
    "firstName":"Carol" ,
    "lastName":"Williams" ,
    "email": "carol.williams@example.com",
    "favoriteColor":"navy" ,
    "birthday":"1978-08-28"
  }
  const response = await mongodb.getDatabase().(db).collection('contacts').replaceOne({ _id: contactId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error|| { message: 'Error updating contact' });
  }
};
 const deleteContact = async (req, res) => {
  const contactId = new Objectid(req.params.id);
  const response = await mongodb.getDatabase().collection('contacts')..remove({ _id: contactId },true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  }else {
    res.status(500).json(response.error || { message: 'Error deleting contact' });
  }
};
  

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
} 