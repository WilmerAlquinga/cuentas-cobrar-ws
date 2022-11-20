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

//routes
app.use(cobradorRoutes);

//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 8000')
})