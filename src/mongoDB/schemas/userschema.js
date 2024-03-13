const { Schema, model } = require('mongoose');

const User = new Schema({
    _id: { type: String, required: true },
    blacklist: { impostor: String,  reason: String, },
    badges: { type: [String], default: [] },
    
    //-------- Perfil -------------------------
    honor: { type: Number, default: 0 },
    aboutme: { type: String, default: 'A Mei deveria dominar o mundo.' },
    banner: { type: String, default: 'https://i.imgur.com/lYiRPmV.png' },
    
    //-------- VIP -------------------------
    vip: { type: Boolean, default: false },
    vipExpires: { type: Date, default: null },
    
    //-------- Economia -------------------------
    fragments: { type: Number, default: 0 },
    mushroom: { type: Number, default: 0 },
    codes: { type: [String], default: [] },
    daily_time: { type: Number, default: 0 },

    //-------- Top gg -------------------------
    votes: { type: Number, default: 0 },
    time_vote: { type: Number, default: 0 },
});
module["exports"] = model('Usuários', User);