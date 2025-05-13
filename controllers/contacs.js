const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

    
}

const getSingle = async (req, res) => {
const result = await mongodb.getDatabase().db().collection('contacts').find();
    
}
