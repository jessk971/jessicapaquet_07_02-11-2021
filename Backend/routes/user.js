const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', auth, userCtrl.signup);
router.post('/login', auth, userCtrl.login);
router.delete('/users/:id', auth, userCtrl.deleteUser);
router.get('/', auth, userCtrl.getOneUser);
router.get('/users', auth, userCtrl.getAllUsers);

module.exports = router;