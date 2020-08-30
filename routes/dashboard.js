const express = require("express");
const router = express.Router();
const PostController = require("../controllers/dashboard");

const { checkAuth } = require("../config/auth");

router.get("/", checkAuth, PostController.getUserPosts);
router.post("/", checkAuth, PostController.postUserPost);
router.delete("/:id", checkAuth, PostController.deleteUserPost);

module.exports = router;
