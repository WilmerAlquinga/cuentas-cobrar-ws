const { Router } = require('express');
const router = Router();
const BD = require('../config/db.config');

//READ
router.get('/getCobradores', async (req, res) => {
    console.log('In getCobradores');
    sql = "select * from cobrador";

    let result = await BD.Open(sql, [], false);
    // console.log(result);
    cobradores = [];

    result.rows.map(user => {
        console.log('usuario: ' + user[0]);
        let userSchema = {
            "ID_COBRADOR": user[0],
            "CEDULA": user[1],
            "NOMBRE": user[2],
            "DIRECCION": user[3]
        }

        cobradores.push(userSchema);
    })
    console.log(cobradores);

    res.json(cobradores);
})

module.exports = router;