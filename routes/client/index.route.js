const taskRoute = require("./task.route");
module.exports.index = (app) => {
  app.use("/tasks", taskRoute);
}