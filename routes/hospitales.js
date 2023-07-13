const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, createHospitales, updateHospitales, deleteHospitales } = require('../controllers/hospitales');

const router = Router();

router.get('/', getHospitales);
router.post('/',
    [
        validarJWT,
        check('nombre', 'El Nombre es un campo obligatorio..').not().isEmpty(),
        validarCampos

    ], createHospitales);

router.put('/:id',
    [
        /* validarJWT,
        check('nombre', 'El Nombre es un campo obligatorio..').not().isEmpty(),
        check('email', 'El Email es un campo obligatorio..').isEmail().not().isEmpty(),
        check('role', 'El Rol es un campo obligatorio..').not().isEmpty(),
        validarCampos */

    ], updateHospitales);

router.delete('/:id', deleteHospitales);

module.exports = router;