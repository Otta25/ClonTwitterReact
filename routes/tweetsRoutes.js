const express = require("express");
const router = express.Router();
const tweetsController = require("../controllers/tweetsController");
const { expressjwt: checkjwt } = require("express-jwt");

router.get("/", tweetsController.index);
//router.get("/crear", tweetsController.create);
router.get("/:id", tweetsController.show);
router.post("/", tweetsController.store);
// router.get("/editar/:id", tweetsController.edit);
// router.patch("/:id", tweetsController.update);
router.post(
  "/:id/likes",
  checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }),
  tweetsController.addLike,
);
router.delete(
  "/:id/likes",
  checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }),
  tweetsController.deleteLike,
);

router.get("/borrar/:id", tweetsController.destroy);

module.exports = router;
