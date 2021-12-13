const publication = require('../models/publication');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');


exports.list = (req, res, next) => {

    publication.findAll()
        .then((publications) => res.json(publications))
}