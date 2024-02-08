const { Schema, model } = require('mongoose');

const User = new Schema({
    _id: { type: String, required: true},
    blacklist: { impostor: String,  reason: String, },
    insignia: { type: String, default: "" },
    caixas: { type: Number, default: 1 },
    //-------- Perfil -------------------------

rep: { type: Number, default: 0 },

aboutme: { type: String, default: 'Eu sabo! utilize /sobre-mim para mudar aqui.' },

perfil: { type: String, default: 'https://i.imgur.com/qHFUAQu.png' },

banner: { type: String, default: 'https://i.imgur.com/3mYlCj4.png' },


//-------- VIP -------------------------
vip: { type: Boolean, default: false },
vipExpires: { type: Date, default: null },

//-------- Economia -------------------------

bolso: { type: Number, default: 0 },
cave: { type: Number, default: 0 },
cometa_codigos: { type: [String], default: [] },
daily_tempo: { type: Number, default: 0 },

});

module["exports"] = model('Usuários', User);