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
  try {
    const leave = await ApprovalService.gmAction(
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
