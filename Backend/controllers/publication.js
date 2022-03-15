const db = require('../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');




exports.createPublication = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const userId = decodedToken.userId;

    db.User.findOne({ where: { id: userId } })
        .then(user => {

            let image = null;
            if (req.file !== undefined) {
                image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            db.Publication.create({
                    user_id: req.body.user_id,
                    content: req.body.content,
                    image: image
                })
                .then(publication => {
                    return res.status(201).json({ publication })
                })
                .catch(error => {
                    console.log(error)
                    res.status(400).json({ message: 'Erreur création bdd' })
                })
        })
        .catch(error => res.status(500).json({ error: "Problème lié à la base de données" }));
};

exports.getAllPublications = (req, res) => {

    db.Publication.findAll({

            include: {
                model: db.User,
                attribute: [
                    "id", "username", "isAdmin"
                ]
            },
            order: [
                ['createdAt', 'DESC']
            ],
        })
        .then(publications => {
            res.status(200).json(publications);
        })
        .catch(error => res.status(500).json({ error: error }))
}
exports.getOnePublication = (req, res) => {

    db.Publication.findOne({ where: { id: req.params.id }, include: { model: db.User } })
        .then(publication => res.status(200).json(publication))
        .catch(error => res.status(400).json({ message: 'Impossible d\'afficher cette publication', error }));
}

exports.modifyPublication = (req, res) => {
    let updatedPublication = {
        content: req.body.content,
    }
    if (req.file) {
        updatedPublication["image"] = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    db.Publication.update(updatedPublication, { where: { id: req.params.id, user_id: req.body.user_id } })
        .then(() => res.status(200).json({ message: 'Publication modifiée avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier cette publication', error }));
}

exports.deletePublication = (req, res, next) => {
    db.Publication.findOne({ id: req.params.id })
        .then(() =>
            db.Publication.destroy({
                where: { id: req.params.id }
            })
        )
        .then(() => res.status(200).json({ message: 'Publication supprimée' }))
        .catch(error => res.status(400).json({ error }))
}
exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
            where: { post_id: req.params.id },
            include: {
                model: db.User,
                attribute: [
                    "id", "username", "isAdmin"
                ]
            },
            order: [
                ['createdAt', 'ASC']
            ],
        })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({ error }))
};

exports.getAllMyPublication = (req, res, next) => {

    db.Publication.findAll({ where: { user_id: req.user_id, } })
        .then((result) => res.status(200).json(result))
        .catch(error => res.status(400).json({ error: 'impossible d\'afficher tous vos publications' }));
};