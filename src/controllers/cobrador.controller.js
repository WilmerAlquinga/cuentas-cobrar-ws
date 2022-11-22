const res = require("express/lib/response");
const model = require("../models");
const BD = require('../config/db.config');
const models = require("../models");

const Cobrador = models.cobrador;
const table_name = 'cobrador';

// findAll
exports.findAll = async (req, res) => {
    const sql = `select * from cobrador`;
    let result = await BD.Open(sql, [], false);
    let cobradores = [];
    result.rows.map(user => {
        let cobradorEntity = {
            "id_cobrador": user[0],
            "cedula": user[1],
            "nombre": user[2],
            "direccion": user[3]
        }
        cobradores.push(cobradorEntity);
    })
    res.json(cobradores);
};
