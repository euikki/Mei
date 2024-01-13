const mongoose = require('mongoose');
require('dotenv').config();
require('colors');

const user = require('./schemas/userschema');

mongoose.connect(process.env.database)
    .then(() => {
        console.log(`${'Database'.cyan.bold} carregada com sucesso!`);
    })
    .catch((error) => {
        console.error('Um erro ocorreu ao se conectar com o banco de dados:', error);
    });

module.exports = {
    userDB: user
};