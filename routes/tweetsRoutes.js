const express = require("express");
const router = express.Router();
const tweetsController = require("../controllers/tweetsController");
var methodOverride = require("method-override");

router.get("/", tweetsController.index);
//router.get("/crear", tweetsController.create);
router.get("/:id", tweetsController.show);
router.post("/", tweetsController.store);
// router.get("/editar/:id", tweetsController.edit);
// router.patch("/:id", tweetsController.update);
router.post("/:id/addlike", tweetsController.Addlike);
router.get("/borrar/:id", tweetsController.destroy);

module.exports = router;
