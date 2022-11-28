const res = require("express/lib/response");
const model = require("../models");
const BD = require('../config/db.config');
const models = require("../models");

const FormaPago = models.forma_de_pago;
const table_name = 'forma_de_pago';

// findAll
exports.findAll = async (req, res) => {
    const sql = `select * from forma_de_pago`;
    let result = await BD.Open(sql, [], false);
    let formas_de_pago = [];
    result.rows.map(forma_de_pago => {
        let formaPago = {
            "id_forma_de_pago": forma_de_pago[0],
            "codigo": forma_de_pago[1],
            "nombre": forma_de_pago[2]
        }
        formas_de_pago.push(formaPago);
    })
    console.log();
    res.json(formas_de_pago);
};

// findById
exports.findById = async (req, res) => {
    const { id_forma_de_pago } = req.params;
    const sql = `select * from forma_de_pago where id_forma_de_pago=:id_forma_de_pago`;
    let result = await BD.Open(sql, [id_forma_de_pago], false);
    console.log(result);
    let forma_de_pago = {
        "id_forma_de_pago": result.rows[0][0],
        "codigo": result.rows[0][1],
        "nombre": result.rows[0][2]
    };
    res.json(forma_de_pago);
};

// Create
exports.create = async (req, res) => {
    const { codigo, nombre } = req.body;
    const sql = `insert into forma_de_pago(codigo, nombre) values (:codigo, :nombre)`;
    let result = await BD.Open(sql, [codigo, nombre], true);
    console.log(result);
    let forma_de_pago = {
        "codigo": codigo,
        "nombre": nombre
    };

    res.status(200).json(forma_de_pago);
};

// Update
exports.update = async (req, res) => {
    const { id_forma_de_pago, codigo, nombre } = req.body;
    const sql = `update forma_de_pago set codigo=:codigo, nombre=:nombre where id_forma_de_pago=:id_forma_de_pago`;
    let result = await BD.Open(sql, [codigo, nombre, id_forma_de_pago], true);
    console.log(result);
    let forma_de_pago = {
        "id_forma_de_pago": id_forma_de_pago,
        "codigo": codigo,
        "nombre": nombre
    };

    res.status(200).json(forma_de_pago);
}

// Delete
exports.delete = async (req, res) => {
    const { code } = req.params;
    const sql = `delete from forma_de_pago where id_forma_de_pago=:code`;
    let result = await BD.Open(sql, [code], true);
    console.log(result);
    const message = "Forma de pago con id " + code + " eliminado correctamente";
    res.status(200).json(message);
}
