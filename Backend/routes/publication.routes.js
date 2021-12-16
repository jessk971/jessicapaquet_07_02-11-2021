const express = require("express");
const router = express.Router();
const publication = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, publication.createPublication);
router.get('/', auth, publication.getAllPublications);
router.get('/:id', auth, publication.getOnePublication);

module.exports = router;