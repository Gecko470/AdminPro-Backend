const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //VALIDAR EXIISTENCIA DEL EMAIL EN LA BD
        const usuarioBD = await Usuario.findOne({ email: email });

        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                msg: 'Login no válido. Revise sus credenciales..'
            });
        }

        //VALIDAR PASSWORD
        const validarPassword = bcrypt.compareSync(password, usuarioBD.password);

        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Login no válido. Revise sus credenciales..'
            });
        }

        //GENERAR TOKEN JWT
        const token = await generarToken(usuarioBD.id);

        res.status(200).json({
            ok: true,
            token: token
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


module.exports = { login }