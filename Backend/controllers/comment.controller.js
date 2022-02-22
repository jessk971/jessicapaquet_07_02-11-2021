const Comment = require('../models/comment');
const User = require('../models/user');

exports.createComment = (req, res) => {
    const comment = {
        comment: req.body.comment,
        user_id: req.body.user_id,
        post_id: req.params.post_id,

    };

    Comment.create(comment)
        .then(() => res.status(201).json({ message: 'Commentaire créé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de créer ce commentaire', error }));
}

exports.getAllComments = (req, res) => {

    Comment.findAll({
            order: [
                ['createdAt', 'ASC']
            ],
            where: { post_id: req.params.id, },
            include: { model: User }
        })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ message: 'Impossible d\'afficher tous les commentaires', error }));
}

exports.getOneComment = (req, res) => {
    Comment.findOne({ where: { id: req.params.id, }, include: { model: User } })
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

    Comment.findOne({
            where: { id: req.params.id },
        })
        .then((comment) => {

            if (comment.user_id == req.userId || req.isAdmin === true) {
                Comment.destroy({ where: { id: req.params.id } })
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