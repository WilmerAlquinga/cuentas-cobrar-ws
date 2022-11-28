const { NUMBER, STRING, DATE } = require("oracledb")

module.exports = () => {
    return Cobro = {
        id_cobro: NUMBER,
        numero_factura: STRING,
        valor_factura: NUMBER,
        valor_cobrado: NUMBER,
        valor_pendiente: NUMBER,
        fecha: DATE,
        cliente: STRING,
        estado: STRING
    }
}