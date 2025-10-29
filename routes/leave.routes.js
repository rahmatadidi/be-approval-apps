const express = require("express");
const router = express.Router();
const LeaveController = require("../controllers/leave.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, LeaveController.create);
router.get("/", auth, LeaveController.getAll);
router.get("/:id", auth, LeaveController.detail);

module.exports = router;
