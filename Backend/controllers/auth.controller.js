const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fs = require('fs');
const db = require('../models/index.js');

console.log(Object.keys(db));



// SIGNUP DES UTILISATEURS //
exports.signup = (req, res, next) => {
    const User = db.User;

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                isAdmin: req.body.isAdmin,

            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur crée'
                }))
                .catch(error => res.status(401).json({
                    message: 'Cette adresse mail et\\ou ce nom d\'utilisateur semble être déjà utilisé'
                }));
        })
        .catch(error => console.log(error) || res.status(500).json({
            error: "erreur signup"
        }));
};