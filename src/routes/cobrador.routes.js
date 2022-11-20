module.exports = (app) => {
    const cobrador = require("../controllers/cobrador.controller");
    var router = require("express").Router();

    router.get("/", cobrador.findAll);

    //app.use("/apiV1/cobradores", router);
}