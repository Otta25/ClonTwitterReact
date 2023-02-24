const express = require("express");
const router = express.Router();
const tweetsController = require("../controllers/tweetsController");

router.get("/", tweetsController.index);
//router.get("/crear", tweetsController.create);
router.get("/:id", tweetsController.show);
router.post("/", tweetsController.store);
// router.get("/editar/:id", tweetsController.edit);
// router.patch("/:id", tweetsController.update);
router.get("/:id/addlike", tweetsController.Addlike);
router.get("/borrar/:id", tweetsController.destroy);

module.exports = router;
