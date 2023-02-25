const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticated = require("../middlewares/ensureAuthenticated");

router.get("/", userController.index);
// router.get("/crear", userController.create);
router.get("/:username", isAuthenticated, userController.show);
// router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);
router.get("/followers/:id", userController.followers);
router.get("/following/:id", userController.following);

// Ruta para seguir a un usuario
router.post("/followers/:id/follow", isAuthenticated, userController.followUser);
// Ruta para dejar de seguir a un usuario
router.post("/followers/:id/unfollow", isAuthenticated, userController.unfollowUser);
router.post("/following/:id/unfollow", isAuthenticated, userController.unfollowUser);

module.exports = router;
