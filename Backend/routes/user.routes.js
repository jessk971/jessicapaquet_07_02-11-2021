const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/signup", userCtrl.signup);


module.exports = router;