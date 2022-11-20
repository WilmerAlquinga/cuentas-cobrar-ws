const { Router } = require('express');
const router = Router();
const BD = require('../config/db.config');

//READ
router.get('/getCobradores', async (req, res) => {
    console.log('In getCobradores');
    sql = "select * from COBRADOR";

    let result = await BD.Open(sql, [], false);
    console.log(result);
    Cobradores = [];

    result.rows.map(user => {
        let userSchema = {
            "ID_COBRADOR": user[0],
            "CEDULA": user[1],
            "NOMBRE": user[2],
            "DIRECCION": user[3]
        }

        Cobradores.push(userSchema);
    })
    console.log(Cobradores);

    res.json(Cobradores);
})

module.exports = router;