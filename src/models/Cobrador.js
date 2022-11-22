const { NUMBER, STRING } = require("oracledb")

module.exports = () => {
    return Cobrador = {
        id_cobrador: NUMBER,
        cedula: NUMBER,
        nombre: STRING,
        direccion: STRING
    }
}