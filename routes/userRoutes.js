const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.index);
// router.get("/crear", userController.create);
router.get("/:id", userController.show);
// router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);
router.get("/followers/:id", userController.followers);
router.get("/following/:id", userController.following);

// Ruta para seguir a un usuario
router.post("/followers/follow", userController.followUser);
router.post(
  "/followers/unfollow",

  userController.unfollowUser
);

router.post(
  "/following/unfollow",

  userController.unfollowUser
);
router.post("/following/follow", userController.followUser);

module.exports = router;
