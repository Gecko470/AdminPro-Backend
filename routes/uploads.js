const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { upload, download } = require('../controllers/uploads');



const router = Router();

router.use(fileUpload());

router.put('/:tipo/:id', validarJWT, upload);
router.get('/:tipo/:idImagen', download);



module.exports = router;