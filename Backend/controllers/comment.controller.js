const db = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');

/* Ajout d'un nouveau commentaire */
exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const userId = decodedToken.userId;

    db.Publication.findOne({ where: { id: req.body.post_id } })
        .then(publication => {
            if (!publication) {
                return res.status(404).json({ error: 'Publication introuvable !' })
            }
            db.Comment.create({
                    content: req.body.content,
                    post_id: req.body.post_id,
                    user_id: userId
                })
                .then(comment => res.status(201).json({ comment }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ message: "erreur création commentaire" }))
}



exports.getOneComment = (req, res) => {
    db.Comment.findOne({ where: { id: req.params.id, }, include: { model: db.User } })
        .then(comment => {
            if (comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({ message: 'Commentaire non trouvé' })
            }
        })
        .catch(error => res.status(400).json({ message: 'Impossible d\'afficher ce commentaire', error }));
}

exports.deleteComment = (req, res) => {

    db.Comment.findOne({
            where: { id: req.params.id },
        })
        .then((comment) => {

            if (comment.user_id == req.userId || req.isAdmin === true) {
                db.Comment.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
                    .catch((error) => res.status(400).json({ error }));
            } else {
                res.status(401).json({
                    error: "Vous ne disposez pas des droits pour supprimer ce commentaire !",
                });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};