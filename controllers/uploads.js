const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagenBD } = require("../helpers/actualizarBDImagen");



const upload = async (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['usuarios', 'hospitales', 'medicos'];

    if (!tiposValidos.includes(tipo)) {
        return res.json.status(400).json({
            ok: false,
            msg: 'El tipo debe ser usuarios, hospitales o médicos..'
        });
    }

    //VERIFICAR SI TENEMOS ARCHIVO
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha agregado ningún archivo para subir al servidor..'
        });
    }

    //PROCESAR EL ARCHIVO
    const file = req.files.img;
    const nombre = file.name.split('.');
    const extension = nombre[nombre.length - 1];
    const extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'];

    if (!extensionesValidas.includes(extension)) {
        return res.json.status(400).json({
            ok: false,
            msg: 'La extensión debe ser jpg, jpeg, png o gif..'
        });
    }

    //GENERAR NUEVO NOMBRE UNICO DE ARCHIVO CON UUID
    const nombreArchivo = `${uuidv4()}.${extension}`;

    //PATH PARA GUARDAR LA IMAGEN
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //MOVER LA IMAGEN AL PATH
    file.mv(path, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                msg: 'Ha habido algún problema, no se ha subido el archivo correctamente..'
            });

        res.status(200).json({
            ok: true,
            msg: 'Archivo subido correctamente..',
            nombreArchivo
        });
    });

    //ACTUALIZAR BD
    actualizarImagenBD(tipo, id, nombreArchivo);
}

const download = (req, res = response) => {
    const tipo = req.params.tipo;
    const idImagen = req.params.idImagen;

    const pathImagen = path.join(__dirname, `../uploads/${tipo}/${idImagen}`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    }
    else {
        const pathImagen = path.join(__dirname, `../uploads/noImageAvailable.jpg`);
        res.sendFile(pathImagen);
    }


}



module.exports = { upload, download }