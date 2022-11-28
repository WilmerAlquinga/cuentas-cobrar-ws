module.exports = (app) => {
    const router = require("express").Router();
    const cobros = require("../controllers/cuentas-cobrar.controller");

    // Methods
    router.get("/findAll", cobros.findAll);
    router.post("/create", cobros.create);
    router.get("/findById/:id_cobro", cobros.findById);
    router.put("/update", cobros.update);
    router.delete("/delete/:code", cobros.delete);

    // General path
    app.use("/apiV1/cuentas-cobrar", router);
}