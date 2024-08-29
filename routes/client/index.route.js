const taskRoute = require("./task.route");
const userRoute = require("./user.route");
const authMiddleware = require("../../middleware/client/auth.middleware");
module.exports.index = (app) => {
  app.use("/tasks",authMiddleware.requireAuth,taskRoute);
  app.use("/users", userRoute);
}