const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img');

    res.status(200).json({
        ok: true,
        hospitales: hospitales
    });
}
const createHospitales = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        });
    }
    catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Error en el servidor..'
        });
    }
}
const updateHospitales = async (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Update Hospitales'
    });
}
const deleteHospitales = async (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Delete Hospitales'
    });
}


module.exports = { getHospitales, createHospitales, updateHospitales, deleteHospitales }