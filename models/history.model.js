const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const History = sequelize.define("History", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  leaveId: { type: DataTypes.INTEGER, allowNull: false },
  actorId: { type: DataTypes.INTEGER, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  employeeName: { type: DataTypes.STRING, allowNull: false },
  action: { type: DataTypes.STRING, allowNull: false },
  comment: { type: DataTypes.TEXT },
});

module.exports = History;
