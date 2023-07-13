const fs = require("fs");

const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital");
const Medico = require("../models/medico");

const actualizarImagenBD = async (tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'usuarios':

            const usuarioBD = await Usuario.findById(id);
            if (!usuarioBD) {
                return false;
            }

            let pathViejoU = `./uploads/usuarios/${usuarioBD.img}`;
            borrarImagenAntigua(pathViejoU);

            usuarioBD.img = nombreArchivo;
            usuarioBD.save();
            return true;

        case 'hospitales':

            const hospitalBD = await Hospital.findById(id);
            if (!hospitalBD) {
                return false;
            }

            let pathViejoH = `./uploads/hospitales/${hospitalBD.img}`;
            borrarImagenAntigua(pathViejoH);

            hospitalBD.img = nombreArchivo;
            hospitalBD.save();
            return true;

        case 'medicos':

            const medicoBD = await Medico.findById(id);
            if (!medicoBD) {
                return false;
            }

            let pathViejoM = `./uploads/medicos/${medicoBD.img}`;
            borrarImagenAntigua(pathViejoM);

            medicoBD.img = nombreArchivo;
            medicoBD.save();
            return true;
    }

}

const borrarImagenAntigua = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}


module.exports = { actualizarImagenBD }