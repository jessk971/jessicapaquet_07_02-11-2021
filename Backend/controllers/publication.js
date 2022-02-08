const Publication = require('../models/publication');
const User = require('../models/user');
const fs = require('fs');



exports.createPublication = (req, res, ) => {
    const publication = {
        user_id: req.body.user_id,
        content: req.body.content,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    };

    Publication.create(publication)
        .then(() => res.status(201).json({ message: 'Post créé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de créer ce post', error }));


};

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

    Publication.findOne({ where: { id: req.params.id }, include: { model: User } })
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
    Publication.update(updatedPublication, { where: { id: req.params.id, user_id: req.body.user_id } })
        .then(() => res.status(200).json({ message: 'Publication modifiée avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier cette publication', error }));
}

exports.deletePublication = (req, res, next) => {
    Publication.findOne({
            where: { id: req.params.id },
        })
        .then((publication) => {

            if (publication.userId === req.userId || req.isAdmin === true) {
                if (publication.image) {
                    const filename = post.image.split("/images/")[1];
                    fs.unlink(`./images/${filename}`, () => {
                        Publication.destroy({ where: { id: req.params.id } })
                            .then(() => res.status(200).json({ message: "Publication supprimée !" }))
                            .catch((error) => res.status(400).json({ error }));
                    });
                } else {
                    Publication.destroy({ where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: "Publication supprimée !" }))
                        .catch((error) => res.status(400).json({ error }));
                }
            } else {
                res.status(401).json({
                    error: "Vous ne disposez pas des droits pour supprimer cette publication !",
                });
            }
        })
        .catch((error) => res.status(500).json({ error: "delete err " + error }));
};