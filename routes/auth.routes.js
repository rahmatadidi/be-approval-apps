const express = require("express");
const router = express.Router();
const authConroller = require("../controllers/auth.controller");

router.post("/login", authConroller.login);

module.exports = router;
