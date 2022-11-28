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

// findById
exports.findById = async (req, res) => {
    const { id_cobrador } = req.params;
    const sql = `select * from cobrador where id_cobrador=:id_cobrador`;
    let result = await BD.Open(sql, [id_cobrador], false);
    console.log(result);
    let cobrador = {
        "id_cobrador": result.rows[0][0],
        "cedula": result.rows[0][1],
        "nombre": result.rows[0][2],
        "direccion": result.rows[0][3]
    };
    res.json(cobrador);
};

// Create
exports.create = async (req, res) => {
    const { cedula, nombre, direccion } = req.body;
    const sql = `insert into cobrador(cedula, nombre, direccion) values (:cedula, :nombre, :direccion)`;
    let result = await BD.Open(sql, [cedula, nombre, direccion], true);
    console.log(result);
    let cobrador = {
        "cedula": cedula,
        "nombre": nombre,
        "direccion": direccion
    };

    res.status(200).json(cobrador);
};

// Update
exports.update = async (req, res) => {
    const { id_cobrador, cedula, nombre, direccion } = req.body;
    const sql = `update cobrador set cedula=:cedula, nombre=:nombre, direccion=:direccion where id_cobrador=:id_cobrador`;
    let result = await BD.Open(sql, [cedula, nombre, direccion, id_cobrador], true);
    console.log(result);
    let cobrador = {
        "id_cobrador": id_cobrador,
        "cedula": cedula,
        "nombre": nombre,
        "direccion": direccion
    };

    res.status(200).json(cobrador);
}

// Delete
exports.delete = async (req, res) => {
    const { code } = req.params;
    const sql = `delete from cobrador where id_cobrador=:code`;
    let result = await BD.Open(sql, [code], true);
    console.log(result);
    const message = "Cobrador con id " + code + " eliminado correctamente";
    res.status(200).json(message);
}
