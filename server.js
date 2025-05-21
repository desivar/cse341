const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

// Use environment variable for the port if available, default to 8080
const port = process.env.PORT || 5500;

// Middleware
app.use(bodyParser.json());
app.use(req,res,next => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/',require('./routes'));
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});
