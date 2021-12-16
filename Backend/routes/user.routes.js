const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post("/signup", userController.signup);
router.post('/login', userController.login);
router.get('/', auth, userController.getOneUser);
router.delete('/:id', auth, userController.deleteUser);
router.get('/', auth, userController.getAllUsers);
router.put('/:id', auth, multer, userController.modifyUser);


module.exports = router;