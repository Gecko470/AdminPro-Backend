const { Router } = require('express');
const { check } = require('express-validator');
const { getusuarios, createUsuarios, updateUsuarios, deleteUsuarios } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getusuarios);
router.post('/',
    [
        check('nombre', 'El Nombre es un campo obligatorio..').not().isEmpty(),
        check('email', 'El Email es un campo obligatorio..').isEmail().not().isEmpty(),
        check('password', 'El Password es un campo obligatorio..').not().isEmpty(),
        validarCampos

    ], createUsuarios);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El Nombre es un campo obligatorio..').not().isEmpty(),
        check('email', 'El Email es un campo obligatorio..').isEmail().not().isEmpty(),
        check('role', 'El Rol es un campo obligatorio..').not().isEmpty(),
        validarCampos

    ], updateUsuarios);

router.delete('/:id', validarJWT, deleteUsuarios);

module.exports = router;