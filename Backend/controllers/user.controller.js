const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/user.js');


User.findAll()
    .then((res) => console.log(res))



// SIGNUP DES UTILISATEURS //
exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                isAdmin: req.body.isAdmin,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    console.log(User);
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur ou mots de passe incorrect !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Utilisateur ou mots de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id },
                            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => { // récupération d'un seul user
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }))
};

exports.deleteUser = (req, res, next) => {
    User.destroy({
        where: { _id: req.params.id }
    }).then(user => {
        response.status(204).json([]);
    }).catch(error => {
        return response.status(400).json({
            error
        })
    });
};

exports.getAllUsers = (req, res, next) => { // récuprération de tout les users
    User.find()
        .then(user => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }))

};

exports.modifyUser = (req, res, next) => {
    const userObject = req.file ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    User.update({ _id: req.params.id }, {...userObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Profil modifié !' }))
        .catch(error => res.status(400).json({ error }));
};