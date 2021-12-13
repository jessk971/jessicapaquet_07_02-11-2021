const express = require("express");
const router = express.Router();
const publication = require('../controllers/publication');
const auth = require('../middleware/auth');

router.post('/', auth, publication.list);

module.exports = router;