const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function logout(req, res) {
  req.logout((err) => {
    if (err) throw err;
    return res.redirect("/login");
  });
}

module.exports = {
  logout,
};
