const { Leave, History } = require("../models/index");

exports.headAction = async (leaveId, action, coment, user) => {
  const leave = await Leave.findByPk(leaveId);
  if (!leave || leave.status !== "pending_head")
    throw new Error("Leave Not in Pending Head");

  if (action === "approve") leave.status = "pending_gm";
  else if (action === "revision") leave.status = "revisi";
  else if (action === "rejected") leave.status = "rejected";
  await leave.save();
  await History.create({
    leaveId,
    actorId: user.id,
    employeeName: leave.employeeName,
    role: "Head",
    action,
    comment: coment,
  });
  return leave;
};

exports.gmAction = async (leaveId, action, comment, user) => {
  const leave = await Leave.findByPk(leaveId);
  console.log("Leave found:", leave);

  if (!leave) throw new Error("Leave not found");
  if (leave.status !== "pending_gm") throw new Error("Leave Not in Pending GM");

  if (action === "approved") leave.status = "approved";
  else if (action === "revision") leave.status = "revisi";
  else if (action === "rejected") leave.status = "rejected";
  else throw new Error("Invalid action");

  await leave.save();

  await History.create({
    leaveId,
    actorId: user.id,
    employeeName: user.username,
    role: "GM",
    action,
    comment,
  });

  return leave;
};
exports.employeeRevision = async (leaveId, newData, user) => {
  const leave = await Leave.findByPk(leaveId);
  if (leave.status !== "revisi") throw new Error("Not in revision state");

  await leave.update({ ...newData, status: "pending_head" });
  await History.create({
    leaveId,
    actorId: user.id,
    role: "Employee",
    action: "revised",
    comment: "Revisi diajukan ulang",
  });

  return leave;
};
exports.getHeadPending = async (page = 1, pageSize = 10) => {
  const offset = (page - 1) * pageSize;

  const { rows, count } = await Leave.findAndCountAll({
    where: { status: "pending_head" },
    limit: pageSize,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    totalCount: count,
    totalPages: Math.ceil(count / pageSize),
    currentPage: page,
    data: rows,
  };
};

exports.getGmPending = async (page = 1, pageSize = 10) => {
  const offset = (page - 1) * pageSize;

  const { rows, count } = await Leave.findAndCountAll({
    where: { status: "pending_gm" },
    limit: pageSize,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    totalCount: count,
    totalPages: Math.ceil(count / pageSize),
    currentPage: page,
    data: rows,
  };
};
