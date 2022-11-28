const { NUMBER, STRING, DATE } = require("oracledb")

module.exports = () => {
    return CobroDetalle = {
        id_cobro_detalle: NUMBER,
        id_cobro: NUMBER,
        id_forma_de_pago: NUMBER,
        id_cobrador: NUMBER,
        fecha: DATE,
        forma_de_pago: STRING,
        pago: STRING,
        valor: NUMBER,
        cobrador: STRING
    }
}