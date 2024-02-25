const { Schema, model } = require('mongoose');

const User = new Schema({
    _id: { type: String, required: true},
    blacklist: { impostor: String,  reason: String, },
    insignia: { type: String, default: "" },
    caixas: { type: Number, default: 1 },
    //-------- Perfil -------------------------
    
    honor: { type: Number, default: 0 },
    aboutme: { type: String, default: 'A Mei deveria dominar o mundo.' },
    banner: { type: String, default: 'https://i.imgur.com/NRrPAqI.png' },
    
    //-------- VIP -------------------------
    vip: { type: Boolean, default: false },
    vipExpires: { type: Date, default: null },
    
    //-------- Economia -------------------------
    bolso: { type: Number, default: 0 },
    mushroom: { type: Number, default: 0 },
    codes: { type: [String], default: [] },
    daily_tempo: { type: Number, default: 0 },
});
module["exports"] = model('Usuários', User);