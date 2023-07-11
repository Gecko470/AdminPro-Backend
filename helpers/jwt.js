const jwt = require('jsonwebtoken');

const generarToken = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid: uid
        }

        jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo genrear el Token..');
            }
            else {
                resolve(token);
            }
        });

    });
}

module.exports = { generarToken }