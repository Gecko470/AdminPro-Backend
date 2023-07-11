const Usuario = require('../models/usuario');
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');

const getusuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuarios: usuarios
        /* uid: req.uid */
    });
}

const createUsuarios = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const existeUsuario = await Usuario.findOne({ email: email });

        if (existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese email ya existe en la BD..'
            });
        }

        const usuario = new Usuario(req.body);
        //HASH PASSWORD
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();

        //GENERAR TOKEN JWT
        const token = await generarToken(usuario.id);

        res.json({
            ok: true,
            usuario: usuario,
            token: token //PODEMOS DEJAR SOLO usuario, PORQUE COINCIDEN LOS NOMBRES
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor..'
        });
    }
}

const updateUsuarios = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioBd = await Usuario.findById(uid);

        if (!usuarioBd) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe en la BD un usuario con ese Id..'
            });
        }

        const { password, google, email, ...campos } = req.body;

        if (usuarioBd.email != email) {

            const existeEmail = await Usuario.findOne({ email: email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ese email ya existe en la BD..'
                });
            }
        }
        /* delete campos.password;
        delete campos.google; */
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true }); /* ESTE new: true ES PARA QUE NOS DEVUELVA EL NUEVO USUARIO YA ACTUALIZADO, SI NO, NOS DEVUELVE EL USUARIO ANTIGUO NO ACTUALIZADO */

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor..'
        });
    }
}

const deleteUsuarios = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioBd = await Usuario.findById(uid);

        if (!usuarioBd) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe en la BD un usuario con ese Id..'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario borrado de la BD..'
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor..'
        });
    }
}

module.exports = {
    getusuarios,
    createUsuarios,
    updateUsuarios,
    deleteUsuarios
}