const { Schema, model } = require('mongoose');

const ServerSchema = new Schema({
    _id: { type: String, required: true },
    entrada: { 
        type: Boolean, 
        default: false,
        title: { type: String, default: null },
        description: { type: String, default: null },
        thumbnail: { type: String, default: null },
        image: { type: String, default: null },
        color: { type: String, default: null }
    },
    canal: { type: String, default: null }
});

module.exports = model('Servidores', ServerSchema);
