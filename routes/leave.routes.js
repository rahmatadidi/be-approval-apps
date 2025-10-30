const express = require("express");
const router = express.Router();
const LeaveController = require("../controllers/leave.controller");
const auth = require("../middlewares/auth.middleware");

const { roleMiddleware } = require("../middlewares/role.middleware");

router.post("/", auth, LeaveController.create);
router.get("/", auth, LeaveController.getAll);
router.get("/:id", auth, roleMiddleware("HEAD"), LeaveController.detail);

module.exports = router;
