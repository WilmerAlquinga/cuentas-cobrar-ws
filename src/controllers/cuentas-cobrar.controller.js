const res = require("express/lib/response");
const model = require("../models");
const BD = require('../config/db.config');
const models = require("../models");

const Cobro = models.cobro;
const CobroDetalle = models.cobro_detalle;
const table_name = 'cobrador';

// findAll
exports.findAll = async (req, res) => {
    const sql = `select * from cobro`;
    let result = await BD.Open(sql, [], false);
    let cobros = await Promise.all(result.rows.map(async cobro => {
        const id_cobro = cobro[0];
        console.log(id_cobro);
        let cobroEntity = {
            "id_cobro": cobro[0],
            "numero_factura": cobro[1],
            "valor_factura": cobro[2],
            "valor_cobrado": cobro[3],
            "valor_pendiente": cobro[4],
            "fecha": cobro[5],
            "cliente": cobro[6],
            "estado": cobro[7],
            "detalles": []
        }
        const sql_det = `select * from cobro_detalle where id_cobro=:id_cobro`;
        const result_det = await BD.Open(sql_det, [id_cobro], false);
        let detalles = [];
        await Promise.all(await result_det.rows.map(cobro => {
                let detalleCobroEntity = {
                    "id_cobro_detalle": cobro[0],
                    "id_cobro": cobro[1],
                    "id_forma_de_pago": cobro[2],
                    "id_cobrador": cobro[3],
                    "fecha": cobro[4],
                    "forma_de_pago": cobro[5],
                    "pago": cobro[6],
                    "valor": cobro[7],
                    "cobrador": cobro[8]
                }
                detalles.push(detalleCobroEntity);
            })
        )
        cobroEntity.detalles = detalles;
        return cobroEntity;
        // console.log(cobro);
        // cobros.push(cobroEntity);
    }))
    console.log(cobros);
    res.json(cobros);
};

// findById
exports.findById = async (req, res) => {
    const { id_cobro } = req.params;
    const sql = `select * from cobro where id_cobro=:id_cobro`;
    let result = await BD.Open(sql, [id_cobro], false);
    console.log(result);
    let cobro;
    if (result.rows[0] !== null) {
        cobro = {
            "id_cobro": result.rows[0][0],
            "numero_factura": result.rows[0][1],
            "valor_factura": result.rows[0][2],
            "valor_cobrado": result.rows[0][3],
            "valor_pendiente": result.rows[0][4],
            "fecha": result.rows[0][5],
            "cliente": result.rows[0][6],
            "estado": result.rows[0][7],
            "detalles": []
        };
        const sql_det = `select * from cobro_detalle where id_cobro=:id_cobro`;
        const result_det = await BD.Open(sql_det, [id_cobro], false);
        let detalles = [];
        result_det.rows.map(cobro => {
            let detalleCobroEntity = {
                "id_cobro_detalle": cobro[0],
                "id_cobro": cobro[1],
                "id_forma_de_pago": cobro[2],
                "id_cobrador": cobro[3],
                "fecha": cobro[4],
                "forma_de_pago": cobro[5],
                "pago": cobro[6],
                "valor": cobro[7],
                "estado": cobro[8]
            }
            detalles.push(detalleCobroEntity);
        });
        cobro.detalles = detalles;
    } else {
        console.log("No existe el registro con id " + id_cobro);
    }
    res.json(cobro);
};

// Create
exports.create = async (req, res) => {
    const currentDate = new Date();
    const {numero_factura,valor_factura,valor_cobrado,valor_pendiente,fecha,cliente,estado,rows} = req.body;
    const sql = `insert into cobro(numero_factura,valor_factura,valor_cobrado,valor_pendiente,fecha,cliente,estado) values (:numero_factura,:valor_factura,:valor_cobrado,:valor_pendiente,:currentDate,:cliente,:estado)`;
    let result_header = await BD.Open(sql, [numero_factura,valor_factura,valor_cobrado,valor_pendiente,currentDate,cliente,estado], true);
    console.log(result_header);
    console.log(sql);
    let cobro;

    // Insert details
    if (result_header.rowsAffected === 1) {
        const sql_created = `select max(id_cobro) from cobro`;
        let result_created = await BD.Open(sql_created, [], false);

        const id_cobro = result_created.rows[0][0];
        for await (const det of rows) {
            console.log(id_cobro);
            console.log(det);
            const { id_forma_de_pago, id_cobrador, fecha, forma_de_pago, pago, valor, cobrador } = det;
            const sql_det = `insert into cobro_detalle(id_cobro,id_forma_de_pago,id_cobrador,fecha,forma_de_pago,pago,valor,cobrador) values (:id_cobro,:id_forma_de_pago,:id_cobrador,:currentDate,:forma_de_pago,:pago,:valor,:cobrador)`;
            let result_detail = await BD.Open(sql_det, [id_cobro, id_forma_de_pago, id_cobrador, currentDate, forma_de_pago, pago, valor, cobrador], true);
            console.log(result_detail);
        };

        cobro = {
            "id_cobro": id_cobro,
            "numero_factura": numero_factura,
            "valor_factura": valor_factura,
            "valor_cobrado": valor_cobrado,
            "valor_pendiente": valor_pendiente,
            "fecha": fecha,
            "cliente": cliente,
            "estado": estado
        };
    }

    res.status(200).json(cobro);
};

