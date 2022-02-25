const express = require("express");
const router = express.Router();
const publicationController = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/create', auth, multer, publicationController.createPublication);
router.get('/', auth, multer, publicationController.getAllPublications);
router.get('/:id', auth, multer, publicationController.getOnePublication);
router.get('/:id/comments', publicationController.getAllComments);
router.delete('/:id', publicationController.deletePublication);

module.exports = router;