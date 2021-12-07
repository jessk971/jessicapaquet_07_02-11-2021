const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require('../middleware/auth');


router.post("/signup", userController.signup);
router.post('/login', userController.login);
router.get('/', auth, userController.getOneUser);


module.exports = router;