// Create Detail
exports.createDetail = async (req, res) => {
    const {id_cobro, valor_cobrado, valor_pendiente, estado, detail} = req.body;
    const {id_forma_de_pago, id_cobrador, fecha, forma_de_pago, pago, valor, cobrador} = detail;
    const fecha_cobro = new Date(fecha);
    const sql_header = `update cobro set valor_cobrado=:valor_cobrado, valor_pendiente=:valor_pendiente, estado=:estado where id_cobro=:id_cobro`;
    let result_header = await BD.Open(sql_header, [valor_cobrado, valor_pendiente, estado, id_cobro], true);
    console.log(result_header);
    const sql_det = `insert into cobro_detalle(id_cobro,id_forma_de_pago,id_cobrador,fecha,forma_de_pago,pago,valor,cobrador) values (:id_cobro,:id_forma_de_pago,:id_cobrador,:fecha_cobro,:forma_de_pago,:pago,:valor,:cobrador)`;
    let result_detail = await BD.Open(sql_det, [id_cobro, id_forma_de_pago, id_cobrador, fecha_cobro, forma_de_pago, pago, valor, cobrador], true);
    console.log(result_detail);
    const cobro = {
        "id_cobro": id_cobro,
        "id_forma_de_pago": id_forma_de_pago,
        "id_cobrador": id_cobrador,
        "fecha": fecha_cobro,
        "forma_de_pago": forma_de_pago,
        "pago": pago,
        "valor": valor,
        "cobrador": cobrador
    };
    res.status(200).json(cobro);
};

// Find All Details By Cobro id
exports.findDetailsById = async (req, res) => {
    const {id_cobro} = req.params;
    const sql_det = `select * from cobro_detalle where id_cobro=:id_cobro`;
    const result_det = await BD.Open(sql_det, [id_cobro], false);
    let detalles = [];
    result_det.rows.map(cobro => {
        let detalleCobroEntity = {
            "id_cobro_detalle": cobro[0],
            "id_cobro": cobro[1],
            "id_forma_de_pago": cobro[2],
            "id_cobrador": cobro[3],
            "fecha": cobro[4],
            "forma_de_pago": cobro[5],
            "pago": cobro[6],
            "valor": cobro[7],
            "estado": cobro[8]
        }
        detalles.push(detalleCobroEntity);
    });
    res.status(200).json(detalles);
};

// Update
exports.update = async (req, res) => {
    const { id_cobro, numero_factura, valor_factura, valor_cobrado, valor_pendiente, fecha, cliente, estado, rows } = req.body;
    const sql = `update cobro set numero_factura=:numero_factura, valor_factura=:valor_factura, valor_cobrado=:valor_cobrado, valor_pendiente=:valor_pendiente, cliente=:cliente, estado=:estado where id_cobro=:id_cobro`;
    let result_header = await BD.Open(sql, [numero_factura, valor_factura, valor_cobrado, valor_pendiente, cliente, estado, id_cobro], true);
    console.log(result_header);
    let cobro_detalle;
    let cobro;

    // update details
    if (result_header.rowsAffected === 1) {
        const sql_created = `select max(id_cobro) from cobro`;
        let result_created = await BD.Open(sql_created, [], false);

        const id_cobro = result_created.rows[0][0];

        for await (const det of rows) {
            console.log(det);
            const {id_forma_de_pago, id_cobrador, fecha, forma_de_pago, pago, valor, cobrador, id_cobro_detalle} = det;
            const fechaFormat = new Date(fecha);
            const sql_det = `update cobro_detalle set id_forma_de_pago=:id_forma_de_pago, id_cobrador=:id_cobrador, fecha=:fechaFormat, forma_de_pago=:forma_de_pago, pago=:pago, valor=:valor, cobrador=:cobrador where id_cobro_detalle=:id_cobro_detalle`;
            let result_det = await BD.Open(sql_det, [id_forma_de_pago, id_cobrador, fechaFormat, forma_de_pago, pago, valor, cobrador, id_cobro_detalle], true)
            console.log(result_det);
        };

        cobro = {
            "id_cobro": id_cobro,
            "numero_factura": numero_factura,
            "valor_factura": valor_factura,
            "valor_cobrado": valor_cobrado,
            "valor_pendiente": valor_pendiente,
            "fecha": fecha,
            "cliente": cliente,
            "estado": estado
        };
    }
    res.status(200).json(cobro_detalle);
}

// Delete
exports.delete = async (req, res) => {
    const { code } = req.params;
    const sql_det = `delete from cobro_detalle where id_cobro=:code`;
    let result_det = await BD.Open(sql_det, [code], true);
    console.log(result_det);

    const sql = `delete from cobro where id_cobro=:code`;
    let result = await BD.Open(sql, [code], true);
    console.log(result);

    const message = "Cuenta por cobrar con id " + code + " eliminado correctamente";
    res.status(200).json(message);
}
