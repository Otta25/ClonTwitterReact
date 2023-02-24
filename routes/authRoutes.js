const isAuthenticated = require("../middlewares/ensureAuthenticated");
const passport = require("passport");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authController = require("../controllers/authController");
const loginCorrect = require("../middlewares/loginCorrect");

/**
 * Se sugiere usar este archivo para crear rutas relativas al proceso de
 * autenticación. Ejemplos: "/login" y "/logout".
 */

router.get("/logout", isAuthenticated, authController.logout);

module.exports = router;
