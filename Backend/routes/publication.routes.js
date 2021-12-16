const express = require("express");
const router = express.Router();
const publication = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, publication.createPublication);
router.get('/', auth, publication.getAllPublications);
router.get('/:id', auth, publication.getOnePublication);
router.put('/:id', auth, multer, publication.modifyPublication);
router.delete('/:id', auth, publication.deletePublication);

module.exports = router;