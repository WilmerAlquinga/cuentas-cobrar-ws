const { NUMBER, STRING } = require("oracledb")

module.exports = () => {
    return FormaPago = {
        id_forma_de_pago: NUMBER,
        codigo: STRING,
        nombre: STRING
    }
}