const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { expressjwt: checkjwt } = require("express-jwt");

async function checkToken(req, res, next) {
  checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }), next();
}

async function logout(req, res) {}

module.exports = {
  logout,
  checkToken,
};
