const sequelize = require("./database");
const User = require("./user.model");
const Leave = require("./leave.model");
const History = require("./history.model");

Leave.hasMany("User", { foreignKey: "leaveId" });
History.belongsTo("Leave", { foreignKey: "leaveId" });

module.exports = {
  sequelize,
  User,
  Leave,
  History,
};
