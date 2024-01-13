const { Schema, model } = require('mongoose');

const Server = new Schema({
    _id: { type: String, required: true },
    prefix: String
});

module["exports"] = model('Dimensões', Server);