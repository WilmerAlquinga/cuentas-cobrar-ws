// const res = require("express/lib/response");
// const model = require("../models");
// const BD = require('../config/db.config');
// const cobradorRoutes = require("../routes/cobrador.routes");

// const Cobrador = model.Cobrador;
// const table_name = 'cobrador';

// exports.findAll = async (req, res) => {
//     console.log('iniciando petición');
//     const sql = `select * from cobrador;`;
    
//     let result = await BD.Open(sql, [], false);
//     Cobradores = [];
//     console.log(result.rows);
    
//     result.rows.map(user => {
//         let userSchema = {
//             "id_cobrador": user[0],
//             "cedula": user[1],
//             "nombre": user[2],
//             "direccion": user[3]
//         }
        
//         Cobradores.push(userSchema);
//     })
    
//     console.log(Cobradores);
//     res.json(Cobradores);
// };
