const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { expressjwt: checkjwt } = require("express-jwt");

router.get(
  "/",
  checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }),
  pagesController.showHome,
);

router.post("/login", pagesController.login);

router.get("/sign-up", function (req, res) {
  res.json("pages/sign-up");
});

router.post("/sign-up", pagesController.store);

router.get("*", function (req, res) {
  res.status(404).json("pages/404");
});

module.exports = router;
