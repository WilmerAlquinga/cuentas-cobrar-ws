module.exports = (app) => {
    const router = require("express").Router();
    const forma_de_pago = require("../controllers/forma-pago.controller");

    // Methods
    router.get("/findAll", forma_de_pago.findAll);
    router.post("/create", forma_de_pago.create);
    router.get("/findById/:id_forma_de_pago", forma_de_pago.findById);
    router.put("/update", forma_de_pago.update);
    router.delete("/delete/:code", forma_de_pago.delete);

    // General path
    app.use("/apiV1/forma-pago", router);
}