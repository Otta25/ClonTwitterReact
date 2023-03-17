const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const { expressjwt: checkjwt } = require("express-jwt");

router.get("/", userController.index);
// router.get("/crear", userController.create);
router.get("/:id", userController.show);
router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);
router.get(
  "/:id/followers",
  checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }),
  userController.followers,
);
router.get(
  "/:id/following",
  checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }),
  userController.following,
);

// // Ruta para seguir a un usuario
// router.post("/followers/follow", userController.followUser);

router.delete(
  "/:id/follow",
  checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }),
  userController.unfollowUser,
);
router.post(
  "/:id/follow",
  checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }),
  userController.followUser,
);

module.exports = router;
