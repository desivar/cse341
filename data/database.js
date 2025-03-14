const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGO_URL)
    .then((client) => {
        database = client.db(); // Corrected line
        callback(null, database);
    })
    .catch((err) => {
        callback(err);
    });
};

const getDb = () => {
    if (!database) {
        throw new Error('Database is not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDb
};