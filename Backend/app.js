const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()
require("./config/db");
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());



app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;