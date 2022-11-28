const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//imports
const cobradorRoutes = require('./routes/cobrador.routes');

//settings
app.set('port', 8000);
let corsOptions = {
  origin: ["*"],
};

//middlewares
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Seguridad app." });
});

//routes
require("./routes/cobrador.routes")(app);
require("./routes/forma-pago.routes")(app);
require("./routes/cuentas-cobrar.routes")(app);

//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 8000')
})
