const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();
const database = require("./config/database");
const routesApi = require("./routes/client/index.route");
database.connect();
const app = express();
const port = process.env.PORT;

// CORS
// Cách 1: Tất cả tên miền được phép truy cập
app.use(cors());

// Cách 2: Áp dụng cho 1 tên miền cụ thể
// const corsOptions = {
//   origin: 'https://abc.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));
// End CORS

// parse application/json
app.use(bodyParser.json());
routesApi.index(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});