const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post("/signup", userController.signup);
router.post('/login', userController.login);
router.get('/profil', auth, userController.getOneUser);
router.delete('/delete/:id', auth, userController.deleteUser);
router.get('/users', auth, userController.getAllUsers);
router.put('/profil', auth, multer, userController.modifyUser)

module.exports = router;