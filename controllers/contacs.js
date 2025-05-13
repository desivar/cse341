const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

    
}

const getSingle = async (req, res) => {
const result = await mongodb.getDatabase().db().collection('contacts').find();
result.toArray().then(contacts => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
});
}
