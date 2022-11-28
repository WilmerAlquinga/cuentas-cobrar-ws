module.exports = (app) => {
    const router = require("express").Router();
    const cobrador = require("../controllers/cobrador.controller");

    // Methods
    router.get("/findAll", cobrador.findAll);
    router.post("/create", cobrador.create);
    router.get("/findById/:id_cobrador", cobrador.findById);
    router.put("/update", cobrador.update);
    router.delete("/delete/:code", cobrador.delete);

    // General path
    app.use("/apiV1/cobrador", router);
}