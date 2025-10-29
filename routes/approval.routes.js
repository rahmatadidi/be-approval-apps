const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ApprovalController = require("../controllers/approval.controller");

router.post("/head/:id", auth, role(["Head"]), ApprovalController.headAction);
router.post("/gm/:id", auth, role(["GM"]), ApprovalController.gmAction);
router.put("/revise/:id", auth, role(["Employee"]), ApprovalController.revise);

module.exports = router;
