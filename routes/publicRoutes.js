const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");

const User = require("../models/User");

router.get("/", pagesController.showHome);

router.get("/login", pagesController.login);

// router.post("/login", loginCorrect);

router.get("/sign-up", function (req, res) {
  res.json("pages/sign-up");
});

router.post("/sign-up", pagesController.store);

router.get("*", function (req, res) {
  res.status(404).json("pages/404");
});

module.exports = router;
