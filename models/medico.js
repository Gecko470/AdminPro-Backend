const { Schema, model } = require("mongoose");


const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    img: {
        type: String
    }

}, { collection: 'medicos' });

MedicoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Medico', MedicoSchema);