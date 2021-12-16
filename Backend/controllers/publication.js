const Publication = require('../models/publication');
const { Sequelize, DataTypes } = require('sequelize');
const User = require('../models/user');
const fs = require('fs');



exports.createPublication = (req, res) => {
    const publication = {
        user_id: req.body.user_id,
        content: req.body.content,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    };

    Publication.create(publication)
        .then(() => res.status(201).json({ message: 'Publication créé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de créer cette publication', error }));
}

exports.getAllPublications = (req, res) => {
    Publication.findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            include: { model: User, attributes: ['username'] }
        })
        .then(publications => res.status(200).json(publications))
        .catch(error => res.status(400).json({ message: 'Impossible d\'afficher toutes les publications', error }));
}

exports.getOnePublication = (req, res) => {

    Publication.findOne({ where: { _id: req.params.id }, include: { model: User } })
        .then(publication => res.status(200).json(publication))
        .catch(error => res.status(400).json({ message: 'Impossible d\'afficher cette publication', error }));
}

exports.modifyPublication = (req, res, next) => {
    const publicationObject = req.file ? {
        ...JSON.parse(req.body.publication),
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    Publication.update({ _id: req.params.id }, {...publicationObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id }) // on identifie la sauce 
        .then(publication => {
            const filename = publication.imageUrl.split('/images/')[1]; // récupération url de l'image 
            fs.unlink(`images/${filename}`, () => { // supprimer du server 
                Publication.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};