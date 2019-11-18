const express = require("express");

// Server middleware imports
const middlewareConfig = require("../config/middleware-config");
const apiRouter = require("./api-router");

const server = express();

// Server middleware
middlewareConfig(server);

// Endpoints / Routes funneled through 'api-router.js'
server.use("/api", apiRouter);

server.get("/", (req, res) => res.send("Weight Lifting Journal!"))

module.exports = server;