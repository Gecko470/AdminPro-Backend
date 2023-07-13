const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, createMedicos, updateMedicos, deleteMedicos } = require('../controllers/medicos');


const router = Router();

router.get('/', getMedicos);
router.post('/',
    [
        validarJWT,
        check('nombre', 'El Nombre es un campo obligatorio..').not().isEmpty(),
        check('hospital', 'El Hospital es un campo obligatorio..').not().isEmpty().isMongoId(),
        validarCampos

    ], createMedicos);

router.put('/:id',
    [
        /* validarJWT,
        check('nombre', 'El Nombre es un campo obligatorio..').not().isEmpty(),
        check('email', 'El Email es un campo obligatorio..').isEmail().not().isEmpty(),
        check('role', 'El Rol es un campo obligatorio..').not().isEmpty(),
        validarCampos */

    ], updateMedicos);

router.delete('/:id', deleteMedicos);

module.exports = router;