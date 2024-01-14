const { Schema, model } = require('mongoose');

const Server = new Schema({
    _id: { type: String, required: true }
});

module["exports"] = model('Dimensões', Server);