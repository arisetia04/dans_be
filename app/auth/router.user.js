const express = require("express");
const router = express.Router();
const user = require("./controller.user");

router.get("/", user.users);
router.post("/sign-in", user.userSignIn);
router.post("/sign-up", user.userSignUp);

module.exports = router
