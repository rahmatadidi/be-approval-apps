const LeaveService = require("../services/leave.service");

exports.create = async (req, res) => {
  try {
    const leave = await LeaveService.createLeave(req.body, req.user.id);
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;
  try {
    const data = await LeaveService.getLeaves(+page, +pageSize, req.user);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const leave = await LeaveService.getLeaveData(req.params.id, req.user);

    if (!leave) {
      return res.status(404).json({ message: "Leave tidak ditemukan" });
    }

    res.json(leave);
  } catch (err) {
    console.error("DETAIL ERROR:", err);
    res.status(400).json({ message: err.message });
  }
};
