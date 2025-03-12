const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
let database;

const initDB = (callback) => {
    if (database) {
        console.log('Database is already initialized');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGO_URL)
    .then((client) => {
        database = client;
        callback(null, database);
    })
    .catch((err) => {
        callback(err);
    });
};

const getDB = () => {
    if (!database) {
        throw new Error('Database is not initialized');
    }
    return database;
};

module.exports = {
    initDB,
    getDB
};