const express = require("express");
const router = express.Router();
const publicationController = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/create', auth, publicationController.createPublication);
router.get('/', auth, publicationController.getAllPublications);
router.get('/:id', auth, publicationController.getOnePublication);
router.put('/:id', auth, multer, publicationController.modifyPublication);
router.delete('/:id', publicationController.deletePublication);

module.exports = router;