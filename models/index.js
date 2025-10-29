const sequelize = require("../config/database");
const User = require("./user.model");
const Leave = require("./leave.model");
const History = require("./history.model");

User.hasMany(Leave, { foreignKey: "employeeId", as: "leaves" });
Leave.belongsTo(User, { as: "employee", foreignKey: "employeeId" });
Leave.hasMany(History, { foreignKey: "leaveId", as: "histories" });
History.belongsTo(Leave, { foreignKey: "leaveId" });

module.exports = {
  sequelize,
  User,
  Leave,
  History,
};
