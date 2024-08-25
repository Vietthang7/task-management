const taskRoute = require("./task.route");
const userRoute = require("./user.route");
module.exports.index = (app) => {
  app.use("/tasks", taskRoute);
  app.use("/users", userRoute);
}