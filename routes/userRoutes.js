const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const { expressjwt: checkjwt } = require("express-jwt");

router.get("/", userController.index);
// router.get("/crear", userController.create);
router.get("/:id", userController.show);
// router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);
router.get("/followers/:id",checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }), userController.followers);
router.get("/following/:id",checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }), userController.following);

// // Ruta para seguir a un usuario
// router.post("/followers/follow", userController.followUser);

router.post("/unfollow/:id",checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }),userController.unfollowUser);
router.post("/follow/:id",checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }), userController.followUser);

module.exports = router;
