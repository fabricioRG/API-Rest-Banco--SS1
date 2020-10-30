const express = require('express');
const app = express();
const cors = require('cors');

//CONFIGURACIONES
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(cors());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/users', require('../routes/users'));
app.use('/bank', require('../routes/bank'));

app.listen(4000);
console.log('ejecutando');