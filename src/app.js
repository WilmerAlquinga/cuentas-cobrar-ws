const express = require("express");
const logger = require("morgan");
const { json, urlencoded} = require("body-parser");
const { createServer} = require("http");
const app = express();
const cors = require("cors");
const port = parseInt(process.env.PORT, 10) || 8000;

app.set("port", port);
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
// app.get("/", (req, res) =>
//   res.status(200).send({
//     message: "Welcome to the RECEIVABLES system.",
//   })
// );

// imports
const cobradorRoutes = require('./routes/cobrador.routes');

//const server = createServer(app);
//server.listen(port);
// module.exports = app;

// routes
app.use(cobradorRoutes);

// run
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${port}.`);
});