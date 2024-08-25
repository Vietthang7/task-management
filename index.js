const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config();
const database = require("./config/database");
const routesApi = require("./routes/client/index.route");
database.connect();
const app = express();
const port = process.env.PORT;

// parse application/json
app.use(bodyParser.json());
routesApi.index(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});