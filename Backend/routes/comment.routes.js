const express = require("express");
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth');


router.post('/', auth, commentController.createComment);
router.get('/', auth, commentController.getAllComments);
router.get('/:id', auth, commentController.getOneComment);
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;