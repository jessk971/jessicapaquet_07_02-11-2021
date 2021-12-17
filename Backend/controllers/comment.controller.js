const Comment = require('../models/comment');
const User = require('../models/user');

exports.createComment = (req, res) => {
    const comment = {
        user_id: req.body.user_id,
        comment: req.body.comment,
    };

    Comment.create(comment)
        .then(() => res.status(201).json({ message: 'Commentaire créé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de créer ce commentaire', error }));
}