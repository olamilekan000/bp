"use strict";
require("dotenv").config();
const server = require("./src/application/server");
const boostrapApplication = require("./src/db/mongodb");

const app = server();

boostrapApplication(app);
