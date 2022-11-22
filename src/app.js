const express = require("express");
const logger = require("morgan");
const { json, urlencoded } = require("body-parser");
const { createServer } = require("http");
const app = express();
const oracledb = require('oracledb');
app.use(logger("dev"));

app.use(json());
app.use(urlencoded({ extended: false }));
try {
  oracledb.initOracleClient({libDir: 'C:\\Users\\Usuario\\Documents\\Arquitectura\\Proyecto\\instantclient_21_7'});
} catch (err) {
  console.error('Error on init oracle client');
  console.error(err);
  process.exit(1);
}
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
