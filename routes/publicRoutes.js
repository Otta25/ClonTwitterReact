const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");
const loginCorrect = require("../middlewares/loginCorrect");
const isAuthenticated = require("../middlewares/ensureAuthenticated");
const User = require("../models/User");
const passport = require("passport");

router.get("/", isAuthenticated, pagesController.showHome);

router.get("/login", pagesController.login);

router.post(
  "/login",
  loginCorrect,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

router.get("/sign-up", function (req, res) {
  res.render("pages/sign-up");
});

router.post("/sign-up", pagesController.store);

router.get("*", function (req, res) {
  res.status(404).render("pages/404");
});

module.exports = router;
