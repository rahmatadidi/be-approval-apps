const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");

const Leave = sequelize.define("Leave", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { type: DataTypes.INTEGER, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  reason: { type: DataTypes.STRING, allowNull: false },
  attachment: { type: DataTypes.STRING, allowNull: true },
  status: {
    type: DataTypes.ENUM(
      "pending_head",
      "approved",
      "rejected",
      "revisi",
      "pending_gm"
    ),
    defaultValue: "pending_head",
  },
});

module.exports = Leave;
