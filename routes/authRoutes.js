const passport = require("passport");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

/**
 * Se sugiere usar este archivo para crear rutas relativas al proceso de
 * autenticación. Ejemplos: "/login" y "/logout".
 */

router.get("/logout", isAuthenticated, authController.logout);

module.exports = router;
