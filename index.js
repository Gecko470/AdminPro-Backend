const express = require("express");
//CORS
const cors = require('cors')
//vARIABLES DE ENTORNO
require('dotenv').config();

const { dbConnection } = require("./database/config")

const app = express();
app.use(cors());
//LECTURA Y PARSEO DEL BODY, SIEMPRE ANTES DE LAS RUTAS
app.use(express.json());

//BASE DE DATOS
dbConnection();

//RUTAS
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT), () => {
    console.log("Servidor corriendo en el puerto " + process.env.PORT);
};