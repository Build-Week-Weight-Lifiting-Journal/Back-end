const express = require("express");

// Server middleware imports
const middlewareConfig = require("../config/middleware-config");
const apiRouter = require("./api-router");

const server = express();

// Server middleware
middlewareConfig(server);

// Endpoints / Routes funneled through 'api-router.js'
server.use("/api", apiRouter);

server.get("/", (req, res) => {
    res.type(".html");
    res.send('Welcome to the Weight Lifting Journal API! You can view the documentation and get started <a href="https://github.com/Build-Week-Weight-Lifiting-Journal/Back-end/blob/master/README.md" target="_blank">here</a>!')
});
module.exports = server;