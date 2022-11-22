module.exports = (app) => {
    const router = require("express").Router();
    const cobrador = require("../controllers/cobrador.controller");

    // Methods
    router.get("/findAll", cobrador.findAll);

    // General path
    app.use("/apiV1/cobrador", router);
}