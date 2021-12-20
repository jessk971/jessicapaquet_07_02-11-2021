const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/user.js');
const Publication = require('../models/publication');


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
    User.findAll({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur ou mots de passe incorrect !' });
            }
            user = user[0]

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Utilisateur ou mots de passe incorrect !' });
                    }
                    res.status(200).json({
                        username: user.username,
                        userId: user._id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign({ userId: user._id, isAdmin: user.isAdmin },
                            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error: "bcrypt" }));
        })
        .catch(error => res.status(500).json({ error: "sql" }));
};

exports.getOneUser = (req, res, next) => { // récupération d'un seul user
    User.findOne({
            where: { _id: req.params.id },
            include: Publication,
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }))
};

exports.deleteUser = (req, res, next) => {
    User.findOne({
            where: { _id: Number(req.params._id) },
        })
        .then((user) => {

            if (user._id === req.token.userId || req.token.isAdmin === true) {
                User.destroy({ where: { _id: req.params._id } })
                    .then(() => res.status(200).json({ message: "Profil supprimé !" }))
                    .catch((error) => res.status(400).json({ error }));
            } else {
                res.status(401).json({
                    error: "Vous ne disposez pas des droits pour supprimer ce profil !",
                });
            }
        })
        .catch((error) => res.status(500).json({ error: "deleteUser" + error }));
};


exports.getAllUsers = (req, res, next) => { // récuprération de tout les users
    User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }))

};

exports.modifyUser = (req, res) => {
    User.update(updatedUser, { where: { _id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier cet utilisateur', error }));

}