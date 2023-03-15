const formidable = require("formidable");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
const bcrypt = require("bcryptjs");
const formatDistanceToNow = require("date-fns/formatDistanceToNow");

const express = require("express");
const jwt = require("jsonwebtoken");
const { expressjwt: checkjwt } = require("express-jwt");

async function showHome(req, res) {
  const user = await User.findById(req.auth.userId);
  console.log(req.auth.userId);
  res.json(user);
}

//////////////////////
async function login(req, res) {
  const user = await User.findOne({ username: req.body.username });
  const matchPassword = await bcrypt.compare(req.body.password, user.password);

  if (user && matchPassword) {
    const token = jwt.sign({ userId: user.id }, process.env.SESSION_SECRET);
    res.json({ token: token });
  } else res.json("No existe este usuario");
}

/////////////////////

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
