const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config()
const database = require("./DATABASE_CONNECTION");
const cors = require('cors');
const helmet = require('helmet');


app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());
app.use(bodyParser.json());


module.exports = app;