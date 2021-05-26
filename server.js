const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const app = express();

var corsOptions = {
  origin: "http://xuedong.online:8088"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

/**引入路由 */
require("./app/routes/test.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/record.routes")(app);
require("./app/routes/mailAuth.routes")(app);
require("./app/routes/token.routes")(app);
require("./app/routes/pass.routes")(app);

// simple route test
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to RoadCle application programming interface.",
    status: 200
   });
});

// set port, listen for requests
const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});