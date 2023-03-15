/**
 * Este middleware es muy similar al middleware
 * https://github.com/jaredhanson/connect-ensure-login
 * creado por el propio autor de Passport.js.
 */
const jwt = require("jsonwebtoken");
const { expressjwt: checkjwt } = require("express-jwt");

async function ensureAuthenticated(req, res, next) {
  checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] });
  next();
}

module.exports = ensureAuthenticated;
