const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { sequelize, User } = require("./models/index");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/leaves", require("./routes/leave.routes"));
app.use("/api/approval", require("./routes/approval.routes"));

sequelize.sync().then(async () => {
  console.log("Database Connected");
  const users = [
    {
      username: "employee",
      password: await bcrypt.hash("123", 10),
      role: "Employee",
    },
    { username: "head", password: await bcrypt.hash("123", 10), role: "Head" },
    { username: "gm", password: await bcrypt.hash("123", 10), role: "GM" },
  ];
  for (const u of users) await User.create(u);
  app.listen(3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
