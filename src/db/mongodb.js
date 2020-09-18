const mongoose = require("mongoose");
const environmentConfig = require("../config/environment");
const logger = require("../config/winston");

const boostrapApplication = (app) => {
  const { mongoBD, port } = environmentConfig();

  mongoose.connect(mongoBD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once("open", () => {
    logger.log("info", "Now connected to the database");
    app.listen(port, () => logger.log("info", `app now listening on ${port}`));
  });
  mongoose.connection.on("error", () => {
    logger.log("info", "Couldn't connect to the mongodb server");
  });
};

module.exports = boostrapApplication;
