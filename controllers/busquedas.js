const { response } = require("express")
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const busquedaTotal = async (req, res = response) => {

    const termino = req.params.termino;
    const regexp = new RegExp(termino, 'i');

    /* const usuarios = await Usuario.find({ nombre: regexp });
    const hospitales = await Hospital.find({ nombre: regexp });
    const medicos = await Medico.find({ nombre: regexp }); */

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regexp }),
        Hospital.find({ nombre: regexp }),
        Medico.find({ nombre: regexp })
    ]);

    res.status(200).json({
        ok: true,
        termino,
        usuarios,
        hospitales,
        medicos
    });
}

const busquedaColeccion = async (req, res = response) => {

    const termino = req.params.termino;
    const tabla = req.params.tabla;
    let data = [];

    const regexp = new RegExp(termino, 'i');

    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find({ nombre: regexp });
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regexp }).populate('usuario', 'nombre');
            break;
        case 'medicos':
            data = await Medico.find({ nombre: regexp }).populate('usuario', 'nombre').populate('hospital', 'nombre');
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla debe ser usuarios, hospitales o medicos..'
            });
    }

    res.status(200).json({
        ok: true,
        resultados: data
    });
}

module.exports = { busquedaTotal, busquedaColeccion }