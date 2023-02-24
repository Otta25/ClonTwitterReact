const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

router.get("/", pagesController.showHome);

router.get("/login", pagesController.login);

router.get("/sign-up", function (req, res) {
  res.status(404).render("pages/sign-up");
});

router.get("*", function (req, res) {
  res.status(404).render("pages/404");
});

module.exports = router;
