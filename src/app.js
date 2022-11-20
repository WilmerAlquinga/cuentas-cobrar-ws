const express = require("express");
const logger = require("morgan");
const { json, urlencoded } = require("body-parser");
const { createServer } = require("http");
const app = express();
const oracledb = require('oracledb');
app.use(logger("dev"));

app.use(json());
app.use(urlencoded({ extended: false }));
oracledb.initOracleClient({libDir: 'C:\\Users\\Usuario\\Documents\\Arquitectura\\Proyecto\\instantclient_21_7'});
app.get("*", (req, res) =>
res.status(200).send({
    message: "Welcome to the RECEIVABLES system.",
  })
);
const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);
const server = createServer(app);
server.listen(port);
module.exports = app;
