const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");

const { checkAuth } = require("../config/auth");

router.get("/login", UserController.getUserLogin);
router.get("/register", UserController.getUserRegister);
router.post("/login", UserController.postUserLogin);
router.post("/register", UserController.postUserRegister);
router.get("/logout", checkAuth, UserController.getUserLogout);

module.exports = router;
