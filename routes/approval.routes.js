const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const { roleMiddleware } = require("../middlewares/role.middleware");
const ApprovalController = require("../controllers/approval.controller");
// routes/approval.routes.js
router.get(
  "/head",
  auth,
  roleMiddleware("Head"),
  ApprovalController.getHeadPending
);

router.get("/gm", auth, roleMiddleware("GM"), ApprovalController.getGmPending);

router.post(
  "/head/:id",
  auth,
  roleMiddleware("Head"),
  ApprovalController.headAction
);
router.post("/gm/:id", auth, roleMiddleware("GM"), ApprovalController.gmAction);
router.put(
  "/revise/:id",
  auth,
  roleMiddleware("Employee"),
  ApprovalController.revise
);

module.exports = router;
