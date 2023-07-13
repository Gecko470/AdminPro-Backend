const { Schema, model } = require("mongoose");


const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    img: {
        type: String
    }

}, { collection: 'hospitales' });

HospitalSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Hospital', HospitalSchema);