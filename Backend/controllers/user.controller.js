const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('../models');



db.User.findAll()
    .then((res) => console.log(res))



// SIGNUP DES UTILISATEURS //
exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new db.User({
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
    console.log(db.User);
};

exports.login = (req, res, next) => {
    db.User.findAll({ where: { email: req.body.email } })
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
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign({ userId: user.id, isAdmin: user.isAdmin },
                            process.env.KEY_TOKEN, { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error: "bcrypt" }));
        })
        .catch(error => res.status(500).json({ error: "sql" }));
};

exports.getOneUser = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const userId = decodedToken.userId;
    db.User.findOne({
            where: {
                id: userId,
            },
        })
        .then((user) => res.status(200).json({
            user
        }))
        .catch((err) => res.status(401).json({
            err
        }));
};

exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const userId = decodedToken.userId;
    db.User.findOne({
            where: { id: userId },
        })
        .then((user) => {


            db.User.destroy({ where: { id: userId } })
                .then(() => res.status(200).json({ message: "Profil supprimé !" }))
                .catch((error) => res.status(400).json({ error }));


        })
        .catch((error) => res.status(500).json({ error: "deleteUser" + error }));
};


exports.getAllUsers = (req, res, next) => { // récuprération de tout les users
    db.User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }))

};

exports.modifyUser = (req, res) => {
    db.User.update(updatedUser, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier cet utilisateur', error }));

}