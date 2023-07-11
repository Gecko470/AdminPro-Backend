const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/',
    [
        check('email', 'El Email es un campo obligatorio..').isEmail().not().isEmpty(),
        check('password', 'El Password es un campo obligatorio..').not().isEmpty(),
        validarCampos

    ], login);

module.exports = router;