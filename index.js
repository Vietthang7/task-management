const express = require("express");

require('dotenv').config();
const database = require("./config/database");
const routesApi = require("./routes/client/index.route");
database.connect();
const app = express();
const port = process.env.PORT;

routesApi.index(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});