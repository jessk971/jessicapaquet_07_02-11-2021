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
            where: { post_id: req.params.post_id, },
            include: { model: User }
        })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ message: 'Impossible d\'afficher tous les commentaires', error }));
}

exports.getOneComment = (req, res) => {
    Comment.findOne({ where: { user_id: req.body.user_id, post_id: req.params.post_id, }, include: { model: User } })
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

    Comment.destroy({ where: { _id: req.params.id, user_id: req.body.user_id, post_id: req.params.post_id, } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de supprimer ce commentaire', error }))
}