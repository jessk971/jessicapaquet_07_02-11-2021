const express = require("express");
const router = express.Router();
const publicationController = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/create', auth, multer, publicationController.createPublication);
router.get('/', auth, multer, publicationController.getAllPublications);
router.get('/:id', auth, multer, publicationController.getOnePublication);
router.get('/:id/comments', auth, publicationController.getAllComments);
router.put('/:id', auth, multer, publicationController.modifyPublication);
router.delete('/:id', publicationController.deletePublication);
router.get('/myPost', auth, multer, publicationController.getAllMyPublication);

module.exports = router;