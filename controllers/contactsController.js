const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;
 
const getAll=async(req,res)=>{
 
    const result = await mongodb.getDB().db().collection('contacts').find();
    result.toArray().then((contacts)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacs);
    });
};
 
 
const getSingle=async(req,res)=>{
    const userId=new ObjectId(req.params.id);
    const result = await mongodb.getDB().db().collection('users').find({ _id: userId });
    result.toArray().then((contacts)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};
    module.exports={
        getAll,
        getSingle
    };
 
