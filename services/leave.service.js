const { Leave, History } = require("../models/index");

exports.createLeave = async (data, UserId) => {
  const { employeeName, startDate, endDate, reason, attachment } = data;

  if (!employeeName) throw new Error("employeeName harus diisi");
  if (!startDate || !endDate || !reason)
    throw new Error("Tanggal dan alasan harus diisi");
  if (new Date(startDate) > new Date(endDate))
    throw new Error("Tanggal akhir harus >= tanggal mulai");

  const leave = await Leave.create({
    employeeId: UserId,
    employeeName,
    startDate,
    endDate,
    reason,
    attachment,
    status: "pending_head",
  });

  await History.create({
    leaveId: leave.id,
    actorId: UserId,
    employeeName,
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

  console.log("DEBUG count:", count, "offset:", offset, "limit:", pageSize);
  return {
    totalCount: count,
    totalPages: Math.ceil(count / pageSize),
    currentPage: page,
    data: rows,
  };
};

exports.getLeaveData = async (id) => {
  return Leave.findByPk(id, {
    include: [
      {
        model: History,
        as: "histories",
      },
    ],
  });
};

exports.getPendingByRole = async (role, page, pageSize) => {
  const offset = (page - 1) * pageSize;
  const status = role === "Head" ? "pending_head" : "pending_gm";

  const { rows, count } = await Leave.findAndCountAll({
    where: { status },
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
