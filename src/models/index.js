const dbConfig = require("../config/db.config.js");

const models = {};

models.cobrador = require("./Cobrador");
models.forma_de_pago = require("./FormaPago");
models.cobro = require("./Cobro");
models.cobro_detalle = require("./CobroDetalle");

module.exports = models;