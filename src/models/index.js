const dbConfig = require("../config/db.config.js");

const model = {};
model.cobrador = require('./Cobrador');
const models = {};

models.cobrador = require("./Cobrador");
models.forma_de_pago = require("./FormaPago");

module.exports = models;