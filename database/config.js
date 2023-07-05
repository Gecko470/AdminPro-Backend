const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_Connection);
        console.log('DB Connected..');
    } catch (error) {
        console.log(error);
        throw new Error('Error de conexión con la BD, ver logs..');
    }
}

module.exports = { dbConnection }