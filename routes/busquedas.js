const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { busquedaTotal, busquedaColeccion } = require('../controllers/busquedas');


const router = Router();

router.get('/:termino', validarJWT, busquedaTotal);
router.get('/coleccion/:tabla/:termino', validarJWT, busquedaColeccion);



module.exports = router;

