const { Leave, History } = require("../models/index");

exports.createLeave = async (data, UserId) => {
  if (new Date(data.startDate) > new Date(data.endDate))
    throw new Error("Tanggal Akhir tidak boleh sebelum tanggal mulai");

  const leave = await Leave.create({ ...data, employeeId: UserId });
  await History.create({
    leaveId: leave.id,
    actorId: UserId,
    role: "Employee",
    action: "submit",
    comment: "Pengajuan cuti diajukan",
  });
  return leave;
};

exports.getLeaves = async (page, pageSize, user) => {
  const offset = (page - 1) * pageSize;
  const where = user.role === "Employee" ? { employeeId: user.id } : {};

  const { rows, count } = await Leave.findAndCountAll({
    where,
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

exports.getLeaveData = async (id) => {
  return Leave.findByPk(id, {
    include: [{ model: History }],
  });
};
