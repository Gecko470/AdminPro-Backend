const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img');

    res.status(200).json({
        ok: true,
        medicos: medicos
    });
}
const createMedicos = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.status(200).json({
            ok: true,
            medico: medicoDB
        });
    }
    catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Error en el servidor..'
        });
    }
}
const updateMedicos = async (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Update Médicos'
    });
}
const deleteMedicos = async (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Delete Médicos'
    });
}


module.exports = { getMedicos, createMedicos, updateMedicos, deleteMedicos }