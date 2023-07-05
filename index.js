const express = require("express");
//CORS
const cors = require('cors')
//vARIABLES DE ENTORNO
require('dotenv').config();

const { dbConnection } = require("./database/config")

const app = express();
app.use(cors());

//BASE DE DATOS
dbConnection();

//RUTAS
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "Hola Mundo !!"
    });
});

app.listen(process.env.PORT), () => {
    console.log("Servidor corriendo en el puerto " + process.env.PORT);
};