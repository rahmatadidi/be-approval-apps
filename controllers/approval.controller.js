const ApprovalService = require("../services/approval.service");

exports.headAction = async (req, res) => {
  const { action, comment } = req.body;
  try {
    const leave = await ApprovalService.headAction(
      req.params.id,
      action,
      comment,
      req.user
    );
    res.json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.gmAction = async (req, res) => {
  const { action, comment } = req.body;
  const leaveId = parseInt(req.params.id, 10);
  console.log("req.params.id:", req.params.id);

  try {
    const leave = await ApprovalService.gmAction(
      leaveId,
      action,
      comment,
      req.user
    );
    res.json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.revise = async (req, res) => {
  try {
    const leave = await ApprovalService.employeeRevision(
      req.params.id,
      req.body,
      req.user
    );
    res.json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// controllers/approval.controller.js
exports.getHeadPending = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const data = await ApprovalService.getHeadPending(+page, +pageSize);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getGmPending = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const data = await ApprovalService.getGmPending(+page, +pageSize);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
