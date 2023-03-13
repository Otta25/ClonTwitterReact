const formidable = require("formidable");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
const bcrypt = require("bcryptjs");
const formatDistanceToNow = require("date-fns/formatDistanceToNow");

async function showHome(req, res) {
  const user = await User.find();
  res.json(user);
}

async function login(req, res) {
  res.json("pages/log-in");
}

async function showContact(req, res) {
  res.json("pages/contact");
}

async function showAboutUs(req, res) {
  res.json("pages/aboutUs");
}

async function store(req, res) {
  return res.redirect("/");
}

async function show404(req, res) {
  res.status(404).json("pages/404");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showContact,
  showAboutUs,
  login,
  store,
};
