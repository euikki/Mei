const { Schema, model } = require('mongoose');

const ServerSchema = new Schema({
    _id: { type: String, required: true },
    entrada: { type: Boolean, default: false },
    canal: { type: String, default: null }
});

module.exports = model('Servidores', ServerSchema);
